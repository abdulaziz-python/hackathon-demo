
import { CalendarDays, MapPin, Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HackathonCardProps {
  id: string;
  title: string;
  imageUrl: string;
  topic: string;
  organizer: string;
  prizes: string;
  date: string;
  location: string;
}

const HackathonCard = ({
  id,
  title,
  imageUrl,
  topic,
  organizer,
  prizes,
  date,
  location,
}: HackathonCardProps) => {
  return (
    <div className="group card-glass rounded-2xl overflow-hidden animate-scale-in">
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="p-5">
        <div className="flex items-center space-x-2 mb-3">
          <span className="tag bg-primary/10 text-primary">{topic}</span>
          <span className="tag">{organizer}</span>
        </div>
        
        <h3 className="text-xl font-medium mb-2 line-clamp-1">{title}</h3>
        
        <div className="space-y-2 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2 text-primary" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center">
            <Trophy className="h-4 w-4 mr-2 text-primary" />
            <span>{prizes}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-5">
          <Link to={`/hackathons/${id}`}>
            <Button variant="outline" size="sm" className="rounded-full">
              View Details
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
          
          <Button variant="default" size="sm" className="rounded-full">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HackathonCard;
