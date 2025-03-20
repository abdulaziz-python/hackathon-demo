import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, CalendarDays, MapPin, Trophy, ChevronRight, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

// Mock data - keep the same structure but simplified
const upcomingHackathons = [
  {
    id: "1",
    title: "AI Innovation Challenge",
    topic: "AI",
    organizer: "TechHub",
    prizes: "$5,000",
    date: "June 15-18, 2024",
    location: "Online",
  },
  {
    id: "2",
    title: "Web3 Builders Hackathon",
    topic: "Web3",
    organizer: "Blockchain Association",
    prizes: "$10,000",
    date: "July 22-25, 2024",
    location: "Tashkent",
  },
  {
    id: "3",
    title: "Mobile App Challenge",
    topic: "Mobile",
    organizer: "DevCommunity",
    prizes: "$3,000",
    date: "August 5-8, 2024",
    location: "Hybrid",
  },
];

// Simplified featured hackathon
const featuredHackathon = {
  id: "featured",
  title: "National Innovation Challenge",
  description: "Join the largest hackathon in Uzbekistan and compete with the best tech talents.",
  topic: "Innovation",
  organizer: "Ministry of Innovation",
  prizes: "$15,000",
  date: "May 20-23, 2024",
  location: "Tashkent",
  registrationEndDate: "May 10, 2024",
};

// Top teams for leaderboard
const topTeams = [
  { id: "1", name: "CodeCrafters", score: 92.5, rank: 1 },
  { id: "2", name: "Innovators Inc.", score: 88.0, rank: 2 },
  { id: "3", name: "Tech Titans", score: 85.2, rank: 3 },
];

const Index = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <Container withoutPadding>
      {/* Hero Section - Minimalist with no image, using typography and space */}
      <section className="min-h-[85vh] flex items-center py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block text-sm font-medium text-primary py-1">
                hackathon.uz
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            >
              Innovate. <span className="text-primary">Build.</span> Transform.
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto"
            >
              Join the premier hackathon platform in Uzbekistan and showcase your talent in building innovative solutions.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="rounded-full">
                Browse Hackathons
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="lg" className="rounded-full">
                Host an Event
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Upcoming Events Section - Clean and minimal */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
            <h2 className="text-3xl font-bold mb-4 md:mb-0">Upcoming Hackathons</h2>
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search hackathons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-full"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {upcomingHackathons.map((hackathon) => (
              <motion.div
                key={hackathon.id}
                className="bg-card rounded-2xl p-6 hover:shadow-md transition-all duration-300 border border-border/40"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    {hackathon.topic}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{hackathon.title}</h3>
                
                <div className="space-y-3 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-3 text-primary" />
                    <span>{hackathon.date}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-3 text-primary" />
                    <span>{hackathon.location}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Trophy className="h-4 w-4 mr-3 text-primary" />
                    <span>{hackathon.prizes}</span>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Link to={`/hackathons/${hackathon.id}`}>
                    <Button variant="ghost" size="sm" className="group rounded-full">
                      <span className="mr-1 group-hover:mr-2 transition-all">Details</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" className="rounded-full">
              View All Hackathons
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Event - Minimal design */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="bg-gradient-to-b from-primary/5 to-transparent rounded-3xl p-8 md:p-12 border border-primary/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4">
                    Featured Event
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{featuredHackathon.title}</h3>
                  
                  <p className="text-muted-foreground mb-6">{featuredHackathon.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                        <span>{featuredHackathon.date}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        <span>{featuredHackathon.location}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Trophy className="h-4 w-4 mr-2 text-primary" />
                        <span>{featuredHackathon.prizes}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        <span>Closes {featuredHackathon.registrationEndDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="rounded-full">
                      Register Now
                    </Button>
                    
                    <Link to={`/hackathons/${featuredHackathon.id}`}>
                      <Button variant="outline" className="rounded-full">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="h-40 w-40 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center">
                  <Trophy className="h-16 w-16 text-primary" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Leaderboard Section - Minimal */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Top Teams</h2>
              <p className="text-muted-foreground">The leading innovators on our platform</p>
            </div>
            
            <div className="bg-card rounded-2xl border border-border/40 overflow-hidden">
              {topTeams.map((team, index) => (
                <motion.div 
                  key={team.id}
                  className={`flex items-center justify-between p-6 ${
                    index !== topTeams.length - 1 ? "border-b border-border/40" : ""
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <span className="font-bold text-primary">{team.rank}</span>
                    </div>
                    
                    <div>
                      <h4 className="font-bold">{team.name}</h4>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Users className="h-3 w-3 mr-1" />
                        <span>Team</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold">{team.score.toFixed(1)}</div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/leaderboard">
                <Button variant="outline" className="rounded-full">
                  View Full Leaderboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section - Clean and minimal */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Showcase Your Skills?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join our community of innovators and problem-solvers. Create your profile and start participating in hackathons today.
            </p>
            
            <Button size="lg" className="rounded-full">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </Container>
  );
};

export default Index;
