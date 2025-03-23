
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Users,
  Calendar,
  BarChart4,
  Settings,
  PlusCircle,
  Home,
  ChevronRight,
  ChevronLeft,
  LogOut,
  Bell,
  HelpCircle
} from "lucide-react";

interface AdminNavigationProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

const AdminNavigation: React.FC<AdminNavigationProps> = ({ currentTab, setTab }) => {
  const [expanded, setExpanded] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      description: "Overview of platform activities"
    },
    {
      id: "hackathons",
      label: "Hackathons",
      icon: <Calendar size={20} />,
      description: "Manage all hackathon events"
    },
    {
      id: "users",
      label: "Users",
      icon: <Users size={20} />,
      description: "User management and roles"
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart4 size={20} />,
      description: "Platform statistics and metrics"
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
      description: "Platform configuration"
    },
  ];

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <aside 
      className={`fixed left-0 top-0 h-full ${expanded ? 'w-64' : 'w-20'} bg-card/50 backdrop-blur-lg border-r border-border/20 flex flex-col items-center py-6 z-20 transition-all duration-300`}
    >
      <div className="flex items-center justify-center relative w-full mb-8">
        <Link to="/" className="flex items-center justify-center">
          <div className={`${expanded ? 'w-12 h-12' : 'w-10 h-10'} rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold transition-all duration-300`}>
            H
          </div>
          {expanded && (
            <span className="ml-3 font-semibold text-lg text-foreground animate-fade-in">
              HackathonUz
            </span>
          )}
        </Link>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 h-8 w-8 rounded-full hover:bg-muted"
          onClick={toggleExpanded}
        >
          {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </Button>
      </div>
      
      <div className="flex flex-col items-center w-full px-3 space-y-2 mt-4">
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <Button
                  variant={currentTab === item.id ? "default" : "ghost"}
                  size={expanded ? "default" : "icon"}
                  className={`${expanded ? 'justify-start w-full' : 'h-12 w-12'} rounded-xl transition-all duration-200 ${
                    currentTab === item.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-primary/10"
                  }`}
                  onClick={() => setTab(item.id)}
                >
                  {item.icon}
                  {expanded && <span className="ml-3">{item.label}</span>}
                </Button>
              </TooltipTrigger>
              {!expanded && (
                <TooltipContent side="right" className="rounded-lg">
                  <div className="flex flex-col">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </div>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
      
      <div className="mt-6 w-full px-3">
        {expanded && <hr className="border-border/30 mb-4" />}
        
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/admin/add-hackathon" className="block w-full">
                <Button
                  variant="outline"
                  size={expanded ? "default" : "icon"}
                  className={`${expanded ? 'justify-start w-full' : 'h-12 w-12'} rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200`}
                >
                  <PlusCircle size={expanded ? 16 : 20} />
                  {expanded && <span className="ml-3">Create Hackathon</span>}
                </Button>
              </Link>
            </TooltipTrigger>
            {!expanded && (
              <TooltipContent side="right">
                <span>Create New Hackathon</span>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="mt-auto w-full px-3 space-y-2">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size={expanded ? "default" : "icon"}
                className={`${expanded ? 'justify-start w-full' : 'h-12 w-12'} rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200 relative`}
              >
                <Bell size={expanded ? 16 : 20} />
                {expanded && <span className="ml-3">Notifications</span>}
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 bg-destructive text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            {!expanded && (
              <TooltipContent side="right">
                <span>Notifications ({notificationCount})</span>
              </TooltipContent>
            )}
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size={expanded ? "default" : "icon"}
                className={`${expanded ? 'justify-start w-full' : 'h-12 w-12'} rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200`}
              >
                <HelpCircle size={expanded ? 16 : 20} />
                {expanded && <span className="ml-3">Help & Support</span>}
              </Button>
            </TooltipTrigger>
            {!expanded && (
              <TooltipContent side="right">
                <span>Help & Support</span>
              </TooltipContent>
            )}
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/" className="block w-full">
                <Button
                  variant="ghost"
                  size={expanded ? "default" : "icon"}
                  className={`${expanded ? 'justify-start w-full' : 'h-12 w-12'} rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200`}
                >
                  <Home size={expanded ? 16 : 20} />
                  {expanded && <span className="ml-3">Go to Website</span>}
                </Button>
              </Link>
            </TooltipTrigger>
            {!expanded && (
              <TooltipContent side="right">
                <span>Go to Website</span>
              </TooltipContent>
            )}
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/login" className="block w-full">
                <Button
                  variant="ghost"
                  size={expanded ? "default" : "icon"}
                  className={`${expanded ? 'justify-start w-full' : 'h-12 w-12'} rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all duration-200 mt-2`}
                >
                  <LogOut size={expanded ? 16 : 20} />
                  {expanded && <span className="ml-3">Logout</span>}
                </Button>
              </Link>
            </TooltipTrigger>
            {!expanded && (
              <TooltipContent side="right">
                <span>Logout</span>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};

export default AdminNavigation;
