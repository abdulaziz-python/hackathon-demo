
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
    <div className="group premium-card rounded-2xl animate-scale-in">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      <div className="aspect-[16/9] overflow-hidden rounded-t-2xl">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      <div className="p-6 relative">
        <div className="flex items-center space-x-2 mb-4">
          <span className="tag bg-primary/10 text-primary backdrop-blur-sm border border-primary/10 px-3 py-1">{topic}</span>
          <span className="tag bg-secondary/80 backdrop-blur-sm border border-secondary/20 px-3 py-1">{organizer}</span>
        </div>
        
        <h3 className="text-xl font-medium mb-3 transition-colors duration-300 group-hover:text-primary">{title}</h3>
        
        <div className="space-y-3 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-3 text-primary" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-3 text-primary" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center">
            <Trophy className="h-4 w-4 mr-3 text-primary" />
            <span>{prizes}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-border/40">
          <Link to={`/hackathons/${id}`} className="text-sm font-medium text-primary hover:underline transition-all">
            <Button variant="ghost" size="sm" className="group/btn rounded-full font-medium border-0 p-0 h-auto hover:bg-transparent">
              <span className="mr-1 group-hover/btn:mr-2 transition-all">View Details</span>
              <ArrowRight className="h-4 w-4 inline-block transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
          
          <Button 
            variant="default" 
            size="sm" 
            className="rounded-full shadow-md transition-all duration-300 hover:shadow-glow"
          >
            Register
          </Button>
        </div>
      </div>
      
      <div className="absolute -bottom-px left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </div>
  );
};

export default HackathonCard;
