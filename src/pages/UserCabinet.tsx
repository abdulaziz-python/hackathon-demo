
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  User, Settings, Trophy, Bookmark, Calendar, Clock, 
  Bell, Activity, Plus, Users, Zap, FileCode, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock data for the cabinet (for demo purposes)
const userDashboardData = {
  user: {
    id: "user1",
    name: "Kamron Almatov",
    username: "@kamron",
    email: "kamron@example.com",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop",
    lastLogin: "Today, 10:23 AM",
  },
  stats: {
    hackathons: 5,
    teams: 2,
    projects: 7,
    achievements: 3,
  },
  upcomingEvents: [
    {
      id: "event1",
      title: "AI Innovation Challenge",
      type: "Hackathon",
      date: "June 15-18, 2024",
      timeLeft: "3 days",
    },
    {
      id: "event2",
      title: "Team Meeting: CodeCrafters",
      type: "Meeting",
      date: "June 10, 2024",
      timeLeft: "Tomorrow",
    },
  ],
  recentActivity: [
    {
      id: "activity1",
      type: "team_join",
      title: "Joined team CodeCrafters",
      time: "2 days ago",
      icon: "Users",
    },
    {
      id: "activity2",
      type: "hackathon_register",
      title: "Registered for AI Innovation Challenge",
      time: "3 days ago",
      icon: "Calendar",
    },
    {
      id: "activity3",
      type: "achievement",
      title: "Earned 'Team Player' badge",
      time: "1 week ago",
      icon: "Award",
    },
  ],
  savedHackathons: [
    {
      id: "saved1",
      title: "Web3 Builders Hackathon",
      date: "July 22-25, 2024",
    },
    {
      id: "saved2",
      title: "Mobile App Challenge",
      date: "August 5-8, 2024",
    },
  ],
};

const UserCabinet = () => {
  const { t, language, setLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState("overview");
  
  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case "Users":
        return <Users className="h-5 w-5" />;
      case "Calendar":
        return <Calendar className="h-5 w-5" />;
      case "Award":
        return <Award className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  return (
    <Container>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{t("cabinet.title")}</h1>
          <div className="flex space-x-2">
            <Button 
              variant={language === "en" ? "default" : "outline"} 
              size="sm"
              onClick={() => setLanguage("en")}
              className="rounded-full"
            >
              English
            </Button>
            <Button 
              variant={language === "uz" ? "default" : "outline"} 
              size="sm"
              onClick={() => setLanguage("uz")}
              className="rounded-full"
            >
              O'zbek
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">
          {t("cabinet.welcome")}, {userDashboardData.user.name}!
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Card */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm rounded-xl overflow-hidden border border-border animate-fade-in">
            <div className="p-6">
              <div className="flex items-center">
                <div className="w-20 h-20 rounded-full border-4 border-background overflow-hidden">
                  <img
                    src={userDashboardData.user.avatar}
                    alt={userDashboardData.user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="ml-5">
                  <h2 className="text-2xl font-bold">{userDashboardData.user.name}</h2>
                  <p className="text-muted-foreground">{userDashboardData.user.username}</p>
                  <div className="mt-1 flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{userDashboardData.user.lastLogin}</span>
                  </div>
                </div>
                
                <div className="ml-auto">
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Settings className="h-4 w-4 mr-2" />
                      {t("dashboard.editProfile")}
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                <div className="bg-white/40 dark:bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-lg font-bold">{userDashboardData.stats.hackathons}</p>
                  <p className="text-sm text-muted-foreground">{t("cabinet.stats.hackathons")}</p>
                </div>
                
                <div className="bg-white/40 dark:bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-lg font-bold">{userDashboardData.stats.teams}</p>
                  <p className="text-sm text-muted-foreground">{t("cabinet.stats.teams")}</p>
                </div>
                
                <div className="bg-white/40 dark:bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center">
                  <FileCode className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-lg font-bold">{userDashboardData.stats.projects}</p>
                  <p className="text-sm text-muted-foreground">{t("cabinet.stats.projects")}</p>
                </div>
                
                <div className="bg-white/40 dark:bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Trophy className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-lg font-bold">{userDashboardData.stats.achievements}</p>
                  <p className="text-sm text-muted-foreground">{t("cabinet.stats.achievements")}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-medium">{t("cabinet.recent.title")}</h3>
            </div>
            
            <div className="p-6">
              {userDashboardData.recentActivity.length > 0 ? (
                <div className="space-y-4 relative">
                  <div className="absolute left-[22px] top-1 bottom-1 w-px bg-border"></div>
                  
                  {userDashboardData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start">
                      <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center z-10 mr-4">
                        {getActivityIcon(activity.icon)}
                      </div>
                      
                      <div className="flex-1 bg-muted/30 rounded-lg p-3">
                        <h4 className="font-medium">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h4 className="text-lg font-medium mb-1">{t("cabinet.recent.noActivity")}</h4>
                </div>
              )}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/team">
              <div className="group bg-card hover:bg-primary/5 border border-border rounded-xl p-6 text-center transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 flex items-center justify-center transition-colors">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">{t("cabinet.actions.createTeam")}</h3>
                <p className="text-sm text-muted-foreground">Create or manage your teams</p>
              </div>
            </Link>
            
            <Link to="/">
              <div className="group bg-card hover:bg-primary/5 border border-border rounded-xl p-6 text-center transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 flex items-center justify-center transition-colors">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">{t("cabinet.actions.joinHackathon")}</h3>
                <p className="text-sm text-muted-foreground">Find and join upcoming hackathons</p>
              </div>
            </Link>
            
            <Link to="/dashboard">
              <div className="group bg-card hover:bg-primary/5 border border-border rounded-xl p-6 text-center transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 mx-auto mb-4 flex items-center justify-center transition-colors">
                  <FileCode className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">{t("cabinet.actions.viewProjects")}</h3>
                <p className="text-sm text-muted-foreground">View or update your projects</p>
              </div>
            </Link>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Upcoming Events */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-medium">{t("cabinet.upcoming.title")}</h3>
            </div>
            
            <div className="p-6">
              {userDashboardData.upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {userDashboardData.upcomingEvents.map((event) => (
                    <div key={event.id} className="bg-muted/30 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-xs text-muted-foreground">{event.type}</p>
                          <p className="text-sm mt-1">{event.date}</p>
                        </div>
                        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {event.timeLeft}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h4 className="text-lg font-medium mb-1">{t("cabinet.upcoming.noEvents")}</h4>
                </div>
              )}
            </div>
          </div>
          
          {/* Saved Hackathons */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-medium">Saved Hackathons</h3>
            </div>
            
            <div className="p-6">
              {userDashboardData.savedHackathons.length > 0 ? (
                <div className="space-y-3">
                  {userDashboardData.savedHackathons.map((hackathon) => (
                    <div key={hackathon.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <h4 className="font-medium text-sm">{hackathon.title}</h4>
                        <p className="text-xs text-muted-foreground">{hackathon.date}</p>
                      </div>
                      <Bookmark className="h-4 w-4 text-primary" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6">
                  <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h4 className="text-lg font-medium mb-1">No saved hackathons</h4>
                </div>
              )}
            </div>
          </div>
          
          {/* Achievements */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-medium">Recent Achievements</h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gradient-to-r from-amber-100/50 to-amber-50/30 dark:from-amber-900/20 dark:to-amber-800/10 rounded-lg border border-amber-200/30 dark:border-amber-700/30">
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mr-4">
                    <Trophy className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">2nd Place Winner</h4>
                    <p className="text-sm text-muted-foreground">IoT Solutions Hackathon</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gradient-to-r from-blue-100/50 to-blue-50/30 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg border border-blue-200/30 dark:border-blue-700/30">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-4">
                    <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Team Player</h4>
                    <p className="text-sm text-muted-foreground">Joined 3 different teams</p>
                  </div>
                </div>
                
                <Link to="/dashboard">
                  <Button variant="ghost" className="w-full mt-2">
                    <Trophy className="h-4 w-4 mr-2" />
                    View All Achievements
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserCabinet;
