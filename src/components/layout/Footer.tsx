
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-secondary/20 backdrop-blur-sm border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 animate-fade-in">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-telegram flex items-center justify-center text-white font-bold">
                H
              </div>
              <span className="font-semibold text-xl">{t("app.name")}</span>
            </Link>
            <p className="text-muted-foreground text-sm mt-2">
              The premier platform for hackathons in Uzbekistan.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="animate-fade-in animation-delay-200">
              <h3 className="font-medium text-lg mb-3">{t("footer.platform")}</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">{t("nav.home")}</Link></li>
                <li><Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors text-sm">{t("nav.dashboard")}</Link></li>
                <li><Link to="/team" className="text-muted-foreground hover:text-foreground transition-colors text-sm">{t("nav.team")}</Link></li>
                <li><Link to="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors text-sm">{t("nav.leaderboard")}</Link></li>
                <li><Link to="/cabinet" className="text-muted-foreground hover:text-foreground transition-colors text-sm">{t("nav.cabinet")}</Link></li>
              </ul>
            </div>
            
            <div className="animate-fade-in animation-delay-400">
              <h3 className="font-medium text-lg mb-3">{t("footer.resources")}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Community</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Blog</a></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1 animate-fade-in animation-delay-400">
              <h3 className="font-medium text-lg mb-3">{t("footer.legal")}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© 2024 Hackathon.uz. {t("footer.rights")}</p>
          <p className="mt-2 md:mt-0">{t("footer.tagline")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
