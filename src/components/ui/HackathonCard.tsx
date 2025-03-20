
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
    <div className="group premium-card rounded-xl overflow-hidden shadow-premium transition-all duration-500 hover:shadow-premium-hover animate-scale-in">
      <div className="relative">
        {/* Image with overlay gradient */}
        <div className="aspect-video overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
        </div>
        
        {/* Tags positioned on top of the image */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="tag backdrop-blur-md bg-primary/30 text-white border border-primary/20 px-3 py-1 text-xs rounded-full">
            {topic}
          </span>
          <span className="tag backdrop-blur-md bg-secondary/30 text-white border border-secondary/20 px-3 py-1 text-xs rounded-full">
            {organizer}
          </span>
        </div>
        
        {/* Title positioned at the bottom of the image */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-xl font-medium mb-2 text-white group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
        </div>
      </div>
      
      <div className="p-5 bg-card">
        <div className="space-y-3 text-sm text-muted-foreground">
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
        
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-border/30">
          <Link to={`/hackathons/${id}`} className="text-sm font-medium text-primary">
            <Button variant="ghost" size="sm" className="group/btn rounded-full font-medium p-0 h-auto hover:bg-transparent">
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
    </div>
  );
};

export default HackathonCard;
