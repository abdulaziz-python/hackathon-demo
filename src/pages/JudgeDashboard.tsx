
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/contexts/LanguageContext";

const JudgeDashboard = () => {
  const { t } = useLanguage();
  
  return (
    <Container>
      <div className="py-12">
        <h1 className="text-3xl font-bold mb-4">{t("judge.title") || "Judge Dashboard"}</h1>
        <p className="text-muted-foreground mb-8">
          {t("judge.description") || "Review and evaluate hackathon projects"}
        </p>
        
        <Link to="/">
          <Button variant="outline">
            {t("judge.backToHome") || "Back to Home"}
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default JudgeDashboard;
