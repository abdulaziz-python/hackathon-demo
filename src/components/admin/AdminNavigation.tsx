
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Calendar,
  BarChart4,
  Settings,
  PlusCircle,
  Home
} from "lucide-react";

interface AdminNavigationProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

const AdminNavigation: React.FC<AdminNavigationProps> = ({ currentTab, setTab }) => {
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      id: "hackathons",
      label: "Hackathons",
      icon: <Calendar size={20} />,
    },
    {
      id: "users",
      label: "Users",
      icon: <Users size={20} />,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart4 size={20} />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-20 bg-card/50 backdrop-blur-lg border-r border-border/20 flex flex-col items-center py-6 z-20">
      <Link to="/" className="mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold transition-colors">
          H
        </div>
      </Link>
      
      <div className="flex flex-col items-center space-y-4 mt-6">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={currentTab === item.id ? "default" : "ghost"}
            size="icon"
            className={`h-12 w-12 rounded-xl ${
              currentTab === item.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "hover:bg-primary/10"
            }`}
            onClick={() => setTab(item.id)}
          >
            {item.icon}
          </Button>
        ))}
      </div>
      
      <div className="mt-auto">
        <Link to="/add-hackathon">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-xl hover:bg-primary/10 hover:text-primary"
          >
            <PlusCircle size={20} />
          </Button>
        </Link>
      </div>
      
      <div className="mt-4">
        <Link to="/">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-xl hover:bg-primary/10 hover:text-primary"
          >
            <Home size={20} />
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default AdminNavigation;
