
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/contexts/LanguageContext";

const Leaderboard = () => {
  const { t } = useLanguage();
  
  return (
    <Container>
      <div className="py-12">
        <h1 className="text-3xl font-bold mb-4">{t("leaderboard.title") || "Leaderboard"}</h1>
        <p className="text-muted-foreground mb-8">
          {t("leaderboard.description") || "Track the top-performing teams across hackathons"}
        </p>
        
        <Link to="/">
          <Button variant="outline">
            {t("leaderboard.backToHome") || "Back to Home"}
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default Leaderboard;
