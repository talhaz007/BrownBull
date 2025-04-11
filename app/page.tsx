"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  Clock,
  Compass,
  Globe,
  Mail,
  MapPin,
  Phone,
  Shield,
  TrendingUp,
  Users,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import CountUp from "react-countup"
import { toast } from "sonner"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeSection, setActiveSection] = useState("home")
  const [navOpen, setNavOpen] = useState(false)
  const isMobile = useMobile()
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  
  // Add these for safe window access
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isBrowser, setIsBrowser] = useState(false)

  // Refs for each section
  const homeRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const marketsRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  // Check if sections are in view
  const homeInView = useInView(homeRef, { amount: 0.5 })
  const servicesInView = useInView(servicesRef, { amount: 0.5 })
  const aboutInView = useInView(aboutRef, { amount: 0.5 })
  const marketsInView = useInView(marketsRef, { amount: 0.5 })
  const testimonialsInView = useInView(testimonialsRef, { amount: 0.5 })
  const statsInView = useInView(statsRef, { amount: 0.5 })
  const teamInView = useInView(teamRef, { amount: 0.5 })
  const contactInView = useInView(contactRef, { amount: 0.5 })

  // Update active section based on which section is in view
  useEffect(() => {
    if (homeInView) setActiveSection("home")
    else if (servicesInView) setActiveSection("services")
    else if (aboutInView) setActiveSection("about")
    else if (marketsInView) setActiveSection("markets")
    else if (testimonialsInView) setActiveSection("testimonials")
    else if (statsInView) setActiveSection("stats")
    else if (teamInView) setActiveSection("team")
    else if (contactInView) setActiveSection("contact")
  }, [
    homeInView,
    servicesInView,
    aboutInView,
    marketsInView,
    testimonialsInView,
    statsInView,
    teamInView,
    contactInView,
  ])

  // Set isBrowser on mount
  useEffect(() => {
    setIsBrowser(true)
    
    // Set window size
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setScrollY(window.scrollY)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Custom cursor effect
      if (cursorRef.current && cursorDotRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`

        // Add a slight delay to the dot for a trailing effect
        setTimeout(() => {
          if (cursorDotRef.current) {
            cursorDotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
          }
        }, 100)
      }
    }
    
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll)
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("scroll", handleScroll)
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  const calculateParallax = (factor: number) => {
    return -scrollY * factor
  }

  // Safe function to open window
  const safeWindowOpen = (url: string, target: string = "_blank") => {
    if (typeof window !== 'undefined') {
      window.open(url, target);
    }
  }

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    // Special case for commission - open PDF
    if (sectionId === "comission") {
      safeWindowOpen("/assets/NEW_COMM_GROUP.pdf", "_blank");
      setNavOpen(false);
      return;
    }
    
    if (typeof document !== 'undefined') {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    }
    setNavOpen(false)
  }

  // Navigation items
  const navItems = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "About", id: "about" },
    { name: "Markets", id: "markets" },
    // { name: "Testimonials", id: "testimonials" },
    { name: "Comission", id: "comission" },
    { name: "Team", id: "team" },
    { name: "Contact", id: "contact" },
  ]

  // Services data
  const services = [
    {
      title: "Market Analysis",
      description: "In-depth analysis of market trends and forecasts to inform your trading decisions.",
      icon: BarChart3,
    },
    {
      title: "Risk Management",
      description: "Comprehensive strategies to mitigate risks and protect your investments.",
      icon: Shield,
    },
    {
      title: "Global Trading",
      description: "Access to international markets with our extensive network of partners.",
      icon: Globe,
    },
    {
      title: "Strategic Consulting",
      description: "Expert advice on optimizing your commodity trading strategies.",
      icon: Compass,
    },
    {
      title: "Real-time Monitoring",
      description: "24/7 monitoring of market conditions and your portfolio performance.",
      icon: Clock,
    },
    {
      title: "Client Support",
      description: "Dedicated support team to assist you with all your trading needs.",
      icon: Users,
    },
  ]

  // Market data
  const markets = [
    {
      name: "Energy",
      description: "Oil, natural gas, and renewable energy commodities trading.",
      image: "/market/energy.jpg",
    },
    {
      name: "Agriculture",
      description: "Grains, livestock, and other agricultural commodities.",
      image: "/market/agriculture.jpg",
    },
    {
      name: "Metals",
      description: "Precious and industrial metals trading opportunities.",
      image: "/market/metals.jpg",
    },
  ]

  // Team members
  const team = [
    {
      name: "Sohail Ahmed",
      position: "Media Executive",
      image: "/team/sohail.jpg",
      bio: "Creative media specialist with expertise in digital marketing and brand communications for commodity markets.",
    },
    {
      name: "Rasha Tahir",
      position: "Floor Manager",
      image: "/team/rasha.jpg",
      bio: "Oversees daily operations with expertise in team management and client relations.",
    },
    {
      name: "Muqadas Ijaz",
      position: "Director Sales",
      image: "/team/muqadas.jpg",
      bio: "Leads our sales initiatives with a proven track record in business development.",
    },
    {
      name: "Hasnat Ahmad",
      position: "Technical Agent",
      image: "/team/hasnat.jpg",
      bio: "Provides technical expertise and support for our trading platforms and systems.",
    },
  ]

  // Testimonials
  const testimonials = [
    {
      quote:
        "BrownBull's market insights have been instrumental in our trading success. Their analysis is always spot-on.",
      author: "Ali Rehman",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "The risk management strategies provided by BrownBull have helped us navigate volatile markets with confidence.",
      author: "Sultan Ahmed",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "Their global network and expertise have opened new markets for our business that we couldn't access before.",
      author: "Hussain Khan",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const [marketData, setMarketData] = useState({
    gold: { price: 0, change: 0, changePercent: 0, history: [] },
    oil: { price: 0, change: 0, changePercent: 0 },
    silver: { price: 0, change: 0, changePercent: 0 },
    wheat: { price: 0, change: 0, changePercent: 0 }
  });

  const [chartPath, setChartPath] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send data to our API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      toast.success("Message sent successfully! We'll get back to you soon.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(error.message || "Failed to send message. Please try again later.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Function to fetch market data
    const fetchMarketData = async () => {
      try {
        // In a real app, you would use a proper financial API
        // For demo purposes, we'll simulate API responses
        if (typeof window !== 'undefined') {
          const response = await fetch('/api/market-data');
          const data = await response.json();
          
          // Update state with the fetched data
          setMarketData(data);
          
          // Generate SVG path from price history
          if (data.gold.history.length > 0) {
            const path = generateChartPath(data.gold.history);
            setChartPath(path);
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching market data:', error);
        // Fallback to sample data if API fails
        simulateMarketData();
      }
    };
    
    // Function to simulate market data for demo purposes
    const simulateMarketData = () => {
      // Generate random price history (20 points)
      const now = new Date();
      const history = Array(20).fill(0).map((_, i) => {
        const time = new Date(now);
        time.setMinutes(now.getMinutes() - (20 - i) * 30);
        
        // Base price around 1890 with some random variation
        const price = 1890 + (Math.random() * 30 - 15);
        return { time, price };
      });
      
      // Sort by time
      history.sort((a, b) => a.time.getTime() - b.time.getTime());
      
      // Calculate current price and change
      const currentPrice = history[history.length - 1].price;
      const previousPrice = history[0].price;
      const change = currentPrice - previousPrice;
      const changePercent = (change / previousPrice) * 100;
      
      // Update state
      setMarketData({
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
      });
      
      // Generate SVG path from price history
      const path = generateChartPath(history);
      setChartPath(path);
      
      setIsLoading(false);
    };
    
    // Function to generate SVG path from price data
    const generateChartPath = (priceHistory) => {
      if (!priceHistory || priceHistory.length === 0) return "";
      
      // Find min and max prices for scaling
      const prices = priceHistory.map(point => point.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const priceRange = maxPrice - minPrice;
      
      // Chart dimensions
      const width = 240;
      const height = 100;
      
      // Generate path
      let path = `M0,${height - ((priceHistory[0].price - minPrice) / priceRange) * height}`;
      
      for (let i = 1; i < priceHistory.length; i++) {
        const x = (i / (priceHistory.length - 1)) * width;
        const y = height - ((priceHistory[i].price - minPrice) / priceRange) * height;
        
        // Use curve commands for smoother lines
        if (i === 1) {
          path += ` C${x/2},${height - ((priceHistory[0].price - minPrice) / priceRange) * height}`;
        } else {
          const prevX = ((i-1) / (priceHistory.length - 1)) * width;
          const prevY = height - ((priceHistory[i-1].price - minPrice) / priceRange) * height;
          const cpX1 = prevX + (x - prevX) / 3;
          const cpX2 = prevX + 2 * (x - prevX) / 3;
          
          path += ` ${cpX1},${prevY} ${cpX2},${y}`;
        }
        
        path += ` ${x},${y}`;
      }
      
      return path;
    };
    
    // Initial data fetch - only run in browser
    if (isBrowser) {
      fetchMarketData();
      
      // Set up interval for real-time updates (every 30 seconds)
      const intervalId = setInterval(() => {
        simulateMarketData();
      }, 30000);
      
      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [isBrowser]);

  return (
    <div className="min-h-screen relative">
      {/* Custom cursor effect (hidden on mobile) */}
      {!isMobile && (
        <>
          <div
            ref={cursorRef}
            className="fixed w-12 h-12 rounded-full border-2 border-amber-500/50 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
            style={{ transition: "transform 0.1s ease-out" }}
          />
          <div
            ref={cursorDotRef}
            className="fixed w-2 h-2 rounded-full bg-amber-500 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 hidden md:block"
            style={{ transition: "transform 0.2s ease-out" }}
          />
        </>
      )}

      {/* Header, main content, etc. */}
      {/* ... Rest of your component code ... */}
      
      {/* Example of fixing a window reference in the JSX */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          transform: isBrowser 
            ? `perspective(1000px) rotateY(${(mousePosition.x - windowSize.width / 2) / 50}deg) rotateX(${-(mousePosition.y - windowSize.height / 2) / 50}deg)`
            : 'none'
        }}
      >
        {/* Content */}
      </motion.div>
      
      {/* ... Rest of your component code ... */}
      
      {/* Footer */}
      
      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-lg z-50 hover:bg-amber-700 transition-colors"
        onClick={() => typeof window !== 'undefined' && window.scrollTo({ top: 0, behavior: "smooth" })}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: scrollY > 300 ? 1 : 0,
          y: scrollY > 300 ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown className="w-6 h-6 rotate-180" />
      </motion.button>
    </div>
  )
}