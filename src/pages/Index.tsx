
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Filter, Search, Calendar, MapPin, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "@/components/ui/Container";
import HackathonCard from "@/components/ui/HackathonCard";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock data
const upcomingHackathons = [
  {
    id: "1",
    title: "AI Innovation Challenge",
    imageUrl: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1974&auto=format&fit=crop",
    topic: "AI",
    organizer: "TechHub",
    prizes: "$5,000 + Mentorship",
    date: "June 15-18, 2024",
    location: "Online",
  },
  {
    id: "2",
    title: "Web3 Builders Hackathon",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    topic: "Web3",
    organizer: "Blockchain Association",
    prizes: "$10,000 + Funding",
    date: "July 22-25, 2024",
    location: "Tashkent",
  },
  {
    id: "3",
    title: "Mobile App Challenge",
    imageUrl: "https://images.unsplash.com/photo-1551739440-5dd934d3a94a?q=80&w=2064&auto=format&fit=crop",
    topic: "Mobile",
    organizer: "DevCommunity",
    prizes: "$3,000 + App Store Feature",
    date: "August 5-8, 2024",
    location: "Hybrid",
  },
  {
    id: "4",
    title: "Cybersecurity Hackathon",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    topic: "Security",
    organizer: "SecureNet",
    prizes: "$7,500 + Job Offers",
    date: "September 10-12, 2024",
    location: "Samarkand",
  },
  {
    id: "5",
    title: "HealthTech Innovation",
    imageUrl: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?q=80&w=2070&auto=format&fit=crop",
    topic: "Health",
    organizer: "MediTech",
    prizes: "$6,000 + Partnership",
    date: "October 18-20, 2024",
    location: "Bukhara",
  },
  {
    id: "6",
    title: "Sustainable Tech Challenge",
    imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
    topic: "Sustainability",
    organizer: "EcoTech",
    prizes: "$5,000 + Accelerator Program",
    date: "November 3-6, 2024",
    location: "Online",
  },
];

const featuredHackathon = {
  id: "featured",
  title: "National Innovation Challenge",
  description: "Join the largest hackathon in Uzbekistan and compete with the best tech talents from across the country. Build innovative solutions to real-world problems and win amazing prizes!",
  imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
  topic: "Innovation",
  organizer: "Ministry of Innovation",
  prizes: "$15,000 + Incubation",
  date: "May 20-23, 2024",
  location: "Tashkent Convention Center",
  registrationEndDate: "May 10, 2024",
};

// Filter options
const topicOptions = ["All Topics", "AI", "Web3", "Mobile", "Security", "Health", "Sustainability"];
const locationOptions = ["All Locations", "Online", "Tashkent", "Samarkand", "Bukhara", "Hybrid"];
const dateOptions = ["All Dates", "This Week", "This Month", "Next Month", "This Year"];

const Index = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedDate, setSelectedDate] = useState("All Dates");
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close filters when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };
    
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Filter hackathons based on search and filters
  const filteredHackathons = upcomingHackathons.filter((hackathon) => {
    const matchesSearch = hackathon.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           hackathon.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           hackathon.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTopic = selectedTopic === "All Topics" || hackathon.topic === selectedTopic;
    const matchesLocation = selectedLocation === "All Locations" || hackathon.location === selectedLocation;
    
    // Simple date filtering logic (could be more sophisticated with actual date parsing)
    const matchesDate = selectedDate === "All Dates";
    
    return matchesSearch && matchesTopic && matchesLocation && matchesDate;
  });

  return (
    <Container withoutPadding>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-70 z-20"></div>
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop"
            alt="Hackathon background"
            className="w-full h-full object-cover animate-[pulse_15s_ease-in-out_infinite]"
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 mt-16">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 text-sm font-medium border border-primary/30 rounded-full text-primary backdrop-blur-sm mb-4 animate-fade-in">
              {t("home.hero.subtitle")}
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
              {t("home.hero.title")}
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-8 animate-fade-in animation-delay-200">
              {t("home.hero.description")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-400">
              <Button size="lg" className="rounded-full">
                {t("home.hero.browse")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="lg" className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                {t("home.hero.create")}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <div className="animate-bounce">
            <ArrowRight className="h-6 w-6 text-white transform rotate-90" />
          </div>
        </div>
      </section>
      
      {/* Featured Hackathon */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">{t("home.featured.title")}</h2>
          
          <div className="bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm rounded-3xl overflow-hidden border border-border">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-full overflow-hidden">
                <img
                  src={featuredHackathon.imageUrl}
                  alt={featuredHackathon.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="tag bg-primary/10 text-primary">{featuredHackathon.topic}</span>
                  <span className="tag">{featuredHackathon.organizer}</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-3">{featuredHackathon.title}</h3>
                
                <p className="text-muted-foreground mb-6">{featuredHackathon.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-primary" />
                    <span>{featuredHackathon.date}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-primary" />
                    <span>{featuredHackathon.location}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Trophy className="h-5 w-5 mr-3 text-primary" />
                    <span>{featuredHackathon.prizes}</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="rounded-full">
                    {t("home.featured.register")}
                  </Button>
                  
                  <Link to={`/hackathons/${featuredHackathon.id}`}>
                    <Button variant="outline" className="rounded-full">
                      {t("home.featured.details")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                <p className="text-sm text-muted-foreground mt-4">
                  {t("home.featured.closes")} {featuredHackathon.registrationEndDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Upcoming Hackathons */}
      <section className="py-20 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t("home.upcoming.title")}</h2>
              <p className="text-muted-foreground">{t("home.upcoming.subtitle")}</p>
            </div>
            
            <div className="mt-4 md:mt-0 w-full md:w-auto">
              <div ref={searchRef} className="relative">
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t("home.upcoming.search")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 rounded-full"
                    />
                  </div>
                  
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {t("home.upcoming.filters")}
                  </Button>
                </div>
                
                {showFilters && (
                  <div className="absolute mt-2 right-0 w-full md:w-80 bg-background border border-border rounded-lg shadow-lg p-4 z-20 animate-fade-in">
                    <div className="mb-4">
                      <label className="text-sm font-medium mb-1 block">Topic</label>
                      <div className="flex flex-wrap gap-2">
                        {topicOptions.map((topic) => (
                          <button
                            key={topic}
                            onClick={() => setSelectedTopic(topic)}
                            className={`px-3 py-1 text-xs rounded-full transition-colors ${
                              selectedTopic === topic
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                            }`}
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="text-sm font-medium mb-1 block">Location</label>
                      <div className="flex flex-wrap gap-2">
                        {locationOptions.map((location) => (
                          <button
                            key={location}
                            onClick={() => setSelectedLocation(location)}
                            className={`px-3 py-1 text-xs rounded-full transition-colors ${
                              selectedLocation === location
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                            }`}
                          >
                            {location}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="text-sm font-medium mb-1 block">Date</label>
                      <div className="flex flex-wrap gap-2">
                        {dateOptions.map((date) => (
                          <button
                            key={date}
                            onClick={() => setSelectedDate(date)}
                            className={`px-3 py-1 text-xs rounded-full transition-colors ${
                              selectedDate === date
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                            }`}
                          >
                            {date}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedTopic("All Topics");
                          setSelectedLocation("All Locations");
                          setSelectedDate("All Dates");
                          setSearchQuery("");
                        }}
                      >
                        {t("filter.clearAll")}
                      </Button>
                      
                      <Button
                        size="sm"
                        onClick={() => setShowFilters(false)}
                      >
                        {t("filter.apply")}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHackathons.length > 0 ? (
              filteredHackathons.map((hackathon) => (
                <HackathonCard key={hackathon.id} {...hackathon} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground mb-4">No hackathons match your search criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedTopic("All Topics");
                    setSelectedLocation("All Locations");
                    setSelectedDate("All Dates");
                    setSearchQuery("");
                  }}
                >
                  {t("filter.clearAll")}
                </Button>
              </div>
            )}
          </div>
          
          {filteredHackathons.length > 0 && (
            <div className="mt-12 text-center">
              <Button variant="outline" className="rounded-full">
                {t("home.upcoming.viewAll")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Why Join Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">{t("home.why.title")}</h2>
            <p className="text-muted-foreground">{t("home.why.subtitle")}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 border border-border animate-fade-in relative group hover:shadow-md transition-shadow">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">{t("home.why.teams.title")}</h3>
              <p className="text-muted-foreground">
                {t("home.why.teams.desc")}
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border animate-fade-in animation-delay-200 relative group hover:shadow-md transition-shadow">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">{t("home.why.compete.title")}</h3>
              <p className="text-muted-foreground">
                {t("home.why.compete.desc")}
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border animate-fade-in animation-delay-400 relative group hover:shadow-md transition-shadow">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">{t("home.why.update.title")}</h3>
              <p className="text-muted-foreground">
                {t("home.why.update.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm rounded-3xl overflow-hidden border border-border p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">{t("home.cta.title")}</h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t("home.cta.subtitle")}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="rounded-full">
                  {t("home.cta.signup")}
                </Button>
                
                <Button variant="outline" size="lg" className="rounded-full">
                  {t("home.cta.learn")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Index;
