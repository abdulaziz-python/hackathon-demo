
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { CalendarDays, Users, Award, ArrowRight, BarChart, TrendingUp, Flag, Clock } from "lucide-react";
import HackathonCard from "@/components/ui/HackathonCard";
import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  const { t } = useLanguage();
  
  // Mock data for featured and upcoming hackathons
  const featuredHackathon = {
    id: "1",
    title: "Web3 Innovation Challenge",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    topic: "Blockchain",
    organizer: "Tech Alliance",
    prizes: "$10,000 in prizes",
    date: "December 15-20, 2023",
    location: "Tashkent, Uzbekistan",
  };
  
  const upcomingHackathons = [
    {
      id: "2",
      title: "AI Innovation Summit",
      imageUrl: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      topic: "Artificial Intelligence",
      organizer: "Data Science Hub",
      prizes: "$5,000 + mentorship",
      date: "January 10-15, 2024",
      location: "Samarkand, Uzbekistan",
    },
    {
      id: "3",
      title: "Mobile App Challenge",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      topic: "Mobile Development",
      organizer: "StartUp Hub",
      prizes: "$3,000 in prizes",
      date: "February 5-10, 2024",
      location: "Online Event",
    },
  ];

  // Upcoming events
  const upcomingEvents = [
    { id: 1, title: "Team Formation", date: "Oct 8, 2023", type: "workshop" },
    { id: 2, title: "Project Submission", date: "Oct 15, 2023", type: "deadline" },
    { id: 3, title: "Mentor Session", date: "Oct 10, 2023", type: "mentoring" },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };
  
  return (
    <Container>
      <motion.div 
        initial="hidden"
        animate="show"
        variants={container}
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <motion.div variants={item}>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's what's happening with your hackathons.
            </p>
          </motion.div>
          
          <motion.div variants={item} className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-lg">
              <Flag className="h-4 w-4 mr-2" />
              Create Team
            </Button>
            <Button size="sm" className="rounded-lg">
              <ArrowRight className="h-4 w-4 mr-2" />
              Join Hackathon
            </Button>
          </motion.div>
        </div>
        
        {/* Stats Cards */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="macos-card shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-50 dark:bg-blue-500/10 p-3 rounded-full">
                  <CalendarDays className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                  <h3 className="text-xl font-semibold mt-0.5">3</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="macos-card shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-50 dark:bg-indigo-500/10 p-3 rounded-full">
                  <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Teams</p>
                  <h3 className="text-xl font-semibold mt-0.5">2</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="macos-card shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center space-x-4">
                <div className="bg-amber-50 dark:bg-amber-500/10 p-3 rounded-full">
                  <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                  <h3 className="text-xl font-semibold mt-0.5">5</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="macos-card shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center space-x-4">
                <div className="bg-emerald-50 dark:bg-emerald-500/10 p-3 rounded-full">
                  <BarChart className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Projects</p>
                  <h3 className="text-xl font-semibold mt-0.5">7</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Featured and Calendar Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Hackathon */}
          <motion.div variants={item} className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Featured Hackathon</h2>
            </div>
            
            <Card className="macos-card overflow-hidden">
              <div className="relative h-40">
                <img 
                  src={featuredHackathon.imageUrl}
                  alt={featuredHackathon.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <span className="inline-block text-xs font-medium bg-primary/80 px-2 py-0.5 rounded-full mb-1">{featuredHackathon.topic}</span>
                  <h3 className="text-lg font-semibold">{featuredHackathon.title}</h3>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Date</p>
                    <div className="flex items-center">
                      <CalendarDays className="h-3.5 w-3.5 mr-1.5 text-primary" />
                      <p className="text-sm">{featuredHackathon.date}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm">{featuredHackathon.location}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Prizes</p>
                    <p className="text-sm">{featuredHackathon.prizes}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Organizer</p>
                    <p className="text-sm">{featuredHackathon.organizer}</p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Link to={`/hackathons/${featuredHackathon.id}`}>
                    <Button size="sm" className="rounded-lg">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Upcoming Calendar */}
          <motion.div variants={item}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upcoming Events</h2>
            </div>
            
            <Card className="macos-card h-[calc(100%-2rem)]">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-muted-foreground">October 2023</p>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <ArrowRight className="h-4 w-4 rotate-180" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="flex items-start p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className={`p-2 rounded-full mr-3 ${
                        event.type === 'workshop' ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' : 
                        event.type === 'deadline' ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' : 
                        'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                      }`}>
                        {event.type === 'workshop' ? <Users className="h-4 w-4" /> : 
                         event.type === 'deadline' ? <Clock className="h-4 w-4" /> : 
                         <TrendingUp className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{event.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center pt-2">
                  <Button variant="outline" size="sm" className="rounded-lg w-full text-xs h-8">
                    View Full Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Upcoming Hackathons */}
        <motion.div variants={item} className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recommended for You</h2>
            <Button variant="link" size="sm" className="text-primary">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingHackathons.map((hackathon) => (
              <Link to={`/hackathons/${hackathon.id}`} key={hackathon.id}>
                <Card className="macos-card overflow-hidden hover:shadow-md transition-all duration-200 h-full">
                  <div className="relative h-32">
                    <img 
                      src={hackathon.imageUrl}
                      alt={hackathon.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <span className="inline-block text-xs font-medium bg-primary/80 px-2 py-0.5 rounded-full mb-1">{hackathon.topic}</span>
                      <h3 className="text-base font-semibold">{hackathon.title}</h3>
                    </div>
                  </div>
                  
                  <CardContent className="p-3">
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                      <div className="flex items-center">
                        <CalendarDays className="h-3.5 w-3.5 mr-1.5 text-primary" />
                        <span className="text-xs">{hackathon.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="h-3.5 w-3.5 mr-1.5 text-primary" />
                        <span className="text-xs">{hackathon.prizes}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Dashboard;
