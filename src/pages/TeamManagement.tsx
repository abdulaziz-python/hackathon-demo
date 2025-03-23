
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription, 
  CardFooter
} from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserProfileCard } from "@/components/ui/UserProfileCard";
import { 
  Users, 
  UserPlus, 
  MessageSquare, 
  Send, 
  UserX, 
  Globe, 
  Target, 
  Trophy, 
  Github, 
  Mail,
  Search,
  Filter
} from "lucide-react";

type TeamMember = {
  id: string;
  name: string;
  role: "admin" | "participant" | "mentor" | "judge";
  avatar?: string;
  skills: { name: string; level: number }[];
  email?: string;
  telegramUsername?: string;
  githubUsername?: string;
  status: "active" | "inactive" | "pending";
};

type Team = {
  id: string;
  name: string;
  description: string;
  hackathonId: string;
  hackathonName: string;
  members: TeamMember[];
  createdAt: string;
  projectName?: string;
  projectDescription?: string;
  projectRepo?: string;
  status: "complete" | "incomplete" | "submitted" | "disqualified";
};

const TeamManagement = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("myteams");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Demo data
  const teams: Team[] = [
    {
      id: "1",
      name: "Innovators UZ",
      description: "AI va Blockchain zamonaviy yechimlarini ishlab chiqaruvchi jamoa",
      hackathonId: "h1",
      hackathonName: "Raqamli iqtisod hackathoni 2023",
      members: [
        {
          id: "m1",
          name: "Alisher Navruzboyev",
          role: "admin",
          avatar: "https://i.pravatar.cc/150?img=1",
          skills: [{ name: "React", level: 90 }, { name: "Node.js", level: 85 }],
          email: "alisher@example.com",
          telegramUsername: "alisherdev",
          githubUsername: "alisherdev",
          status: "active"
        },
        {
          id: "m2",
          name: "Sardor Xamidov",
          role: "participant",
          avatar: "https://i.pravatar.cc/150?img=2",
          skills: [{ name: "UI/UX", level: 92 }, { name: "Figma", level: 88 }],
          email: "sardor@example.com",
          telegramUsername: "sardordesign",
          githubUsername: "sardorux",
          status: "active"
        },
        {
          id: "m3",
          name: "Nodira Karimova",
          role: "participant",
          avatar: "https://i.pravatar.cc/150?img=3",
          skills: [{ name: "Python", level: 87 }, { name: "Data Science", level: 82 }],
          email: "nodira@example.com",
          telegramUsername: "nodirak",
          githubUsername: "nodiradev",
          status: "active"
        }
      ],
      createdAt: "2023-09-15",
      projectName: "EduChain",
      projectDescription: "Ta'lim sertifikatlarini tekshirish uchun blockchain tizimi",
      projectRepo: "https://github.com/innovatorsuz/educhain",
      status: "submitted"
    },
    {
      id: "2",
      name: "Digital Nomads",
      description: "Mobil ilovalar va veb-saytlar ishlab chiqaruvchi jamoa",
      hackathonId: "h2",
      hackathonName: "EPAM Hackathon 2023",
      members: [
        {
          id: "m4",
          name: "Dilshod Rakhimov",
          role: "admin",
          avatar: "https://i.pravatar.cc/150?img=4",
          skills: [{ name: "Flutter", level: 93 }, { name: "Firebase", level: 88 }],
          email: "dilshod@example.com",
          telegramUsername: "dilshodflutter",
          githubUsername: "dilshod-dev",
          status: "active"
        },
        {
          id: "m5",
          name: "Aziza Toshpulatova",
          role: "participant",
          avatar: "https://i.pravatar.cc/150?img=5",
          skills: [{ name: "Backend", level: 85 }, { name: "PostgreSQL", level: 80 }],
          email: "aziza@example.com",
          telegramUsername: "azizabackend",
          githubUsername: "azizadev",
          status: "active"
        }
      ],
      createdAt: "2023-10-10",
      projectName: "TravelPal",
      projectDescription: "Sayohatchilar uchun AI yordamchi ilova",
      projectRepo: "https://github.com/digitalnomads/travelpal",
      status: "incomplete"
    }
  ];
  
  const invitations = [
    {
      id: "inv1",
      teamId: "3",
      teamName: "Tech Titans",
      hackathonName: "AI Challenge 2023",
      invitedBy: "Bekzod Tursunov",
      invitedAt: "2023-11-25"
    },
    {
      id: "inv2",
      teamId: "4",
      teamName: "CodeCrafters",
      hackathonName: "Fintech Hackathon",
      invitedBy: "Lola Yusupova",
      invitedAt: "2023-12-05"
    }
  ];
  
  const handleOpenTeamDialog = (team: Team) => {
    setSelectedTeam(team);
    setIsTeamDialogOpen(true);
  };
  
  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.hackathonName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Container>
      <div className="py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{t("team.title") || "Jamoa boshqaruvi"}</h1>
            <p className="text-muted-foreground mt-2">
              {t("team.description") || "Jamoa va a'zolarni boshqarish"}
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <Link to="/dashboard">
              <Button variant="outline">
                {t("team.backToDashboard") || "Bosh panelga qaytish"}
              </Button>
            </Link>
            
            <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  {t("team.createTeam") || "Jamoa yaratish"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("team.createTeam") || "Yangi jamoa yaratish"}</DialogTitle>
                  <DialogDescription>
                    {t("team.createTeamDesc") || "Hackathon uchun yangi jamoa yarating"}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="team-name">
                      {t("team.teamName") || "Jamoa nomi"}
                    </label>
                    <Input id="team-name" placeholder={t("team.teamNamePlaceholder") || "Jamoa nomi"} />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="team-desc">
                      {t("team.teamDesc") || "Jamoa haqida"}
                    </label>
                    <Textarea id="team-desc" placeholder={t("team.teamDescPlaceholder") || "Jamoangiz haqida qisqacha ma'lumot"} />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="hackathon">
                      {t("team.selectHackathon") || "Hackathonni tanlang"}
                    </label>
                    <select className="w-full border rounded-md p-2">
                      <option>{t("team.selectHackathon") || "Hackathonni tanlang"}</option>
                      <option>Raqamli iqtisod hackathoni 2023</option>
                      <option>EPAM Hackathon 2023</option>
                      <option>AI Challenge 2023</option>
                    </select>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
                    {t("common.cancel") || "Bekor qilish"}
                  </Button>
                  <Button type="submit">
                    {t("common.create") || "Yaratish"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("team.searchTeams") || "Jamoalarni qidirish..."}
                className="w-full pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                {t("common.filter") || "Filtrlash"}
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="myteams" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="myteams" className="flex-1 sm:flex-initial">
              <Users className="h-4 w-4 mr-2" />
              {t("team.myTeams") || "Mening jamoalarim"}
            </TabsTrigger>
            <TabsTrigger value="invitations" className="flex-1 sm:flex-initial">
              <MessageSquare className="h-4 w-4 mr-2" />
              {t("team.invitations") || "Takliflar"}
              {invitations.length > 0 && (
                <Badge variant="destructive" className="ml-2">{invitations.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="myteams" className="space-y-6">
            {filteredTeams.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">{t("team.noTeams") || "Jamoalar topilmadi"}</h3>
                <p className="text-muted-foreground mt-2">{t("team.createTeamPrompt") || "Yangi jamoa yaratish uchun yuqoridagi tugmani bosing"}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeams.map((team) => (
                  <Card key={team.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{team.name}</CardTitle>
                        <Badge variant={team.status === "submitted" ? "default" : "outline"}>
                          {team.status === "submitted" ? 
                            (t("team.submitted") || "Topshirilgan") : 
                            team.status === "incomplete" ? 
                              (t("team.incomplete") || "Tugallanmagan") : 
                              (t("team.disqualified") || "Diskvalifikatsiya qilingan")
                          }
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">{team.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="text-sm mb-3">
                        <Globe className="inline-block h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-muted-foreground">{team.hackathonName}</span>
                      </div>
                      
                      <div className="flex items-center mt-3">
                        <div className="flex -space-x-2 mr-3">
                          {team.members.slice(0, 3).map((member, idx) => (
                            <div key={idx} className="avatar-wrapper">
                              <img 
                                src={member.avatar} 
                                alt={member.name} 
                                className="w-8 h-8 rounded-full border-2 border-background" 
                              />
                            </div>
                          ))}
                          {team.members.length > 3 && (
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                              +{team.members.length - 3}
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {team.members.length} {t("team.members") || "a'zo"}
                        </div>
                      </div>
                      
                      {team.projectName && (
                        <div className="mt-4 p-3 bg-muted/50 rounded-md">
                          <div className="font-medium text-sm">{team.projectName}</div>
                          {team.projectDescription && (
                            <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {team.projectDescription}
                            </div>
                          )}
                          {team.projectRepo && (
                            <a 
                              href={team.projectRepo} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center text-xs text-primary mt-2"
                            >
                              <Github className="h-3.5 w-3.5 mr-1" />
                              {t("team.viewRepo") || "GitHub repozitoriyasi"}
                            </a>
                          )}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="border-t px-6 py-3">
                      <Button 
                        variant="secondary" 
                        className="w-full"
                        onClick={() => handleOpenTeamDialog(team)}
                      >
                        {t("team.manageTeam") || "Jamoani boshqarish"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="invitations">
            {invitations.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">{t("team.noInvitations") || "Takliflar yo'q"}</h3>
                <p className="text-muted-foreground mt-2">{t("team.invitationsDesc") || "Sizda hozircha hech qanday jamoa takliflari yo'q"}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {invitations.map((invitation) => (
                  <Card key={invitation.id} className="overflow-hidden">
                    <div className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-medium">{invitation.teamName}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t("team.invitedTo") || "Hackathon:"} {invitation.hackathonName}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t("team.invitedBy") || "Taklif qilgan:"} {invitation.invitedBy}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="destructive" size="sm">
                          {t("common.decline") || "Rad etish"}
                        </Button>
                        <Button size="sm">
                          {t("common.accept") || "Qabul qilish"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Team Management Dialog */}
      <Dialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          {selectedTeam && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl">{selectedTeam.name}</DialogTitle>
                  <Badge variant={selectedTeam.status === "submitted" ? "default" : "outline"}>
                    {selectedTeam.status === "submitted" ? 
                      (t("team.submitted") || "Topshirilgan") : 
                      (t("team.incomplete") || "Tugallanmagan")}
                  </Badge>
                </div>
                <DialogDescription>
                  {selectedTeam.hackathonName} - {selectedTeam.members.length} {t("team.members") || "a'zo"}
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="members" className="w-full mt-4">
                <TabsList className="w-full sm:w-auto mb-4">
                  <TabsTrigger value="members">
                    <Users className="h-4 w-4 mr-2" />
                    {t("team.members") || "A'zolar"}
                  </TabsTrigger>
                  <TabsTrigger value="project">
                    <Target className="h-4 w-4 mr-2" />
                    {t("team.project") || "Loyiha"}
                  </TabsTrigger>
                  <TabsTrigger value="settings">
                    <Trophy className="h-4 w-4 mr-2" />
                    {t("team.settings") || "Sozlamalar"}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="members" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">
                      {t("team.teamMembers") || "Jamoa a'zolari"} ({selectedTeam.members.length})
                    </h3>
                    <Button size="sm">
                      <UserPlus className="h-4 w-4 mr-2" />
                      {t("team.inviteMember") || "A'zo qo'shish"}
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {selectedTeam.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          <img 
                            src={member.avatar} 
                            alt={member.name} 
                            className="w-10 h-10 rounded-full mr-4" 
                          />
                          <div>
                            <h4 className="font-medium">{member.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {member.role === "admin" ? 
                                (t("roles.admin") || "Admin") : 
                                (t("roles.participant") || "Ishtirokchi")}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                          
                          {member.role !== "admin" && (
                            <Button variant="destructive" size="sm">
                              <UserX className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="project" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {t("team.projectName") || "Loyiha nomi"}
                      </label>
                      <Input 
                        placeholder={t("team.projectNamePlaceholder") || "Loyiha nomini kiriting"} 
                        defaultValue={selectedTeam.projectName}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {t("team.projectDesc") || "Loyiha tavsifi"}
                      </label>
                      <Textarea 
                        placeholder={t("team.projectDescPlaceholder") || "Loyiha haqida batafsil ma'lumot"} 
                        defaultValue={selectedTeam.projectDescription}
                        rows={4}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {t("team.projectRepo") || "GitHub repozitoriyasi"}
                      </label>
                      <Input 
                        placeholder="https://github.com/username/project" 
                        defaultValue={selectedTeam.projectRepo}
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button className="w-full">
                        <Send className="h-4 w-4 mr-2" />
                        {t("team.submitProject") || "Loyihani topshirish"}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {t("team.teamName") || "Jamoa nomi"}
                      </label>
                      <Input defaultValue={selectedTeam.name} />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {t("team.teamDesc") || "Jamoa tavsifi"}
                      </label>
                      <Textarea defaultValue={selectedTeam.description} rows={3} />
                    </div>
                    
                    <div className="border-t pt-4 mt-6">
                      <Button variant="destructive" className="w-full">
                        {t("team.leaveTeam") || "Jamoadan chiqish"}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default TeamManagement;
