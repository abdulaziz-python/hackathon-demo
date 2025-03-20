
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const { t } = useLanguage();
  
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-2">Page not found</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <Button className="rounded-full">
            <Home className="mr-2 h-4 w-4" />
            {t("nav.home")}
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default NotFound;
