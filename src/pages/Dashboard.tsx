
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { CalendarDays, Users, Award, ArrowRight } from "lucide-react";
import HackathonCard from "@/components/ui/HackathonCard";

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
        className="max-w-6xl mx-auto space-y-12"
      >
        {/* Welcome Section */}
        <motion.div variants={item} className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">{t("dashboard.title") || "Dashboard"}</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Welcome to your personal hackathon dashboard. Manage your projects, teams, and discover new opportunities.
          </p>
        </motion.div>
        
        {/* Stats Cards */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/10 shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-primary/10">
                <CalendarDays className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">3</h3>
                <p className="text-sm text-muted-foreground">Upcoming Events</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 rounded-xl p-6 border border-purple-500/10 shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-purple-500/10">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium">2</h3>
                <p className="text-sm text-muted-foreground">Active Teams</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-amber-500/5 to-amber-500/10 rounded-xl p-6 border border-amber-500/10 shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-amber-500/10">
                <Award className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium">5</h3>
                <p className="text-sm text-muted-foreground">Achievements</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Featured Hackathon */}
        <motion.div variants={item} className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Featured Hackathon</h2>
            <Link to="/hackathons">
              <Button variant="ghost" size="sm" className="text-primary">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <HackathonCard {...featuredHackathon} />
        </motion.div>
        
        {/* Upcoming Hackathons */}
        <motion.div variants={item} className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Upcoming Hackathons</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingHackathons.map((hackathon) => (
              <HackathonCard key={hackathon.id} {...hackathon} />
            ))}
          </div>
        </motion.div>
        
        {/* Quick Actions */}
        <motion.div variants={item} className="flex flex-wrap gap-4 justify-center mt-10">
          <Link to="/team">
            <Button className="rounded-full">
              {t("dashboard.manageTeam") || "Manage Team"}
            </Button>
          </Link>
          <Link to="/cabinet">
            <Button variant="outline" className="rounded-full">
              {t("dashboard.viewProfile") || "View Profile"}
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Dashboard;
