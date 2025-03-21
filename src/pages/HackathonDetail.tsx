
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Users, Trophy, Clock, ExternalLink, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const HackathonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();

  // Mock data for the hackathon
  const hackathon = {
    id,
    title: "Web3 Innovation Challenge",
    description: "Join the premier Web3 hackathon in Uzbekistan and build the future of decentralized applications. This hackathon brings together the brightest minds in blockchain technology to solve real-world problems.",
    longDescription: "The Web3 Innovation Challenge is a premier event for developers, designers, and entrepreneurs interested in blockchain technology and decentralized applications. Over the course of five days, participants will work in teams to build innovative solutions addressing real-world challenges in the Web3 space.\n\nWhether you're an experienced blockchain developer or just getting started, this hackathon offers a supportive environment to learn, collaborate, and build. Industry experts will be available for mentorship, and the best projects will receive funding and support to continue development after the event.",
    bannerImage: "https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    startDate: "December 15, 2023",
    endDate: "December 20, 2023",
    registrationDeadline: "December 10, 2023",
    location: "Tashkent, Uzbekistan",
    teamSize: "2-5 members",
    prizes: [
      { place: "First Place", reward: "$5,000 + Incubation Program" },
      { place: "Second Place", reward: "$3,000 + Mentorship" },
      { place: "Third Place", reward: "$1,500" },
      { place: "Community Choice", reward: "$500" },
    ],
    timeline: [
      { date: "December 15, 2023", event: "Opening Ceremony & Team Formation" },
      { date: "December 16-19, 2023", event: "Hacking Period" },
      { date: "December 19, 2023", event: "Project Submission Deadline" },
      { date: "December 20, 2023", event: "Final Presentations & Awards" },
    ],
    rules: [
      "All code must be written during the hackathon",
      "Teams must consist of 2-5 members",
      "Solutions must use blockchain technology",
      "Submissions must include source code and a demo video",
      "Participants must comply with the code of conduct",
    ],
    organizers: [
      { name: "Tech Alliance", logo: "https://via.placeholder.com/100" },
      { name: "Blockchain Uzbekistan", logo: "https://via.placeholder.com/100" },
    ],
    sponsors: [
      { name: "CryptoVentures", logo: "https://via.placeholder.com/100" },
      { name: "Web3 Foundation", logo: "https://via.placeholder.com/100" },
      { name: "Innovation Hub", logo: "https://via.placeholder.com/100" },
    ],
    registeredTeams: 18,
    maxTeams: 30,
  };

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
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <Container>
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="max-w-6xl mx-auto space-y-8"
      >
        <motion.div variants={item} className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="group flex items-center gap-2">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>{t("hackathon.back") || "Back"}</span>
            </Button>
          </Link>
        </motion.div>

        {/* Hero Banner */}
        <motion.div variants={item} className="relative rounded-2xl overflow-hidden h-64 md:h-80">
          <img 
            src={hackathon.bannerImage} 
            alt={hackathon.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{hackathon.title}</h1>
            <p className="text-white/80 max-w-2xl">{hackathon.description}</p>
          </div>
        </motion.div>

        {/* Quick Info & Register Button */}
        <motion.div variants={item} className="flex flex-col md:flex-row justify-between gap-6 items-start md:items-center p-6 rounded-xl bg-card border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-muted-foreground">Dates</p>
                <p className="font-medium">{hackathon.startDate} - {hackathon.endDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-muted-foreground">Location</p>
                <p className="font-medium">{hackathon.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-muted-foreground">Team Size</p>
                <p className="font-medium">{hackathon.teamSize}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-muted-foreground">Registration</p>
                <p className="font-medium">Closes {hackathon.registrationDeadline}</p>
              </div>
            </div>
          </div>
          <Button className="w-full md:w-auto">Register Now</Button>
        </motion.div>

        {/* Tabs for Details */}
        <motion.div variants={item}>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="prizes">Prizes</TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">About This Hackathon</h2>
                <p className="text-muted-foreground whitespace-pre-line">{hackathon.longDescription}</p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Organizers</h2>
                <div className="flex gap-6">
                  {hackathon.organizers.map((organizer, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden mb-2">
                        <img src={organizer.logo} alt={organizer.name} className="h-full w-full object-cover" />
                      </div>
                      <p className="text-sm font-medium text-center">{organizer.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Sponsors</h2>
                <div className="flex flex-wrap gap-6">
                  {hackathon.sponsors.map((sponsor, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center overflow-hidden mb-2">
                        <img src={sponsor.logo} alt={sponsor.name} className="h-full w-full object-cover" />
                      </div>
                      <p className="text-sm font-medium text-center">{sponsor.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="prizes" className="space-y-6">
              <h2 className="text-2xl font-semibold">Prizes & Rewards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hackathon.prizes.map((prize, index) => (
                  <Card key={index} className={`border-l-4 ${index === 0 ? 'border-l-amber-500' : index === 1 ? 'border-l-zinc-400' : index === 2 ? 'border-l-amber-800' : 'border-l-primary'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{prize.place}</h3>
                          <p className="text-muted-foreground">{prize.reward}</p>
                        </div>
                        <Trophy className={`h-6 w-6 ${index === 0 ? 'text-amber-500' : index === 1 ? 'text-zinc-400' : index === 2 ? 'text-amber-800' : 'text-primary'}`} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="rules" className="space-y-6">
              <h2 className="text-2xl font-semibold">Hackathon Rules</h2>
              <div className="space-y-4">
                <ul className="space-y-3">
                  {hackathon.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p>{rule}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="timeline" className="space-y-6">
              <h2 className="text-2xl font-semibold">Event Timeline</h2>
              <div className="relative border-l-2 border-primary/20 pl-6 ml-3 space-y-8">
                {hackathon.timeline.map((event, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[33px] h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">{event.event}</p>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Registration Progress */}
        <motion.div variants={item} className="rounded-xl border bg-card/50 p-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold">Registration Progress</h3>
              <p className="text-sm text-muted-foreground">{hackathon.registeredTeams} of {hackathon.maxTeams} teams registered</p>
            </div>
            <div className="flex space-x-3">
              <Button size="sm" variant="outline" className="gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button size="sm" variant="outline" className="gap-1">
                <ExternalLink className="h-4 w-4" />
                Website
              </Button>
            </div>
          </div>
          
          <div className="relative w-full h-2 bg-primary/10 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-primary rounded-full"
              style={{ width: `${(hackathon.registeredTeams / hackathon.maxTeams) * 100}%` }}
            ></div>
          </div>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default HackathonDetail;
