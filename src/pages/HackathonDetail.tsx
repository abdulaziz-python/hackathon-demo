
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/contexts/LanguageContext";

const HackathonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  
  return (
    <Container>
      <div className="py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("hackathon.back") || "Back"}
          </Button>
        </Link>
        
        <h1 className="text-3xl font-bold mb-4">
          {t("hackathon.detail") || "Hackathon Details"} - ID: {id}
        </h1>
        
        <p className="text-muted-foreground mb-8">
          {t("hackathon.loading") || "Loading hackathon details..."}
        </p>
      </div>
    </Container>
  );
};

export default HackathonDetail;
