
import React from "react";
import { Layout, Users, Award, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const AdminNavigation = () => {
  return (
    <motion.div 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-20 bg-primary/10 h-screen flex flex-col items-center py-8"
    >
      <div className="flex flex-col items-center mb-12">
        <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
          A
        </div>
      </div>

      <div className="flex flex-col items-center space-y-8 flex-grow">
        <NavItem icon={<Layout size={24} />} label="Dashboard" active />
        <NavItem icon={<Award size={24} />} label="Hackathons" />
        <NavItem icon={<Users size={24} />} label="Users" />
        <NavItem icon={<Settings size={24} />} label="Settings" />
      </div>

      <div className="mt-auto pb-6">
        <NavItem icon={<LogOut size={24} />} label="Logout" />
      </div>
    </motion.div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem = ({ icon, label, active = false }: NavItemProps) => {
  return (
    <div className="relative group">
      <div
        className={`p-3 rounded-full ${
          active ? "bg-primary text-primary-foreground" : "hover:bg-primary/20"
        } transition-all duration-300 cursor-pointer`}
      >
        {icon}
      </div>
      <div className="absolute left-full ml-2 px-2 py-1 bg-background border rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {label}
      </div>
    </div>
  );
};

export default AdminNavigation;
