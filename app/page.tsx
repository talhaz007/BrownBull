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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
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

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const calculateParallax = (factor: number) => {
    return -scrollY * factor
  }

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    // Special case for commission - open PDF
    if (sectionId === "comission") {
      window.open("/assets/NEW_COMM_GROUP.pdf", "_blank");
      setNavOpen(false);
      return;
    }
    
    // Special case for complaints - navigate to complaints page
    if (sectionId === "complaints") {
      window.location.href = "/complaints"; // Navigate to the complaints page
      setNavOpen(false);
      return;
    }
    
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    setNavOpen(false)
  }

  // Navigation items
  const navItems = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Certifications", id: "about" },
    { name: "Markets", id: "markets" },
    // { name: "Testimonials", id: "testimonials" },
    { name: "Investor Assistance", id: "comission" },
    { name: "Team", id: "team" },
    { name: "Contact", id: "contact" },
    { name: "Complaints", id: "complaints" },
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
        const response = await fetch('/api/market-data');
        const data = await response.json();
        
        // Update state with the fetched data
        setMarketData(data);
        
        // Generate SVG path from price history
        if (data.gold.history.length > 0) {
          const path = generateChartPath(data.gold.history);
          setChartPath(path);
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
    
    // Initial data fetch
    fetchMarketData();
    
    // Set up interval for real-time updates (every 30 seconds)
    const intervalId = setInterval(() => {
      simulateMarketData();
    }, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const dropdownRef = useRef<HTMLDivElement>(null); // Create a ref for the dropdown

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setNavOpen(false); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-amber-100">
        <div className="container flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 z-10">
            <Image 
              src="/logo 2.png" 
              alt="BrownBull Logo" 
              width={40} 
              height={40} 
              className="object-contain"
            />
            <span className="text-xl font-bold text-amber-900">BrownBull</span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden z-50 relative w-10 h-10 flex items-center justify-center"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle menu"
          >
            <div
              className={`w-6 h-0.5 bg-amber-900 absolute transition-all duration-300 ${
                navOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-amber-900 absolute transition-all duration-300 ${
                navOpen ? "opacity-0" : "opacity-100"
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-amber-900 absolute transition-all duration-300 ${
                navOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            ></div>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                <button
                  onClick={() => {
                    if (item.id === "comission") {
                      setNavOpen(!navOpen); // Toggle dropdown for Investor Assistance
                    } else {
                      scrollToSection(item.id);
                    }
                  }}
                  className={cn(
                    "text-amber-900 font-medium hover:text-amber-600 transition-colors relative",
                    activeSection === item.id && "text-amber-600",
                  )}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-600"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
                {/* Dropdown for Investor Assistance */}
                {item.id === "comission" && navOpen && (
                  <div ref={dropdownRef} className="absolute left-0 mt-2 bg-white shadow-lg rounded-md z-10">
                    <button
                      onClick={() => {
                        window.open("/assets/NEW_COMM_GROUP.pdf", "_blank");
                        setNavOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-amber-900 hover:bg-amber-100 whitespace-nowrap text-center cursor-pointer"
                    >
                      Commission
                    </button>
                    <button
                      onClick={() => {
                        window.open("/assets/Terms.pdf", "_blank");
                        setNavOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-amber-900 hover:bg-amber-100 whitespace-nowrap text-center cursor-pointer"
                    >
                      Do's and Don'ts
                    </button>
                    <button
                      onClick={() => {
                        window.open("/assets/policy.pdf", "_blank");
                        setNavOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-amber-900 hover:bg-amber-100 whitespace-nowrap text-center cursor-pointer"
                    >
                      No Cash Handling Policy
                    </button>
                    <button
                      onClick={() => {
                        window.open("/assets/secp_license.pdf", "_blank");
                        setNavOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-amber-900 hover:bg-amber-100 whitespace-nowrap text-center cursor-pointer"
                    >
                      SECP License
                    </button>
                    <button
                      onClick={() => {
                        window.open("/assets/pmex_license.jpg", "_blank");
                        setNavOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-amber-900 hover:bg-amber-100 whitespace-nowrap text-center cursor-pointer"
                    >
                      PMEX License
                    </button>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile navigation */}
          <AnimatePresence>
            {navOpen && (
              <motion.div
                className="fixed inset-0 bg-white z-40 flex flex-col md:hidden overflow-hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, height: "100svh" }}
              >
                <div className="h-20 border-b border-amber-100 flex items-center px-6">
                  <Link href="/" className="flex items-center gap-2">
                    <Image 
                      src="/logo 2.png" 
                      alt="BrownBull Logo" 
                      width={40} 
                      height={40} 
                      className="object-contain"
                    />
                    <span className="text-xl font-bold text-amber-900">BrownBull</span>
                  </Link>
                </div>
                
                <div className="flex-1 flex flex-col justify-center overflow-y-auto">
                  <nav className="flex flex-col items-center gap-4 px-6 py-5">
                    {navItems.map((item) => (
                      <motion.button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                          "text-xl text-amber-900 font-medium hover:text-amber-600 transition-colors w-full text-center py-3 relative",
                          activeSection === item.id && "text-amber-600"
                        )}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: navItems.indexOf(item) * 0.05 }}
                      >
                        {item.name}
                        {activeSection === item.id && (
                          <motion.div
                            layoutId="activeMobileSection"
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-amber-600"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </nav>
                </div>
                
                <div className="p-6 border-t border-amber-100">
                  <Button 
                    className="bg-amber-600 hover:bg-amber-700 text-white w-full"
                    onClick={() => {
                      window.open("https://bbc.ihubresearch.com/login", "_blank");
                      setNavOpen(false);
                    }}
                  >
                    Open Account
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button 
            className="bg-amber-600 hover:bg-amber-700 text-white hidden md:flex"
            onClick={() => window.open("https://bbc.ihubresearch.com/", "_blank")}
          >
            Open Account
          </Button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="home"
          ref={homeRef}
          className="relative min-h-screen flex items-center overflow-hidden pt-20"
          style={{
            background: `linear-gradient(135deg, #f7f0e9 0%, #f5e3cb 100%)`,
          }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-amber-500/10"
                style={{
                  width: `${Math.random() * 300 + 50}px`,
                  height: `${Math.random() * 300 + 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0.8, 1],
                  opacity: [0, 0.3, 0.2, 0],
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                }}
                transition={{
                  duration: Math.random() * 15 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>

          {/* Parallax chart elements */}
          <motion.div
            className="absolute right-[5%] top-[20%] w-64 h-64 opacity-20 text-amber-800"
            style={{ y: calculateParallax(0.2) }}
          >
            <BarChart3 className="w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute left-[10%] bottom-[15%] w-48 h-48 opacity-20 text-amber-800"
            style={{ y: calculateParallax(0.3) }}
          >
            <TrendingUp className="w-full h-full" />
          </motion.div>

          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-block bg-amber-600/10 px-4 py-1 rounded-full text-amber-800 font-medium mb-4"
                  >
                    Redefining Commodity Trading
                  </motion.div>

                  <h1 className="text-4xl md:text-6xl font-bold text-amber-900 leading-tight mb-6">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="block"
                    >
                      Transforming the Future of{" "}
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="relative inline-block"
                    >
                      <span className="relative z-10">Commodity Trading</span>
                      <motion.span
                        className="absolute bottom-2 left-0 w-full h-3 bg-amber-300/50 -z-10"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      ></motion.span>
                    </motion.span>
                  </h1>

                  <motion.p
                    className="text-lg md:text-xl text-amber-800/80 mb-8 max-w-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    BrownBull delivers innovative solutions and market insights to help you navigate the complex world
                    of commodities with confidence and precision.
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    <Button
                      size="lg"
                      className="bg-amber-600 hover:bg-amber-700 text-white group relative overflow-hidden"
                      onClick={() => scrollToSection("markets")}
                    >
                      <span className="relative z-10 flex items-center">
                        Explore Markets
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="absolute inset-0 bg-amber-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-amber-600 text-amber-800 hover:bg-amber-100 group"
                      onClick={() => scrollToSection("services")}
                    >
                      <span className="group-hover:translate-x-1 transition-transform flex items-center">
                        Our Services
                        <ChevronDown className="ml-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>

              <div className="relative">
                <motion.div
                  className="relative z-10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  // style={{
                  //   transform: `perspective(1000px) rotateY(${(mousePosition.x - window.innerWidth / 2) / 50}deg) rotateX(${-(mousePosition.y - window.innerHeight / 2) / 50}deg)`,
                  // }}
                >
                  {/* Mobile phone frame */}
                  <div className="relative w-[280px] h-[560px] mx-auto bg-amber-950 rounded-[36px] p-3 shadow-2xl border-8 border-amber-900">
                    {/* Phone screen */}
                    <div className="w-full h-full bg-amber-50 rounded-[24px] overflow-hidden relative">
                      {/* Status bar */}
                      <div className="h-8 bg-amber-100 flex justify-between items-center px-4 text-xs text-amber-900">
                        <div>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-3 bg-amber-900 rounded-sm"></div>
                          <div className="w-3 h-3 bg-amber-900 rounded-full"></div>
                          <div className="w-3 h-3 border border-amber-900 rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* App header */}
                      <div className="p-4 border-b border-amber-200">
                        <div className="font-bold text-amber-900 text-lg">BrownBull Trading</div>
                        <div className="text-amber-700 text-xs flex items-center gap-1">
                          Commodity Market Overview
                          <motion.div 
                            className="w-1.5 h-1.5 rounded-full bg-green-500"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        </div>
                      </div>
                      
                      {/* Simple chart area */}
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <div className="text-amber-900 font-medium">Gold</div>
                            <div className={`text-sm ${marketData.gold.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              ${isLoading ? '---' : marketData.gold.price.toFixed(2)} 
                              {!isLoading && ` ${marketData.gold.change >= 0 ? '+' : ''}${marketData.gold.change.toFixed(2)} (${marketData.gold.changePercent.toFixed(1)}%)`}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {["1D", "1W", "1M"].map((period, i) => (
                              <div key={period} className={`text-xs px-2 py-1 rounded ${i === 0 ? "bg-amber-600 text-white" : "bg-amber-100 text-amber-800"}`}>
                                {period}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Animated chart */}
                        <div className="h-[200px] relative bg-white rounded-lg p-2 shadow-sm">
                          {/* Grid lines */}
                          <div className="absolute inset-0 grid grid-rows-4">
                            {[...Array(4)].map((_, i) => (
                              <div key={i} className="border-t border-amber-100 w-full" />
                            ))}
                          </div>
                          
                          {isLoading ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div 
                                className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                            </div>
                          ) : (
                            <>
                              {/* Animated chart line */}
                              <svg className="w-full h-full" preserveAspectRatio="none">
                                <motion.path
                                  d={chartPath}
                                  fill="none"
                                  stroke="#d97706"
                                  strokeWidth="2"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ duration: 2 }}
                                />
                                <motion.path
                                  d={chartPath}
                                  fill="url(#gradientMobile)"
                                  fillOpacity="0.2"
                                  stroke="none"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 2, delay: 0.5 }}
                                />
                                <defs>
                                  <linearGradient id="gradientMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#d97706" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                                  </linearGradient>
                                </defs>
                              </svg>
                              
                              {/* Animated current price dot */}
                              <motion.div
                                className="absolute w-4 h-4 rounded-full bg-white border-2 border-amber-600"
                                initial={{ top: "30%", right: "10%", scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 2, duration: 0.3 }}
                                style={{ 
                                  top: marketData.gold.history?.length > 0 
                                    ? `${100 - ((marketData.gold.history[marketData.gold.history.length - 1].price - Math.min(...marketData.gold.history.map(p => p.price))) / 
                                        (Math.max(...marketData.gold.history.map(p => p.price)) - Math.min(...marketData.gold.history.map(p => p.price))) * 100)}%` 
                                    : "30%"
                                }}
                              >
                                <motion.div
                                  className="absolute inset-0 rounded-full bg-amber-600/30"
                                  animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                              </motion.div>
                            </>
                          )}
                        </div>
                        
                        {/* Price range */}
                        <div className="flex justify-between text-xs text-amber-700 mt-2">
                          {!isLoading && marketData.gold.history?.length > 0 && (
                            <>
                              <div>${Math.min(...marketData.gold.history.map(p => p.price)).toFixed(2)}</div>
                              <div>${Math.max(...marketData.gold.history.map(p => p.price)).toFixed(2)}</div>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {/* Market summary */}
                      <div className="p-4">
                        <div className="text-amber-900 font-medium mb-2">Market Summary</div>
                        <div className="space-y-3">
                          {[
                            { name: "Crude Oil", data: marketData.oil },
                            { name: "Silver", data: marketData.silver },
                            { name: "Wheat", data: marketData.wheat }
                          ].map((item, i) => (
                            <motion.div 
                              key={item.name}
                              className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1 + (i * 0.2) }}
                            >
                              <div className="text-amber-900">{item.name}</div>
                              {!isLoading ? (
                                <div className="flex items-center gap-2">
                                  <div>${item.data.price.toFixed(2)}</div>
                                  <div className={item.data.change >= 0 ? "text-green-600" : "text-red-600"}>
                                    {item.data.change >= 0 ? "+" : ""}{item.data.changePercent.toFixed(1)}%
                                  </div>
                                </div>
                              ) : (
                                <div className="w-16 h-4 bg-amber-100 animate-pulse rounded"></div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Navigation bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-14 bg-amber-100 flex justify-around items-center">
                        {["Home", "Markets", "Trade", "Portfolio", "More"].map((item) => (
                          <div key={item} className="flex flex-col items-center">
                            <div className="w-5 h-5 bg-amber-700 rounded-sm mb-1"></div>
                            <div className="text-[10px] text-amber-900">{item}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Phone notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-amber-950 rounded-b-2xl"></div>
                  </div>
                </motion.div>

                {/* Background decorative elements */}
                <motion.div
                  className="absolute -top-10 -right-10 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl -z-10"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                ></motion.div>
                <motion.div
                  className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-600/20 rounded-full blur-3xl -z-10"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
                ></motion.div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            onClick={() => scrollToSection("services")}
          >
            <div className="w-8 h-12 rounded-full border-2 border-amber-600 flex items-center justify-center cursor-pointer">
              <motion.div
                className="w-1.5 h-3 bg-amber-600 rounded-full"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="services" ref={servicesRef} className="py-24 bg-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50"></div>

          <div className="container relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
                className="inline-block bg-amber-600/10 px-4 py-1 rounded-full text-amber-800 font-medium mb-4"
              >
                What We Offer
              </motion.div>

              <motion.h2
                className="text-3xl md:text-5xl font-bold text-amber-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                Our Services
              </motion.h2>

              <motion.p
                className="text-lg text-amber-800/70 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                Comprehensive solutions tailored to meet your commodity trading needs with precision and expertise
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="bg-amber-50 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-amber-100 group hover:-translate-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300",
                      "bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
                    )}
                  >
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-amber-800/70 mb-4">{service.description}</p>
                  {/* <Link
                    href="#"
                    className="text-amber-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link> */}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        {/* <section id="about" ref={aboutRef} className="py-24 bg-amber-50 relative overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-amber-300/20 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />

          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    width={800}
                    height={600}
                    alt="About BrownBull"
                    className="w-full h-auto"
                  />
                </div>

                <motion.div
                  className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg max-w-xs"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-amber-900">Proven Results</h4>
                  </div>
                  <p className="text-sm text-amber-800/70">
                    Over 95% client satisfaction rate with consistent market-beating returns
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="inline-block bg-amber-600/10 px-4 py-1 rounded-full text-amber-800 font-medium mb-4"
                >
                  Our Story
                </motion.div>

                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-amber-900 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Pioneering Excellence in Commodity Trading
                </motion.h2>

                <motion.div
                  className="space-y-4 text-amber-800/80"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <p>
                    Founded in 2010, BrownBull has grown from a small trading advisory firm to a global leader in
                    commodity trading solutions. Our journey has been defined by innovation, integrity, and an
                    unwavering commitment to our clients' success.
                  </p>
                  <p>
                    We combine deep market expertise with cutting-edge technology to provide unparalleled insights and
                    trading opportunities. Our team of seasoned professionals brings decades of experience across
                    diverse commodity markets.
                  </p>
                  <p>
                    At BrownBull, we believe in building lasting partnerships with our clients, understanding their
                    unique needs, and delivering tailored solutions that drive sustainable growth and profitability.
                  </p>
                </motion.div>

                <motion.div
                  className="grid grid-cols-2 gap-6 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-amber-600">12+</div>
                    <div className="text-sm text-amber-800/70">Years of Experience</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-amber-600">500+</div>
                    <div className="text-sm text-amber-800/70">Global Clients</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-amber-600">30+</div>
                    <div className="text-sm text-amber-800/70">Countries Served</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-amber-600">$2B+</div>
                    <div className="text-sm text-amber-800/70">Trading Volume</div>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Button
                    size="lg"
                    className="bg-amber-600 hover:bg-amber-700 text-white group relative overflow-hidden"
                    onClick={() => scrollToSection("team")}
                  >
                    <span className="relative z-10 flex items-center">
                      Meet Our Team
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 bg-amber-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section> */}

        {/* Markets Section */}
        <section id="markets" ref={marketsRef} className="py-24 bg-white relative overflow-hidden">
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
                className="inline-block bg-amber-600/10 px-4 py-1 rounded-full text-amber-800 font-medium mb-4"
              >
                Our Expertise
              </motion.div>

              <motion.h2
                className="text-3xl md:text-5xl font-bold text-amber-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                Markets We Serve
              </motion.h2>

              <motion.p
                className="text-lg text-amber-800/70 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                Specialized trading solutions across diverse commodity markets with global reach and local expertise
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {markets.map((market, index) => (
                <motion.div
                  key={market.name}
                  className="bg-amber-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={market.image}
                      width={600}
                      height={400}
                      alt={market.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback if image doesn't exist
                        e.currentTarget.src = "/placeholder.svg?height=400&width=600";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent flex items-end">
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-white mb-1">{market.name}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-amber-800/80 mb-4">{market.description}</p>
                    <Link
                      href="#"
                      className="text-amber-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      Explore opportunities <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" ref={statsRef} className="py-24 bg-amber-900 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/5"
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  height: `${Math.random() * 300 + 100}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>

          <div className="container relative z-10">
            <div className="text-center mb-16">
              <motion.h2
                className="text-3xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                Our Impact in Numbers
              </motion.h2>

              <motion.p
                className="text-lg text-amber-100/80 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                Measurable results that demonstrate our commitment to excellence and client success
              </motion.p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "9", label: "Years Of Experience", prefix: "" },
                { value: "2500+", label: "Clients", prefix: "" },
                { value: "20", label: "Professionals Team Member", prefix: "" },
                { value: "5", label: "Awards Winning", prefix: "" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-amber-300 mb-2">
                    {stat.prefix}
                    <CountUp
                      end={Number.parseFloat(stat.value.replace(/[^\d.-]/g, ""))}
                      duration={2.5}
                      separator=","
                      decimals={stat.value.includes(".") ? 1 : 0}
                      suffix={stat.value.match(/[^\d.-]+$/)?.[0] || ""}
                    />
                  </div>
                  <div className="text-amber-100/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PMEX Certification Section */}
        <section className="py-20 bg-gradient-to-r from-amber-50 to-amber-100 relative overflow-hidden" id="about">
          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="inline-block bg-amber-600/10 px-4 py-1 rounded-full text-amber-800 font-medium mb-4"
                >
                  Official Certification
                </motion.div>

                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-amber-900 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  PMEX Certified Trading Partner
                </motion.h2>

                <motion.p
                  className="text-lg text-amber-800/80 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  BrownBull is proud to be officially certified by the Pakistan Mercantile Exchange (PMEX), 
                  the country's first and only commodity futures exchange. This certification demonstrates 
                  our commitment to maintaining the highest standards of integrity, transparency, and 
                  excellence in commodity trading.
                </motion.p>

                <motion.p
                  className="text-lg text-amber-800/80 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  As a PMEX certified partner, we offer our clients secure access to standardized, 
                  regulated commodity futures contracts across multiple asset classes, ensuring 
                  compliance with all regulatory requirements while delivering exceptional trading 
                  opportunities.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Button
                    size="lg"
                    className="bg-amber-600 hover:bg-amber-700 text-white group relative overflow-hidden"
                    onClick={() => window.open("https://www.pmex.com.pk", "_blank")}
                  >
                    <span className="relative z-10 flex items-center">
                      Learn More About PMEX
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 bg-amber-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative"
              >
                <div className="relative bg-white p-6 rounded-xl shadow-xl border-2 border-amber-200">
                  <div className="flex items-center justify-center mb-6">
                    <Image
                      src="/assets/pmex_logo.jpg" 
                      alt="PMEX Logo"
                      width={200}
                      height={80}
                      className="object-contain"
                      onError={(e) => {
                        // Fallback if image doesn't exist
                        e.currentTarget.src = "/placeholder.svg?height=80&width=200";
                      }}
                    />
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="text-xl font-bold text-amber-900">Certificate of Authorization</div>
                    <div className="text-amber-600">Official Trading Partner</div>
                  </div>
                  
                  <div className="border-t border-b border-amber-200 py-4 my-4">
                    <div className="flex justify-between mb-2">
                      <div className="text-amber-800/70">Membership Number:</div>
                      <div 
                        className="font-medium text-amber-900 cursor-pointer hover:text-amber-600 hover:underline"
                        onClick={() => window.open("/assets/certificate_of_registration_of_branch.pdf", "_blank")}
                      >
                        (TREC) NO. 313
                      </div>
                    </div>
                    <div className="flex justify-between mb-2">
                      <div className="text-amber-800/70">Issued Date:</div>
                      <div className="font-medium text-amber-900">April 5, 2024</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-amber-800/70">Status:</div>
                      <div className="font-medium text-green-600 flex items-center">
                        Active
                        <motion.div 
                          className="ml-2 w-2 h-2 rounded-full bg-green-500"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center text-amber-800/70 text-sm">
                    This certifies that <span className="font-bold text-amber-900">BrownBull</span> has met all requirements 
                    and standards set by the Pakistan Mercantile Exchange and is authorized to operate as an official trading partner.
                  </div>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <div className="w-20 h-20 relative">
                      <Image
                        src="/logo 2.png"
                        alt="Official Seal"
                        width={80}
                        height={80}
                        className="object-contain opacity-80"
                        onError={(e) => {
                          // Fallback if image doesn't exist
                          e.currentTarget.src = "/placeholder.svg?height=80&width=80";
                        }}
                      />
                    </div>
                    {/* <div className="w-32 h-16 relative">
                      <Image
                        src="/signature.png"
                        alt="Authorized Signature"
                        width={120}
                        height={60}
                        className="object-contain"
                        onError={(e) => {
                          // Fallback if image doesn't exist
                          e.currentTarget.src = "/placeholder.svg?height=60&width=120";
                        }}
                      />
                      <div className="text-xs text-amber-800/70 text-center mt-1">Authorized Signatory</div>
                    </div> */}
                  </div>
                </div>
                
                {/* Decorative elements */}
                <motion.div
                  className="absolute -z-10 -top-6 -right-6 w-32 h-32 bg-amber-300/30 rounded-full blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
                />
                <motion.div
                  className="absolute -z-10 -bottom-6 -left-6 w-32 h-32 bg-amber-500/20 rounded-full blur-xl"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" ref={testimonialsRef} className="py-24 bg-white relative overflow-hidden">
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
                className="inline-block bg-amber-600/10 px-4 py-1 rounded-full text-amber-800 font-medium mb-4"
              >
                Client Success Stories
              </motion.div>

              <motion.h2
                className="text-3xl md:text-5xl font-bold text-amber-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                What Our Clients Say
              </motion.h2>

              <motion.p
                className="text-lg text-amber-800/70 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                Hear from the businesses and traders who have transformed their operations with BrownBull
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.author}
                  className="bg-amber-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-amber-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-4 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-xl">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-amber-800/80 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    {/* <Image
                      src={testimonial.image || "/placeholder.svg"}
                      width={50}
                      height={50}
                      alt={testimonial.author}
                      className="rounded-full"
                    /> */}
                    <div>
                      <div className="font-bold text-amber-900">{testimonial.author}</div>
                      {/* <div className="text-sm text-amber-800/70">{testimonial.company}</div> */}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" ref={teamRef} className="py-24 bg-amber-50 relative overflow-hidden">
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
                className="inline-block bg-amber-600/10 px-4 py-1 rounded-full text-amber-800 font-medium mb-4"
              >
                Our Experts
              </motion.div>

              <motion.h2
                className="text-3xl md:text-5xl font-bold text-amber-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                Meet Our Team
              </motion.h2>

              <motion.p
                className="text-lg text-amber-800/70 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                Industry veterans with deep expertise and a passion for innovation in commodity trading
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      width={300}
                      height={300}
                      alt={member.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4">
                        <p className="text-white text-sm">{member.bio}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-bold text-amber-900 mb-1">{member.name}</h3>
                    <p className="text-amber-600">{member.position}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-amber-50 to-transparent"></div>

          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="inline-block bg-amber-600/10 px-4 py-1 rounded-full text-amber-800 font-medium mb-4"
                >
                  Get In Touch
                </motion.div>

                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-amber-900 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Ready to Transform Your Trading?
                </motion.h2>

                <motion.p
                  className="text-lg text-amber-800/80 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Contact our team today to discuss how BrownBull can help you achieve your trading goals with our
                  comprehensive solutions and expert guidance.
                </motion.p>

                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-amber-800/70">Call Us</div>
                      <a 
                        href="tel:+923313224444" 
                        className="font-medium text-amber-900 hover:text-amber-600 transition-colors"
                      >
                        +92 331 322 4444
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-amber-800/70">Email Us</div>
                      <a 
                        href="mailto:info@brownbullpvtltd.com" 
                        className="font-medium text-amber-900 hover:text-amber-600 transition-colors"
                      >
                        info@brownbullpvtltd.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-amber-800/70">Visit Us</div>
                      <div className="font-medium text-amber-900 mb-1">Head Office:</div>
                      <div className="text-amber-900">185-A, Old Sattelite Town, Sargodha</div>
                      <div className="font-medium text-amber-900 mt-2 mb-1">Branch Office:</div>
                      <div className="text-amber-900">Office 504 505 vista by pakland i-8 markaz islamabad</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-amber-50 p-8 rounded-xl shadow-lg border border-amber-100"
              >
                <h3 className="text-2xl font-bold text-amber-900 mb-6">Send Us a Message</h3>
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-amber-800">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 rounded-md border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-amber-800">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 rounded-md border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-amber-800">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 rounded-md border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-amber-800">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 rounded-md border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Your message here..."
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-amber-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  height: `${Math.random() * 300 + 100}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>

          <div className="container relative z-10 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Ready to Elevate Your Trading Strategy?
            </motion.h2>

            <motion.p
              className="text-lg text-white/80 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join hundreds of successful traders who have partnered with BrownBull to achieve their financial goals and
              navigate the complex world of commodity trading.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Button 
                size="lg" 
                className="bg-white text-amber-600 hover:bg-amber-100 group"
                onClick={() => window.open("https://bbc.ihubresearch.com/login", "_blank")}
              >
                <span className="flex items-center">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-amber-900 text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Image 
                    src="/logo 2.png" 
                    alt="BrownBull Logo" 
                    width={32} 
                    height={32} 
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold">BrownBull</span>
              </Link>
              <p className="text-amber-200/80 mb-4">
                Transforming the future of commodity trading with innovative solutions and expert guidance.
              </p>
              <div className="flex gap-4">
                {[
                  { name: "twitter", url: "/#", icon: Twitter },
                  { name: "facebook", url: "https://www.facebook.com/share/198j1xMscp/?mibextid=wwXIfr", icon: Facebook },
                  { name: "linkedin", url: "https://www.linkedin.com/company/brown-bull-pvt-ltd/", icon: Linkedin },
                  { name: "instagram", url: "https://www.instagram.com/brownbullcommodities?igsh=MTNjMnZrY3lkMnY3NQ==", icon: Instagram },
                  { name: "whatsapp", url: "https://wa.me/923313224444", icon: () => (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                    </svg>
                  )}
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-amber-800 flex items-center justify-center hover:bg-amber-700 transition-colors"
                  >
                    <span className="sr-only">{social.name}</span>
                    {typeof social.icon === 'function' ? <social.icon /> : <social.icon className="w-4 h-4" />}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-amber-200/80 hover:text-white transition-colors"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Our Services</h4>
              <ul className="space-y-2">
                {services.slice(0, 4).map((service) => (
                  <li key={service.title}>
                    <Link href="#" className="text-amber-200/80 hover:text-white transition-colors">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 mt-0.5" />
                  <span className="text-amber-200/80">Office 504 505 vista by pakland i-8 markaz islamabad</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-400" />
                  <a 
                    href="tel:+923313224444" 
                    className="text-amber-200/80 hover:text-white transition-colors"
                  >
                    +92 331 322 4444
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-amber-400" />
                  <a 
                    href="mailto:info@brownbullpvtltd.com" 
                    className="text-amber-200/80 hover:text-white transition-colors"
                  >
                    info@brownbullpvtltd.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-amber-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-amber-200/80 text-sm">
              &copy; {new Date().getFullYear()} BrownBull. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/assets/policy.pdf" target="blank" className="text-sm text-amber-200/80 hover:text-white transition-colors">
                Policy
              </Link>
              <Link href="/assets/Terms.pdf" target="blank" className="text-sm text-amber-200/80 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-amber-200/80 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <motion.a
        href="https://wa.me/923313224444"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-6 w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg z-50 hover:bg-green-600 transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </motion.a>

      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-lg z-50 hover:bg-amber-700 transition-colors"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
