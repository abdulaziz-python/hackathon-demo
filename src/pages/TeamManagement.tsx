
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/contexts/LanguageContext";

const TeamManagement = () => {
  const { t } = useLanguage();
  
  return (
    <Container>
      <div className="py-12">
        <h1 className="text-3xl font-bold mb-4">{t("team.title") || "Team Management"}</h1>
        <p className="text-muted-foreground mb-8">
          {t("team.description") || "Manage your hackathon teams and members"}
        </p>
        
        <Link to="/dashboard">
          <Button variant="outline">
            {t("team.backToDashboard") || "Back to Dashboard"}
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default TeamManagement;
