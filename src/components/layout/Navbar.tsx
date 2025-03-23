
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, X, Moon, Sun, LogIn, User, 
  Globe, ChevronsUpDown, Send
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TelegramAuth from "@/components/TelegramAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

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
    navigate("/login");
  };
  
  // Add the handleAuthSuccess function
  const handleAuthSuccess = (userData?: any) => {
    toast({
      title: "Login Successful",
      description: `Welcome, ${userData?.first_name || "User"}!`,
      variant: "default",
    });
    setIsAuthDialogOpen(false);
    // Redirect to dashboard after successful login
    navigate("/dashboard");
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.dashboard"), path: "/dashboard" },
    { name: t("nav.leaderboard"), path: "/leaderboard" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/70 backdrop-blur-xl shadow-sm border-b border-border/20" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link 
          to="/" 
          className="flex items-center space-x-2 animate-fade-in"
        >
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold transition-all duration-300">
            H
          </div>
          <span className="font-display font-medium text-base sm:text-lg">Hackathon.uz</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          <ul className="flex">
            {navLinks.map((link, index) => (
              <li key={link.name} className={`animation-delay-${index * 200}`}>
                <Link
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm transition-all animate-fade-in ${
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

        <div className="hidden md:flex items-center space-x-2 animate-fade-in">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="rounded-lg">
                <Globe className="h-4 w-4 mr-2" />
                {language === "en" ? "English" : "O'zbek"}
                <ChevronsUpDown className="h-4 w-4 ml-1 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-lg">
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
            className="rounded-lg"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <Link to="/cabinet">
            <Button variant="outline" size="sm" className="rounded-lg">
              <User className="h-4 w-4 mr-2" />
              {t("nav.cabinet")}
            </Button>
          </Link>
          
          <Button 
            variant="default" 
            size="sm" 
            className="rounded-lg"
            onClick={handleLogin}
          >
            <LogIn className="h-4 w-4 mr-2" />
            {t("nav.login")}
          </Button>
        </div>

        <div className="flex md:hidden items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-lg"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="text-foreground rounded-lg"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden backdrop-blur-xl bg-background/80 border-b border-border/20 animate-fade-in">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2 rounded-lg text-base transition-colors ${
                  location.pathname === link.path
                    ? "text-primary font-medium bg-primary/5"
                    : "text-foreground hover:bg-accent"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.name}
              </Link>
            ))}
            
            <Link to="/cabinet" className="block px-3 py-2 rounded-lg text-base transition-colors text-foreground hover:bg-accent">
              {t("nav.cabinet")}
            </Link>
            
            <div className="flex items-center px-3 py-2">
              <Button 
                variant={language === "en" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setLanguage("en")}
                className="flex-1 mr-2 text-xs rounded-lg"
              >
                English
              </Button>
              <Button 
                variant={language === "uz" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setLanguage("uz")}
                className="flex-1 text-xs rounded-lg"
              >
                O'zbek
              </Button>
            </div>
            
            <Button 
              variant="default" 
              className="w-full mt-3 rounded-lg"
              onClick={handleLogin}
            >
              <LogIn className="h-4 w-4 mr-2" />
              {t("nav.login")}
            </Button>
          </div>
        </div>
      )}

      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign in with Telegram</DialogTitle>
          </DialogHeader>
          <TelegramAuth onSuccess={handleAuthSuccess} />
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
