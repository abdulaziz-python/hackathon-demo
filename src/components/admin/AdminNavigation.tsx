
import React from "react";
import { Layout, Users, Award, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";

interface AdminNavigationProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

const AdminNavigation = ({ currentTab, setTab }: AdminNavigationProps) => {
  return (
    <motion.div 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-24 bottom-0 w-20 bg-primary/10 h-[calc(100vh-6rem)] flex flex-col items-center py-8 overflow-hidden z-10"
    >
      <div className="flex flex-col items-center mb-12">
        <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
          A
        </div>
      </div>

      <div className="flex flex-col items-center space-y-8 flex-grow">
        <NavItem 
          icon={<Layout size={24} />} 
          label="Dashboard" 
          active={currentTab === "dashboard"} 
          onClick={() => setTab("dashboard")}
        />
        <NavItem 
          icon={<Award size={24} />} 
          label="Hackathons" 
          active={currentTab === "hackathons"}
          onClick={() => setTab("hackathons")}
        />
        <NavItem 
          icon={<Users size={24} />} 
          label="Users" 
          active={currentTab === "users"}
          onClick={() => setTab("users")}
        />
        <NavItem 
          icon={<Settings size={24} />} 
          label="Settings" 
          active={currentTab === "settings"}
          onClick={() => setTab("settings")}
        />
      </div>

      <div className="mt-auto pb-6">
        <NavItem icon={<LogOut size={24} />} label="Logout" onClick={() => {}} />
      </div>
    </motion.div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, active = false, onClick }: NavItemProps) => {
  return (
    <motion.div 
      className="relative group cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div
        className={`p-3 rounded-full ${
          active 
            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
            : "hover:bg-primary/20 text-foreground"
        } transition-all duration-300`}
      >
        {icon}
      </div>
      <div className="absolute left-full ml-2 px-3 py-1.5 bg-background border rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
        {label}
      </div>
    </motion.div>
  );
};

export default AdminNavigation;
