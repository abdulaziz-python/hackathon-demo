
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserAvatar, UserProfileBadge, TelegramIcon, GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { ExternalLink, Mail, MapPin, Award, Star } from "lucide-react";

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface UserProfileCardProps {
  name: string;
  role: 'admin' | 'judge' | 'participant' | 'mentor';
  avatar?: string;
  location?: string;
  bio?: string;
  email?: string;
  telegramUsername?: string;
  githubUsername?: string;
  linkedinUsername?: string;
  skills?: Skill[];
  stats?: {
    hackathons?: number;
    teams?: number;
    awards?: number;
  };
  badges?: { name: string; icon?: React.ReactNode }[];
  variant?: 'default' | 'compact' | 'expanded';
  className?: string;
  onContactClick?: () => void;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  name,
  role,
  avatar,
  location,
  bio,
  email,
  telegramUsername,
  githubUsername,
  linkedinUsername,
  skills = [],
  stats = { hackathons: 0, teams: 0, awards: 0 },
  badges = [],
  variant = 'default',
  className = '',
  onContactClick
}) => {
  const isCompact = variant === 'compact';
  const isExpanded = variant === 'expanded';
  
  return (
    <Card className={`profile-card overflow-hidden ${className}`}>
      <div className="profile-card-banner">
        {badges && badges.length > 0 && (
          <div className="absolute top-3 right-3 flex gap-1">
            {badges.slice(0, 3).map((badge, index) => (
              <div key={index} className="w-6 h-6 rounded-full bg-background/80 flex items-center justify-center" title={badge.name}>
                {badge.icon || <Star className="h-3.5 w-3.5 text-warning" />}
              </div>
            ))}
            {badges.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-background/80 flex items-center justify-center text-xs font-medium">
                +{badges.length - 3}
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="profile-card-avatar-wrapper flex items-end justify-between">
        <UserAvatar 
          name={name} 
          imageUrl={avatar} 
          size={isCompact ? 'sm' : 'lg'} 
          showStatus 
          status="online" 
        />
        
        <UserProfileBadge type={role} className="mb-1" />
      </div>
      
      <div className="profile-card-content">
        <div className="mt-3">
          <h3 className="font-semibold text-lg leading-none">{name}</h3>
          
          {location && (
            <div className="flex items-center mt-1 text-muted-foreground text-sm">
              <MapPin className="h-3.5 w-3.5 mr-1" /> 
              <span>{location}</span>
            </div>
          )}
        </div>
        
        {bio && !isCompact && (
          <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{bio}</p>
        )}
        
        {!isCompact && stats && (
          <div className="profile-stats">
            <div className="profile-stat-item">
              <div className="profile-stat-value">{stats.hackathons || 0}</div>
              <div className="profile-stat-label">Hackathons</div>
            </div>
            <div className="profile-stat-item">
              <div className="profile-stat-value">{stats.teams || 0}</div>
              <div className="profile-stat-label">Teams</div>
            </div>
            <div className="profile-stat-item">
              <div className="profile-stat-value">{stats.awards || 0}</div>
              <div className="profile-stat-label">Awards</div>
            </div>
          </div>
        )}
        
        {isExpanded && skills.length > 0 && (
          <div className="mt-5 space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-1">
              <Award className="h-4 w-4" /> Skills
            </h4>
            <div className="space-y-2">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="skill-progress">
                    <div 
                      className="skill-progress-bar" 
                      style={{ "--progress": `${skill.level}%` } as React.CSSProperties} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-2">
            {telegramUsername && (
              <a 
                href={`https://t.me/${telegramUsername}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              >
                <TelegramIcon size={16} />
              </a>
            )}
            
            {githubUsername && (
              <a 
                href={`https://github.com/${githubUsername}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              >
                <GithubIcon size={16} />
              </a>
            )}
            
            {linkedinUsername && (
              <a 
                href={`https://linkedin.com/in/${linkedinUsername}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              >
                <LinkedInIcon size={16} />
              </a>
            )}
            
            {email && (
              <a 
                href={`mailto:${email}`}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              >
                <Mail size={16} />
              </a>
            )}
          </div>
          
          {onContactClick && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-8 rounded-lg"
              onClick={onContactClick}
            >
              {isCompact ? 'Contact' : 'Message'}
              {!isCompact && <ExternalLink className="ml-1 h-3.5 w-3.5" />}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default UserProfileCard;
