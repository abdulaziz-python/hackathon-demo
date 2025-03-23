
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, Calendar, MapPin, Users, Trophy, Clock, ExternalLink, 
  Share2, Ban, MessageSquare, Send, Shield, UserPlus, UserMinus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { useState } from "react";
import TelegramAuth from "@/components/TelegramAuth";
import { TelegramIcon } from "@/components/ui/Icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

type Team = {
  id: string;
  name: string;
  members: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  }[];
  projectName?: string;
  projectDescription?: string;
  isBanned?: boolean;
  banReason?: string;
};

const HackathonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language, isLoading } = useLanguage();
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isMessageAllDialogOpen, setIsMessageAllDialogOpen] = useState(false);
  const [banReason, setBanReason] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Sample teams data
  const [teams, setTeams] = useState<Team[]>([
    {
      id: "1",
      name: "Code Wizards",
      members: [
        { id: "1", name: "Alex Johnson", role: "Team Lead", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: "2", name: "Sarah Kim", role: "Frontend Developer", avatar: "https://i.pravatar.cc/150?img=5" },
        { id: "3", name: "David Chen", role: "Backend Developer", avatar: "https://i.pravatar.cc/150?img=8" },
      ],
      projectName: "Blockchain Voting System",
      projectDescription: "A secure voting system using blockchain technology"
    },
    {
      id: "2",
      name: "Tech Innovators",
      members: [
        { id: "4", name: "Emily Wilson", role: "Project Manager", avatar: "https://i.pravatar.cc/150?img=9" },
        { id: "5", name: "Michael Brown", role: "Full-stack Developer", avatar: "https://i.pravatar.cc/150?img=4" },
        { id: "6", name: "Jessica Lee", role: "UI/UX Designer", avatar: "https://i.pravatar.cc/150?img=6" },
        { id: "7", name: "Robert Taylor", role: "Blockchain Specialist", avatar: "https://i.pravatar.cc/150?img=3" },
      ],
      projectName: "DeFi Exchange Platform",
      projectDescription: "Decentralized finance exchange for crypto assets"
    },
    {
      id: "3",
      name: "Digital Nomads",
      members: [
        { id: "8", name: "Ryan Garcia", role: "Team Lead", avatar: "https://i.pravatar.cc/150?img=7" },
        { id: "9", name: "Olivia Martinez", role: "Backend Developer", avatar: "https://i.pravatar.cc/150?img=2" },
      ],
      projectName: "Smart Contract Auditor",
      projectDescription: "Automated auditing tool for smart contracts"
    },
  ]);

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

  const handleBanTeam = () => {
    if (selectedTeam) {
      const updatedTeams = teams.map(team => 
        team.id === selectedTeam.id 
          ? { ...team, isBanned: true, banReason } 
          : team
      );
      setTeams(updatedTeams);
      toast({
        title: language === "uz" ? "Jamoa bloklandi" : "Team Banned",
        description: language === "uz" 
          ? `"${selectedTeam.name}" jamoasi bloklandi: ${banReason}` 
          : `Team "${selectedTeam.name}" has been banned: ${banReason}`,
        variant: "default",
      });
      setIsBanDialogOpen(false);
      setBanReason("");
    }
  };

  const handleMessageTeam = () => {
    if (selectedTeam && messageContent) {
      toast({
        title: language === "uz" ? "Xabar yuborildi" : "Message Sent",
        description: language === "uz" 
          ? `"${selectedTeam.name}" jamoasiga xabar yuborildi` 
          : `Message sent to team "${selectedTeam.name}"`,
        variant: "default",
      });
      setIsMessageDialogOpen(false);
      setMessageContent("");
    }
  };

  const handleMessageAllTeams = () => {
    if (messageContent) {
      toast({
        title: language === "uz" ? "Xabarlar yuborildi" : "Messages Sent",
        description: language === "uz" 
          ? "Barcha jamoalarga xabar yuborildi" 
          : "Message sent to all teams",
        variant: "default",
      });
      setIsMessageAllDialogOpen(false);
      setMessageContent("");
    }
  };
  
  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.members.some(member => 
      member.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Container>
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="max-w-6xl mx-auto space-y-6"
      >
        <motion.div variants={item} className="mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="group flex items-center gap-2 rounded-lg">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>{language === "uz" ? "Dashboardga qaytish" : "Back to Dashboard"}</span>
            </Button>
          </Link>
        </motion.div>

        <motion.div variants={item} className="relative rounded-xl overflow-hidden h-64 md:h-72">
          <img 
            src={hackathon.bannerImage} 
            alt={hackathon.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-primary/80 text-white mb-2">Web3</span>
            <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2">{hackathon.title}</h1>
            <p className="text-white/80 max-w-2xl text-sm">{hackathon.description}</p>
          </div>
        </motion.div>

        <motion.div variants={item} className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center p-5 rounded-xl bg-card shadow-sm border border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-muted-foreground text-xs">{t("hackathon.dates")}</p>
                <p className="font-medium">{hackathon.startDate.split(', ')[0]} - {hackathon.endDate.split(', ')[0]}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-muted-foreground text-xs">{t("hackathon.location")}</p>
                <p className="font-medium">{hackathon.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-muted-foreground text-xs">{t("hackathon.teamSize")}</p>
                <p className="font-medium">{hackathon.teamSize}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-muted-foreground text-xs">{t("hackathon.registration")}</p>
                <p className="font-medium">{t("hackathon.deadline")}: {hackathon.registrationDeadline.split(', ')[0]}</p>
              </div>
            </div>
          </div>
          <Button className="w-full md:w-auto rounded-lg" onClick={() => setIsRegisterDialogOpen(true)}>
            {t("hackathon.register")}
            <TelegramIcon className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        <motion.div variants={item}>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-muted/50 p-1 rounded-lg">
              <TabsTrigger value="overview" className="rounded-md">{t("hackathon.overview")}</TabsTrigger>
              <TabsTrigger value="prizes" className="rounded-md">{t("hackathon.prizes")}</TabsTrigger>
              <TabsTrigger value="rules" className="rounded-md">{t("hackathon.rules")}</TabsTrigger>
              <TabsTrigger value="teams" className="rounded-md">{t("hackathon.teams")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card className="macos-card">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">{t("hackathon.about")}</h2>
                  <p className="text-muted-foreground whitespace-pre-line">{hackathon.longDescription}</p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="macos-card">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold">{t("hackathon.organizers")}</h2>
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
                  </CardContent>
                </Card>

                <Card className="macos-card">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold">{t("hackathon.sponsors")}</h2>
                    <div className="flex flex-wrap gap-4">
                      {hackathon.sponsors.map((sponsor, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center overflow-hidden mb-2">
                            <img src={sponsor.logo} alt={sponsor.name} className="h-full w-full object-cover" />
                          </div>
                          <p className="text-xs font-medium text-center">{sponsor.name}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="macos-card">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">{t("hackathon.timeline")}</h2>
                  <div className="relative border-l-2 border-primary/20 pl-6 ml-3 space-y-6 mt-6">
                    {hackathon.timeline.map((event, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-[29px] h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-sm">{event.event}</p>
                          <p className="text-xs text-muted-foreground">{event.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="prizes" className="space-y-6">
              <Card className="macos-card">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">{t("hackathon.prizes")}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {hackathon.prizes.map((prize, index) => (
                      <Card key={index} className={`border-l-4 bg-card/50 ${
                        index === 0 ? 'border-l-amber-500' : 
                        index === 1 ? 'border-l-zinc-400' : 
                        index === 2 ? 'border-l-amber-800' : 'border-l-primary'
                      }`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-base">{prize.place}</h3>
                              <p className="text-muted-foreground text-sm">{prize.reward}</p>
                            </div>
                            <Trophy className={`h-5 w-5 ${
                              index === 0 ? 'text-amber-500' : 
                              index === 1 ? 'text-zinc-400' : 
                              index === 2 ? 'text-amber-800' : 'text-primary'
                            }`} />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="rules" className="space-y-6">
              <Card className="macos-card">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">{t("hackathon.rules")}</h2>
                  <div className="space-y-4">
                    <ul className="space-y-3">
                      {hackathon.rules.map((rule, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5 text-sm">
                            {index + 1}
                          </div>
                          <p className="text-sm">{rule}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="teams" className="space-y-6">
              <Card className="macos-card">
                <CardHeader className="pb-0">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <CardTitle>{t("hackathon.teams")}</CardTitle>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <div className="relative flex-1 sm:w-64">
                        <Input
                          placeholder={t("team.searchTeams")}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-3 rounded-lg"
                        />
                      </div>
                      <Dialog open={isMessageAllDialogOpen} onOpenChange={setIsMessageAllDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="rounded-lg">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            {t("team.messageAll")}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>{t("team.messageAll")}</DialogTitle>
                            <DialogDescription>
                              {language === "uz" 
                                ? "Bu xabar barcha ishtirokchi jamoalarga yuboriladi" 
                                : "This message will be sent to all participating teams"}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <Label htmlFor="message-all">{t("team.messageContent")}</Label>
                            <Textarea
                              id="message-all"
                              value={messageContent}
                              onChange={(e) => setMessageContent(e.target.value)}
                              placeholder={language === "uz" ? "Xabaringizni kiriting..." : "Type your message..."}
                              className="min-h-[100px]"
                            />
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsMessageAllDialogOpen(false)}>{language === "uz" ? "Bekor qilish" : "Cancel"}</Button>
                            <Button onClick={handleMessageAllTeams}>
                              <Send className="h-4 w-4 mr-2" />
                              {t("team.messageSend")}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {filteredTeams.length === 0 ? (
                    <div className="text-center py-10">
                      <Users className="h-10 w-10 mx-auto text-muted-foreground/50" />
                      <p className="mt-2 text-muted-foreground">{t("team.noTeams")}</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {filteredTeams.map((team) => (
                        <Card key={team.id} className={`overflow-hidden ${team.isBanned ? 'border-destructive/30 bg-destructive/5' : ''}`}>
                          <CardContent className="p-0">
                            <div className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium">{team.name}</h3>
                                    {team.isBanned && (
                                      <Badge variant="destructive" className="text-xs">
                                        <Ban className="h-3 w-3 mr-1" />
                                        {language === "uz" ? "Bloklangan" : "Banned"}
                                      </Badge>
                                    )}
                                  </div>
                                  
                                  {team.projectName && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {language === "uz" ? "Loyiha" : "Project"}: {team.projectName}
                                    </p>
                                  )}
                                </div>
                                
                                <div className="flex gap-1">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <Shield className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md">
                                      <DialogHeader>
                                        <DialogTitle>{team.name} {language === "uz" ? "jamoasi ma'lumotlari" : "Team Details"}</DialogTitle>
                                      </DialogHeader>
                                      <div className="space-y-4 py-4">
                                        <div>
                                          <h4 className="text-sm font-medium mb-2">{language === "uz" ? "A'zolar" : "Members"}</h4>
                                          <div className="space-y-3">
                                            {team.members.map(member => (
                                              <div key={member.id} className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                  <AvatarImage src={member.avatar} alt={member.name} />
                                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                  <p className="text-sm font-medium">{member.name}</p>
                                                  <p className="text-xs text-muted-foreground">{member.role}</p>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                        
                                        {team.projectDescription && (
                                          <div>
                                            <h4 className="text-sm font-medium mb-2">{language === "uz" ? "Loyiha tavsifi" : "Project Description"}</h4>
                                            <p className="text-sm text-muted-foreground">{team.projectDescription}</p>
                                          </div>
                                        )}
                                        
                                        {team.isBanned && (
                                          <div className="border p-3 rounded-md bg-destructive/5 border-destructive/20">
                                            <h4 className="text-sm font-medium text-destructive mb-1">{language === "uz" ? "Bloklash sababi" : "Ban Reason"}</h4>
                                            <p className="text-sm text-muted-foreground">{team.banReason}</p>
                                          </div>
                                        )}
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                  
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => {
                                      setSelectedTeam(team);
                                      setIsMessageDialogOpen(true);
                                    }}
                                    disabled={team.isBanned}
                                  >
                                    <MessageSquare className="h-4 w-4" />
                                  </Button>
                                  
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-destructive"
                                    onClick={() => {
                                      setSelectedTeam(team);
                                      setIsBanDialogOpen(true);
                                    }}
                                    disabled={team.isBanned}
                                  >
                                    <Ban className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-1 mt-4">
                                {team.members.slice(0, 3).map((member, index) => (
                                  <Avatar key={member.id} className={`h-7 w-7 border-2 border-background ${index > 0 ? '-ml-2' : ''}`}>
                                    <AvatarImage src={member.avatar} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                ))}
                                
                                {team.members.length > 3 && (
                                  <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center -ml-2 text-xs border-2 border-background">
                                    +{team.members.length - 3}
                                  </div>
                                )}
                                
                                <span className="text-xs text-muted-foreground ml-2">
                                  {team.members.length} {language === "uz" ? "a'zo" : "members"}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border bg-card/50 p-5 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <h3 className="text-base font-semibold">{t("hackathon.registrationProgress")}</h3>
              <p className="text-sm text-muted-foreground">{hackathon.registeredTeams} {t("hackathon.registeredTeams")} {hackathon.maxTeams}</p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="gap-1 rounded-lg text-xs h-8">
                <Share2 className="h-3.5 w-3.5" />
                {t("hackathon.share")}
              </Button>
              <Button size="sm" variant="outline" className="gap-1 rounded-lg text-xs h-8">
                <ExternalLink className="h-3.5 w-3.5" />
                {t("hackathon.website")}
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

      {/* Registration Dialog */}
      <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{language === "uz" ? `${hackathon.title} ga ro'yxatdan o'tish` : `Register for ${hackathon.title}`}</DialogTitle>
          </DialogHeader>
          <TelegramAuth onSuccess={() => setIsRegisterDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Ban Team Dialog */}
      <Dialog open={isBanDialogOpen} onOpenChange={setIsBanDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("team.ban")}</DialogTitle>
            <DialogDescription>
              {language === "uz" 
                ? `"${selectedTeam?.name}" jamoasini bloklashni tasdiqlang.` 
                : `Confirm banning team "${selectedTeam?.name}".`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="reason">{t("team.banReason")}</Label>
            <Textarea
              id="reason"
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              placeholder={language === "uz" ? "Bloklash sababini kiriting..." : "Enter the reason for banning..."}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBanDialogOpen(false)}>{language === "uz" ? "Bekor qilish" : "Cancel"}</Button>
            <Button variant="destructive" onClick={handleBanTeam} disabled={!banReason}>
              <Ban className="h-4 w-4 mr-2" />
              {t("team.banConfirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Message Team Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("team.messageTitle")}</DialogTitle>
            <DialogDescription>
              {language === "uz" 
                ? `"${selectedTeam?.name}" jamoasiga xabar yuborish` 
                : `Send a message to team "${selectedTeam?.name}"`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="message">{t("team.messageContent")}</Label>
            <Textarea
              id="message"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder={language === "uz" ? "Xabaringizni kiriting..." : "Type your message..."}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>{language === "uz" ? "Bekor qilish" : "Cancel"}</Button>
            <Button onClick={handleMessageTeam} disabled={!messageContent}>
              <Send className="h-4 w-4 mr-2" />
              {t("team.messageSend")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default HackathonDetail;
