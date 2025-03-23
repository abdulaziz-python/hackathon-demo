
import React from "react";
import { Send } from "lucide-react";

// Custom Telegram icon with improved styling and animation capabilities
export const TelegramIcon: React.FC<{ 
  className?: string; 
  size?: number; 
  animated?: boolean;
}> = ({ 
  className, 
  size = 24, 
  animated = false 
}) => {
  return (
    <div className={`relative ${animated ? 'group' : ''} ${className || ""}`}>
      <Send 
        className={`text-[#0088cc] transition-all duration-300 ${animated ? 'group-hover:scale-110' : ''}`} 
        size={size} 
      />
      {animated && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0088cc] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0088cc]"></span>
        </span>
      )}
    </div>
  );
};

// Additional social media icons that might be useful
export const GithubIcon: React.FC<{ className?: string; size?: number }> = ({ className, size = 24 }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
      <path d="M9 18c-4.51 2-5-2-7-2"></path>
    </svg>
  );
};

export const LinkedInIcon: React.FC<{ className?: string; size?: number }> = ({ className, size = 24 }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect width="4" height="12" x="2" y="9"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
};

// User profile card components
export const UserProfileBadge: React.FC<{ 
  type: 'admin' | 'judge' | 'participant' | 'mentor'; 
  className?: string; 
}> = ({ type, className }) => {
  const getBadgeColors = () => {
    switch (type) {
      case 'admin':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'judge':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'mentor':
        return 'bg-success/10 text-success border-success/20';
      case 'participant':
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <div className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getBadgeColors()} ${className}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </div>
  );
};

export const UserAvatar: React.FC<{ 
  name: string; 
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
  status?: 'online' | 'away' | 'offline';
  className?: string;
}> = ({ 
  name, 
  imageUrl, 
  size = 'md', 
  showStatus = false,
  status = 'offline',
  className 
}) => {
  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'w-8 h-8 text-xs';
      case 'lg': return 'w-16 h-16 text-xl';
      case 'md':
      default: return 'w-12 h-12 text-sm';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'away': return 'bg-warning';
      case 'offline': 
      default: return 'bg-muted-foreground';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`${getSizeClass()} rounded-full overflow-hidden flex items-center justify-center bg-primary/10 text-primary font-semibold`}>
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>
      
      {showStatus && (
        <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${getStatusColor()}`}></span>
      )}
    </div>
  );
};
