
import React, { useState } from 'react';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

interface AdminHeaderProps {
  username?: string;
  onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ username = "Admin", onLogout }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo purposes
    toast({
      title: "Search",
      description: `Searching for "${searchQuery}"`,
    });
  };

  const handleNotificationsClick = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications",
    });
  };

  return (
    <div className="h-16 px-6 flex items-center justify-between border-b border-border/30 bg-background/95 backdrop-blur-sm">
      <div className="flex items-center gap-4 w-full max-w-md">
        <form onSubmit={handleSearch} className="relative w-full">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 w-full rounded-lg bg-muted/50"
          />
        </form>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full h-10 w-10" 
          onClick={handleNotificationsClick}
        >
          <Bell size={18} />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full h-10 w-10 bg-primary/10">
              <User size={18} className="text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-lg">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2" onClick={() => navigate("/admin/profile")}>
              <User size={16} />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2" onClick={onLogout}>
              <LogOut size={16} />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default AdminHeader;
