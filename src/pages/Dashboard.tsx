
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const { t } = useLanguage();
  
  return (
    <Container>
      <div className="py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">{t("dashboard.title") || "Dashboard"}</h1>
        <p className="text-muted-foreground mb-8">
          {t("dashboard.description") || "Welcome to your hackathon dashboard"}
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/team">
            <Button>{t("dashboard.manageTeam") || "Manage Team"}</Button>
          </Link>
          <Link to="/cabinet">
            <Button variant="outline">{t("dashboard.viewProfile") || "View Profile"}</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
