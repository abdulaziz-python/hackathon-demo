
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, X, Moon, Sun, LogIn, User, 
  Globe, ChevronsUpDown 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const handleLogin = () => {
    setIsLoggingIn(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoggingIn(false);
      
      // Show success toast
      toast({
        title: "Logged in successfully",
        description: "Welcome back to Hackathon.uz!",
        variant: "default",
      });
      
      // Redirect to dashboard or cabinet
      window.location.href = "/cabinet";
    }, 1500);
  };

  // Initialize dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Add scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on location change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Navigation links
  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.dashboard"), path: "/dashboard" },
    { name: t("nav.leaderboard"), path: "/leaderboard" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/70 backdrop-blur-xl shadow-sm border-b border-border/20" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 animate-fade-in"
        >
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold transition-all duration-300 hover:shadow-glow">
            H
          </div>
          <span className="font-display font-semibold text-xl">Hackathon.uz</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <ul className="flex space-x-1">
            {navLinks.map((link, index) => (
              <li key={link.name} className={`animation-delay-${index * 200}`}>
                <Link
                  to={link.path}
                  className={`px-3 py-2 rounded-xl text-sm transition-all animate-fade-in ${
                    location.pathname === link.path
                      ? "text-primary font-medium bg-primary/5"
                      : "text-foreground/80 hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Right Menu */}
        <div className="hidden md:flex items-center space-x-3 animate-fade-in">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="rounded-xl">
                <Globe className="h-4 w-4 mr-2" />
                {language === "en" ? "English" : "O'zbek"}
                <ChevronsUpDown className="h-4 w-4 ml-1 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              <DropdownMenuItem onClick={() => setLanguage("en")}>
                <span className={language === "en" ? "font-medium" : ""}>English</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("uz")}>
                <span className={language === "uz" ? "font-medium" : ""}>O'zbek</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-xl"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Link to="/cabinet">
            <Button variant="outline" size="sm" className="rounded-xl mr-2">
              <User className="h-4 w-4 mr-2" />
              {t("nav.cabinet")}
            </Button>
          </Link>
          
          <Button 
            variant="default" 
            size="sm" 
            className="rounded-xl"
            onClick={handleLogin}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></div>
                {t("nav.loggingIn") || "Logging in..."}
              </div>
            ) : (
              <>
                <LogIn className="h-4 w-4 mr-2" />
                {t("nav.login")}
              </>
            )}
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-xl"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="text-foreground rounded-xl"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden backdrop-blur-xl bg-background/80 border-b border-border/20 animate-fade-in">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2 rounded-xl text-base transition-colors ${
                  location.pathname === link.path
                    ? "text-primary font-medium bg-primary/5"
                    : "text-foreground hover:bg-accent"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.name}
              </Link>
            ))}
            
            <Link to="/cabinet" className="block px-3 py-2 rounded-xl text-base transition-colors text-foreground hover:bg-accent">
              {t("nav.cabinet")}
            </Link>
            
            <div className="flex items-center px-3 py-2">
              <Button 
                variant={language === "en" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setLanguage("en")}
                className="flex-1 mr-2 text-xs rounded-xl"
              >
                English
              </Button>
              <Button 
                variant={language === "uz" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setLanguage("uz")}
                className="flex-1 text-xs rounded-xl"
              >
                O'zbek
              </Button>
            </div>
            
            <Button 
              variant="default" 
              className="w-full mt-3 rounded-xl"
              onClick={handleLogin}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <div className="flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></div>
                  {t("nav.loggingIn") || "Logging in..."}
                </div>
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  {t("nav.login")}
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
