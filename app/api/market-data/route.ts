import { NextResponse } from 'next/server';

// You'll need to get an API key from https://www.alphavantage.co/support/#api-key
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'demo';

export async function GET() {
  try {
    // Fetch gold data (XAUUSD)
    const goldResponse = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=GC=F&interval=30min&apikey=${ALPHA_VANTAGE_API_KEY}&outputsize=compact`
    );
    const goldData = await goldResponse.json();
    
    // Process gold data
    const goldHistory = processTimeSeriesData(goldData['Time Series (30min)']);
    
    // Calculate gold price changes
    const goldCurrentPrice = goldHistory.length > 0 ? goldHistory[goldHistory.length - 1].price : 0;
    const goldPreviousPrice = goldHistory.length > 0 ? goldHistory[0].price : 0;
    const goldChange = goldCurrentPrice - goldPreviousPrice;
    const goldChangePercent = goldPreviousPrice !== 0 ? (goldChange / goldPreviousPrice) * 100 : 0;
    
    // Fetch other commodities data
    const [oilData, silverData, wheatData] = await Promise.all([
      fetchCommodityData('CL=F'), // Crude Oil
      fetchCommodityData('SI=F'), // Silver
      fetchCommodityData('ZW=F')  // Wheat
    ]);
    
    // Create response data
    const data = {
      gold: {
        price: goldCurrentPrice,
        change: goldChange,
        changePercent: goldChangePercent,
        history: goldHistory
      },
      oil: oilData,
      silver: silverData,
      wheat: wheatData
    };
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching market data:', error);
    
    // Fallback to simulated data if API fails
    return NextResponse.json(generateSimulatedData());
  }
}

// Helper function to process time series data
function processTimeSeriesData(timeSeriesData) {
  if (!timeSeriesData) return [];
  
  const dataPoints = Object.entries(timeSeriesData).map(([timestamp, values]) => {
    // Alpha Vantage returns values as strings, convert to numbers
    const price = parseFloat(values['4. close']);
    return {
      time: timestamp,
      price
    };
  });
  
  // Sort by time (oldest first)
  dataPoints.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  
  // Limit to last 20 points
  return dataPoints.slice(-20);
}

// Helper function to fetch commodity data
async function fetchCommodityData(symbol) {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    const data = await response.json();
    
    const quote = data['Global Quote'];
    if (!quote || !quote['05. price']) {
      throw new Error(`No data available for ${symbol}`);
    }
    
    const price = parseFloat(quote['05. price']);
    const change = parseFloat(quote['09. change']);
    const changePercent = parseFloat(quote['10. change percent'].replace('%', ''));
    
    return {
      price,
      change,
      changePercent
    };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    // Return simulated data as fallback
    return {
      price: symbol === 'CL=F' ? 78.42 : symbol === 'SI=F' ? 23.15 : 642.75,
      change: symbol === 'CL=F' ? 0.94 : symbol === 'SI=F' ? 0.12 : -1.93,
      changePercent: symbol === 'CL=F' ? 1.2 : symbol === 'SI=F' ? 0.5 : -0.3
    };
  }
}

// Fallback function to generate simulated data
function generateSimulatedData() {
  // Generate random price history (20 points)
  const now = new Date();
  const history = Array(20).fill(0).map((_, i) => {
    const time = new Date(now);
    time.setMinutes(now.getMinutes() - (20 - i) * 30);
    
    // Base price around 1890 with some random variation
    const price = 1890 + (Math.random() * 30 - 15);
    return { time: time.toISOString(), price };
  });
  
  // Sort by time
  history.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  
  // Calculate current price and change
  const currentPrice = history[history.length - 1].price;
  const previousPrice = history[0].price;
  const change = currentPrice - previousPrice;
  const changePercent = (change / previousPrice) * 100;
  
  return {
    gold: {
      price: currentPrice,
      change,
      changePercent,
      history
    },
    oil: {
      price: 78.42 + (Math.random() * 2 - 1),
      change: 0.94,
      changePercent: 1.2
    },
    silver: {
      price: 23.15 + (Math.random() * 0.5 - 0.25),
      change: 0.12,
      changePercent: 0.5
    },
    wheat: {
      price: 642.75 + (Math.random() * 10 - 5),
      change: -1.93,
      changePercent: -0.3
    }
  };
} 