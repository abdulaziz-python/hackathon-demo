
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  User, Settings, Trophy, Bookmark, Calendar, Clock, 
  Bell, Activity, Plus, Users, Zap, FileCode, Award,
  Lightning, Star, Sparkles, BarChart4, LayoutDashboard
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
          <h1 className="text-3xl font-bold gradient-text">{t("cabinet.title")}</h1>
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
          <div className="premium-card rounded-2xl overflow-hidden">
            <div className="relative h-32">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-primary/10"></div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850715649-1d0106293bd1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
            </div>
            
            <div className="p-6 md:p-8 -mt-16 relative z-10">
              <div className="flex flex-col md:flex-row md:items-end">
                <div className="w-24 h-24 rounded-xl border-4 border-card overflow-hidden shadow-lg">
                  <img
                    src={userDashboardData.user.avatar}
                    alt={userDashboardData.user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-5 flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{userDashboardData.user.name}</h2>
                      <p className="text-muted-foreground">{userDashboardData.user.username}</p>
                    </div>
                    
                    <div className="mt-3 md:mt-0">
                      <Link to="/dashboard">
                        <Button variant="outline" size="sm" className="rounded-full">
                          <Settings className="h-4 w-4 mr-2" />
                          {t("dashboard.editProfile")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="mt-1 flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{userDashboardData.user.lastLogin}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                <div className="premium-card rounded-xl p-4 text-center">
                  <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-lg font-bold">{userDashboardData.stats.hackathons}</p>
                  <p className="text-sm text-muted-foreground">{t("cabinet.stats.hackathons")}</p>
                </div>
                
                <div className="premium-card rounded-xl p-4 text-center">
                  <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-lg font-bold">{userDashboardData.stats.teams}</p>
                  <p className="text-sm text-muted-foreground">{t("cabinet.stats.teams")}</p>
                </div>
                
                <div className="premium-card rounded-xl p-4 text-center">
                  <FileCode className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-lg font-bold">{userDashboardData.stats.projects}</p>
                  <p className="text-sm text-muted-foreground">{t("cabinet.stats.projects")}</p>
                </div>
                
                <div className="premium-card rounded-xl p-4 text-center">
                  <Trophy className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-lg font-bold">{userDashboardData.stats.achievements}</p>
                  <p className="text-sm text-muted-foreground">{t("cabinet.stats.achievements")}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="premium-card rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border/20">
              <div className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-primary" />
                <h3 className="text-xl font-medium">{t("cabinet.recent.title")}</h3>
              </div>
            </div>
            
            <div className="p-6">
              {userDashboardData.recentActivity.length > 0 ? (
                <div className="space-y-4 relative">
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent"></div>
                  
                  {userDashboardData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start">
                      <div className="w-10 h-10 rounded-full premium-card flex items-center justify-center z-10 mr-4">
                        {getActivityIcon(activity.icon)}
                      </div>
                      
                      <div className="flex-1 premium-card rounded-2xl p-4">
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
              <div className="premium-card group h-full rounded-2xl p-6 text-center transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mx-auto mb-4 flex items-center justify-center transition-colors relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  <Users className="h-7 w-7 text-primary relative z-10" />
                </div>
                <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">{t("cabinet.actions.createTeam")}</h3>
                <p className="text-sm text-muted-foreground">Create or manage your teams</p>
              </div>
            </Link>
            
            <Link to="/">
              <div className="premium-card group h-full rounded-2xl p-6 text-center transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mx-auto mb-4 flex items-center justify-center transition-colors relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  <Lightning className="h-7 w-7 text-primary relative z-10" />
                </div>
                <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">{t("cabinet.actions.joinHackathon")}</h3>
                <p className="text-sm text-muted-foreground">Find and join upcoming hackathons</p>
              </div>
            </Link>
            
            <Link to="/dashboard">
              <div className="premium-card group h-full rounded-2xl p-6 text-center transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mx-auto mb-4 flex items-center justify-center transition-colors relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  <FileCode className="h-7 w-7 text-primary relative z-10" />
                </div>
                <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">{t("cabinet.actions.viewProjects")}</h3>
                <p className="text-sm text-muted-foreground">View or update your projects</p>
              </div>
            </Link>
          </div>
          
          {/* Analytics & Progress */}
          <div className="premium-card rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border/20">
              <div className="flex items-center">
                <BarChart4 className="h-5 w-5 mr-2 text-primary" />
                <h3 className="text-xl font-medium">Your Progress</h3>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-3">SKILL PROGRESS</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Frontend Development</span>
                        <span className="text-sm text-primary font-medium">75%</span>
                      </div>
                      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full" style={{width: '75%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Backend Development</span>
                        <span className="text-sm text-primary font-medium">60%</span>
                      </div>
                      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full" style={{width: '60%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">UI/UX Design</span>
                        <span className="text-sm text-primary font-medium">85%</span>
                      </div>
                      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-3">HACKATHON PERFORMANCE</h4>
                  <div className="bg-gradient-to-br from-background to-muted/10 rounded-xl p-4 border border-border/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Average Score</p>
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-amber-500 mr-1" />
                          <span className="text-2xl font-bold">4.7</span>
                          <span className="text-sm text-muted-foreground ml-1">/ 5.0</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Global Rank</p>
                        <div className="flex items-center">
                          <Trophy className="h-5 w-5 text-primary mr-1" />
                          <span className="text-2xl font-bold">#12</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* User Quick Links */}
          <div className="premium-card rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border/20">
              <div className="flex items-center">
                <LayoutDashboard className="h-5 w-5 mr-2 text-primary" />
                <h3 className="text-xl font-medium">Quick Access</h3>
              </div>
            </div>
            
            <div className="p-3">
              <div className="grid grid-cols-2 gap-2">
                <Link to="/dashboard" className="premium-card rounded-xl p-3 text-center hover:bg-muted/5 transition-colors">
                  <User className="h-6 w-6 text-primary mx-auto mb-1" />
                  <span className="text-sm">Profile</span>
                </Link>
                
                <Link to="/team" className="premium-card rounded-xl p-3 text-center hover:bg-muted/5 transition-colors">
                  <Users className="h-6 w-6 text-primary mx-auto mb-1" />
                  <span className="text-sm">Teams</span>
                </Link>
                
                <Link to="/" className="premium-card rounded-xl p-3 text-center hover:bg-muted/5 transition-colors">
                  <Calendar className="h-6 w-6 text-primary mx-auto mb-1" />
                  <span className="text-sm">Events</span>
                </Link>
                
                <Link to="/leaderboard" className="premium-card rounded-xl p-3 text-center hover:bg-muted/5 transition-colors">
                  <Trophy className="h-6 w-6 text-primary mx-auto mb-1" />
                  <span className="text-sm">Ranks</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Upcoming Events */}
          <div className="premium-card rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border/20">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                <h3 className="text-xl font-medium">{t("cabinet.upcoming.title")}</h3>
              </div>
            </div>
            
            <div className="p-6">
              {userDashboardData.upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {userDashboardData.upcomingEvents.map((event) => (
                    <div key={event.id} className="premium-card rounded-xl p-4 group hover:border-primary/30 transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium group-hover:text-primary transition-colors">{event.title}</h4>
                          <p className="text-xs bg-muted/30 rounded-full px-2 py-0.5 inline-block mt-1">{event.type}</p>
                          <p className="text-sm mt-1">{event.date}</p>
                        </div>
                        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
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
          <div className="premium-card rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border/20">
              <div className="flex items-center">
                <Bookmark className="h-5 w-5 mr-2 text-primary" />
                <h3 className="text-xl font-medium">Saved Hackathons</h3>
              </div>
            </div>
            
            <div className="p-6">
              {userDashboardData.savedHackathons.length > 0 ? (
                <div className="space-y-3">
                  {userDashboardData.savedHackathons.map((hackathon) => (
                    <div key={hackathon.id} className="premium-card rounded-xl flex items-center justify-between p-3 group hover:border-primary/30 transition-all">
                      <div>
                        <h4 className="font-medium text-sm group-hover:text-primary transition-colors">{hackathon.title}</h4>
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
          <div className="premium-card rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border/20">
              <div className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-primary" />
                <h3 className="text-xl font-medium">Recent Achievements</h3>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="premium-card rounded-xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-amber-300/5 opacity-30 transition-opacity duration-500 group-hover:opacity-50"></div>
                  <div className="flex items-center p-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-500/10 flex items-center justify-center mr-4 shadow-inner">
                      <Trophy className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">2nd Place Winner</h4>
                      <p className="text-sm text-muted-foreground">IoT Solutions Hackathon</p>
                    </div>
                  </div>
                </div>
                
                <div className="premium-card rounded-xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-300/5 opacity-30 transition-opacity duration-500 group-hover:opacity-50"></div>
                  <div className="flex items-center p-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400/20 to-blue-500/10 flex items-center justify-center mr-4 shadow-inner">
                      <Sparkles className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Team Player</h4>
                      <p className="text-sm text-muted-foreground">Joined 3 different teams</p>
                    </div>
                  </div>
                </div>
                
                <Link to="/dashboard">
                  <Button variant="ghost" className="w-full mt-2 hover:bg-primary/5 hover:text-primary">
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
