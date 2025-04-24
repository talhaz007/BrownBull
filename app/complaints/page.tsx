"use client"
import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Instagram,
  ChevronDown 
} from "lucide-react";

const Complaints = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    complaint: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Navigation items for footer
  const navItems = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Certifications", id: "about" },
    { name: "Markets", id: "markets" },
    { name: "Commission", id: "comission" },
    { name: "Team", id: "team" },
    { name: "Contact", id: "contact" },
    { name: "Complaints", id: "complaints" },
  ];

  // Services data for footer
  const services = [
    {
      title: "Market Analysis",
      description: "In-depth analysis of market trends and forecasts to inform your trading decisions.",
    },
    {
      title: "Risk Management",
      description: "Comprehensive strategies to mitigate risks and protect your investments.",
    },
    {
      title: "Global Trading",
      description: "Access to international markets with our extensive network of partners.",
    },
    {
      title: "Strategic Consulting",
      description: "Expert advice on optimizing your commodity trading strategies.",
    },
  ];

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    // Special case for commission - open PDF
    if (sectionId === "comission") {
      window.open("/assets/NEW_COMM_GROUP.pdf", "_blank");
      return;
    }
    
    // Special case for complaints - navigate to complaints page
    if (sectionId === "complaints") {
      window.location.href = "/complaints";
      return;
    }
    
    // For other items, redirect to home page with the section hash
    window.location.href = `/#${sectionId}`;
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    if (!formData.name || !formData.email || !formData.complaint) {
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
      // Here you would normally send data to your API endpoint
      // For demonstration, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Complaint submitted successfully! We'll review it shortly.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        complaint: "",
      });
    } catch (error) {
      toast.error("Failed to submit complaint. Please try again later.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50/50 relative">
      {/* Header Navigation */}
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

          <Button 
            className="bg-amber-600 hover:bg-amber-700 text-white hidden md:flex"
            onClick={() => window.open("https://bbc.ihubresearch.com/", "_blank")}
          >
            Open Account
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container pt-32 pb-24">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 border border-amber-100">
          <div className="mb-6">
            <span className="inline-block bg-amber-600/10 px-4 py-1 rounded-full text-amber-800 font-medium mb-2">
              Customer Support
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
              Submit a Complaint
            </h1>
            <p className="text-amber-800/80">
              We value your feedback and are committed to addressing your concerns. Please fill out the form below with your complaint details.
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-amber-800">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full px-4 py-2 rounded-md border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Your name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-amber-800">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleFormChange}
                className="w-full px-4 py-2 rounded-md border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="complaint" className="block text-sm font-medium text-amber-800">
                Complaint Details
              </label>
              <textarea
                id="complaint"
                rows={6}
                value={formData.complaint}
                onChange={handleFormChange}
                className="w-full px-4 py-2 rounded-md border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Please describe your complaint in detail..."
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="bg-amber-600 hover:bg-amber-700 text-white w-full md:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Submitting...
                </div>
              ) : (
                "Submit Complaint"
              )}
            </Button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-amber-100">
            <h3 className="text-lg font-bold text-amber-900 mb-4">Other Ways to Contact Us</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-600 mt-1" />
                <div>
                  <div className="font-medium text-amber-900">Phone</div>
                  <a href="tel:+923313224444" className="text-amber-800/80 hover:text-amber-600">
                    +92 331 322 4444
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-600 mt-1" />
                <div>
                  <div className="font-medium text-amber-900">Email</div>
                  <a href="mailto:info@brownbullpvtltd.com" className="text-amber-800/80 hover:text-amber-600">
                    info@brownbullpvtltd.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-600 mt-1" />
                <div>
                  <div className="font-medium text-amber-900">Office Locations</div>
                  <p className="text-amber-800/80">
                    <span className="block font-medium">Head Office:</span>
                    185-A, Old Sattelite Town, Sargodha
                  </p>
                  <p className="text-amber-800/80 mt-2">
                    <span className="block font-medium">Branch Office:</span>
                    Office No. 7&8, 3rd Floor, Galleria Tower, I-8 Markaz Islamabad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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
                {services.map((service) => (
                  <li key={service.title}>
                    <Link href="/#services" className="text-amber-200/80 hover:text-white transition-colors">
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
                  <span className="text-amber-200/80">Office No. 7&8, 3rd Floor, Galleria Tower, I-8 Markaz Islamabad</span>
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
      <a
        href="https://wa.me/923313224444"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-6 w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg z-50 hover:bg-green-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </a>

      {/* Scroll to top button */}
      <button
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-lg z-50 hover:bg-amber-700 transition-colors ${scrollY > 300 ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ transition: "opacity 0.3s" }}
      >
        <ChevronDown className="w-6 h-6 rotate-180" />
      </button>
    </div>
  );
};

export default Complaints;