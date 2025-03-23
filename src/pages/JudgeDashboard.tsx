
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
  Award, 
  Calendar, 
  CheckCircle, 
  ClipboardList, 
  ExternalLink, 
  Filter, 
  Github, 
  Globe, 
  Search, 
  Star, 
  Users, 
  XCircle,
  ChevronUp,
  ChevronDown
} from "lucide-react";

type SubmissionStatus = "pending" | "evaluated" | "rejected";

type TeamSubmission = {
  id: string;
  teamId: string;
  teamName: string;
  hackathonId: string;
  hackathonName: string;
  members: number;
  projectName: string;
  projectDescription: string;
  projectRepo?: string;
  demoLink?: string;
  submittedAt: string;
  status: SubmissionStatus;
  evaluation?: {
    innovation: number;
    implementation: number;
    presentation: number;
    impact: number;
    total: number;
  };
  comments?: string;
};

type HackathonToJudge = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "active" | "upcoming" | "completed";
  submissionsCount: number;
  evaluatedCount: number;
  teams: number;
};

const JudgeDashboard = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<TeamSubmission | null>(null);
  const [evaluationDialogOpen, setEvaluationDialogOpen] = useState(false);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  // Demo data
  const hackathons: HackathonToJudge[] = [
    {
      id: "h1",
      name: "Raqamli iqtisod hackathoni 2023",
      description: "Raqamli iqtisodiyot va innovatsiyalar yo'nalishidagi musobaqalar",
      startDate: "2023-12-01",
      endDate: "2023-12-15",
      status: "active",
      submissionsCount: 12,
      evaluatedCount: 5,
      teams: 15
    },
    {
      id: "h2",
      name: "EPAM Hackathon 2023",
      description: "Zamonaviy web ilovalarni yaratish bo'yicha musobaqa",
      startDate: "2024-01-15",
      endDate: "2024-01-30",
      status: "upcoming",
      submissionsCount: 0,
      evaluatedCount: 0,
      teams: 8
    },
    {
      id: "h3",
      name: "AI Challenge 2023",
      description: "Sun'iy intellekt va machine learning loyihalar musobaqasi",
      startDate: "2023-10-10",
      endDate: "2023-10-25",
      status: "completed",
      submissionsCount: 20,
      evaluatedCount: 20,
      teams: 22
    }
  ];
  
  const teamSubmissions: TeamSubmission[] = [
    {
      id: "s1",
      teamId: "t1",
      teamName: "Innovators UZ",
      hackathonId: "h1",
      hackathonName: "Raqamli iqtisod hackathoni 2023",
      members: 4,
      projectName: "EduChain",
      projectDescription: "Ta'lim sertifikatlarini tekshirish uchun blockchain tizimi",
      projectRepo: "https://github.com/innovatorsuz/educhain",
      demoLink: "https://educhain-demo.vercel.app",
      submittedAt: "2023-12-10T15:30:00",
      status: "evaluated",
      evaluation: {
        innovation: 9,
        implementation: 8,
        presentation: 7,
        impact: 9,
        total: 33
      },
      comments: "Juda yaxshi va innovatsion loyiha. Texnik implementatsiya ham yuqori darajada."
    },
    {
      id: "s2",
      teamId: "t2",
      teamName: "Digital Nomads",
      hackathonId: "h1",
      hackathonName: "Raqamli iqtisod hackathoni 2023",
      members: 3,
      projectName: "TravelPal",
      projectDescription: "Sayohatchilar uchun AI yordamchi ilova",
      projectRepo: "https://github.com/digitalnomads/travelpal",
      submittedAt: "2023-12-12T09:15:00",
      status: "pending"
    },
    {
      id: "s3",
      teamId: "t3",
      teamName: "CodeCrafters",
      hackathonId: "h1",
      hackathonName: "Raqamli iqtisod hackathoni 2023",
      members: 5,
      projectName: "FinanceBuddy",
      projectDescription: "Shaxsiy moliyani boshqarish uchun AI-powered dastur",
      projectRepo: "https://github.com/codecrafters/financebuddy",
      demoLink: "https://financebuddy.netlify.app",
      submittedAt: "2023-12-11T14:45:00",
      status: "evaluated",
      evaluation: {
        innovation: 7,
        implementation: 8,
        presentation: 9,
        impact: 8,
        total: 32
      },
      comments: "Vizual dizayn va prezentatsiya juda yaxshi. Loyiha g'oyasi qisman oʻxshash loyihalarga o'xshaydi."
    },
    {
      id: "s4",
      teamId: "t4",
      teamName: "Tech Titans",
      hackathonId: "h1",
      hackathonName: "Raqamli iqtisod hackathoni 2023",
      members: 2,
      projectName: "MedConnect",
      projectDescription: "Tibbiy xizmatlarni onlayn buyurtma qilish platformasi",
      projectRepo: "https://github.com/techtitans/medconnect",
      submittedAt: "2023-12-09T10:00:00",
      status: "rejected",
      evaluation: {
        innovation: 5,
        implementation: 4,
        presentation: 6,
        impact: 6,
        total: 21
      },
      comments: "Loyiha to'liq ishlamaydi, backend qismi muammolar mavjud. G'oya yaxshi, lekin texnik amalga oshirish talab darajasida emas."
    },
    {
      id: "s5",
      teamId: "t5",
      teamName: "ByteBuilders",
      hackathonId: "h1",
      hackathonName: "Raqamli iqtisod hackathoni 2023",
      members: 4,
      projectName: "AgroSmart",
      projectDescription: "Qishloq xo'jaligi uchun IoT va AI yechimi",
      projectRepo: "https://github.com/bytebuilders/agrosmart",
      demoLink: "https://agrosmart-demo.vercel.app",
      submittedAt: "2023-12-13T16:20:00",
      status: "pending"
    }
  ];
  
  const filteredHackathons = hackathons.filter(hackathon => 
    activeTab === "all" || 
    (activeTab === "active" && hackathon.status === "active") ||
    (activeTab === "upcoming" && hackathon.status === "upcoming") ||
    (activeTab === "completed" && hackathon.status === "completed")
  );
  
  const filteredSubmissions = teamSubmissions.filter(submission => 
    submission.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.teamName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };
  
  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    if (!sortField) return 0;
    
    let comparison = 0;
    
    switch(sortField) {
      case "teamName":
        comparison = a.teamName.localeCompare(b.teamName);
        break;
      case "submittedAt":
        comparison = new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
        break;
      case "status":
        comparison = a.status.localeCompare(b.status);
        break;
      case "score":
        const scoreA = a.evaluation?.total || 0;
        const scoreB = b.evaluation?.total || 0;
        comparison = scoreA - scoreB;
        break;
      default:
        comparison = 0;
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });
  
  const handleEvaluationOpen = (submission: TeamSubmission) => {
    setSelectedSubmission(submission);
    setEvaluationDialogOpen(true);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  };
  
  const getStatusColor = (status: SubmissionStatus) => {
    switch(status) {
      case "evaluated": return "text-green-500";
      case "rejected": return "text-red-500";
      default: return "text-yellow-500";
    }
  };
  
  const getStatusBadge = (status: SubmissionStatus) => {
    switch(status) {
      case "evaluated": 
        return <Badge variant="success">{t("judge.evaluated") || "Baholangan"}</Badge>;
      case "rejected":
        return <Badge variant="destructive">{t("judge.rejected") || "Rad etilgan"}</Badge>;
      default:
        return <Badge variant="outline">{t("judge.pending") || "Kutilmoqda"}</Badge>;
    }
  };
  
  const getHackathonStatusBadge = (status: "active" | "upcoming" | "completed") => {
    switch(status) {
      case "active":
        return <Badge variant="success">{t("judge.active") || "Faol"}</Badge>;
      case "upcoming":
        return <Badge variant="outline">{t("judge.upcoming") || "Kutilmoqda"}</Badge>;
      case "completed":
        return <Badge variant="secondary">{t("judge.completed") || "Yakunlangan"}</Badge>;
    }
  };
  
  return (
    <Container>
      <div className="py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{t("judge.title") || "Hakamlar paneli"}</h1>
            <p className="text-muted-foreground mt-2">
              {t("judge.description") || "Hackathon loyihalarini ko'rish va baholash"}
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <Link to="/">
              <Button variant="outline">
                {t("judge.backToHome") || "Bosh sahifaga qaytish"}
              </Button>
            </Link>
          </div>
        </div>
        
        <Tabs defaultValue="active" className="w-full mb-6" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="active">
              <CheckCircle className="h-4 w-4 mr-2" />
              {t("judge.activeHackathons") || "Faol musobaqalar"}
            </TabsTrigger>
            <TabsTrigger value="upcoming">
              <Calendar className="h-4 w-4 mr-2" />
              {t("judge.upcomingHackathons") || "Rejalashtirilgan"}
            </TabsTrigger>
            <TabsTrigger value="completed">
              <Award className="h-4 w-4 mr-2" />
              {t("judge.completedHackathons") || "Yakunlangan"}
            </TabsTrigger>
            <TabsTrigger value="all">
              <ClipboardList className="h-4 w-4 mr-2" />
              {t("judge.allHackathons") || "Barcha musobaqalar"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHackathons.map((hackathon) => (
                <Card key={hackathon.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{hackathon.name}</CardTitle>
                      {getHackathonStatusBadge(hackathon.status)}
                    </div>
                    <CardDescription className="line-clamp-2">
                      {hackathon.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-3">
                    <div className="flex justify-between mb-4 text-sm text-muted-foreground">
                      <div>
                        <Calendar className="h-4 w-4 inline-block mr-1" />
                        {formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}
                      </div>
                      <div>
                        <Users className="h-4 w-4 inline-block mr-1" />
                        {hackathon.teams} {t("judge.teams") || "jamoa"}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 p-3 bg-muted/50 rounded-md">
                      <div>
                        <div className="text-sm font-medium">
                          {t("judge.submissions") || "Topshiriqlar"}
                        </div>
                        <div className="flex items-center mt-1">
                          <span className="text-lg font-medium">
                            {hackathon.evaluatedCount}/{hackathon.submissionsCount}
                          </span>
                          <span className="text-xs text-muted-foreground ml-2">
                            {t("judge.evaluated") || "baholangan"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <ClipboardList className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t px-6 py-3">
                    <Button 
                      className="w-full"
                      disabled={hackathon.submissionsCount === 0}
                    >
                      {t("judge.reviewSubmissions") || "Loyihalarni baholash"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredHackathons.length === 0 && (
              <div className="text-center py-12">
                <Award className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  {t("judge.noActiveHackathons") || "Faol musobaqalar yo'q"}
                </h3>
                <p className="text-muted-foreground mt-2">
                  {t("judge.checkLater") || "Iltimos keyinroq qayta tekshiring"}
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="upcoming">
            {/* Similar layout to active, but filtered for upcoming hackathons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHackathons.map((hackathon) => (
                <Card key={hackathon.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{hackathon.name}</CardTitle>
                      {getHackathonStatusBadge(hackathon.status)}
                    </div>
                    <CardDescription className="line-clamp-2">
                      {hackathon.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-3">
                    <div className="flex justify-between mb-4 text-sm text-muted-foreground">
                      <div>
                        <Calendar className="h-4 w-4 inline-block mr-1" />
                        {formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}
                      </div>
                      <div>
                        <Users className="h-4 w-4 inline-block mr-1" />
                        {hackathon.teams} {t("judge.teams") || "jamoa"}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t px-6 py-3">
                    <Button variant="outline" className="w-full">
                      {t("judge.viewDetails") || "Batafsil ma'lumot"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredHackathons.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  {t("judge.noUpcomingHackathons") || "Rejalashtirilgan musobaqalar yo'q"}
                </h3>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {/* Similar layout to active, but filtered for completed hackathons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHackathons.map((hackathon) => (
                <Card key={hackathon.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{hackathon.name}</CardTitle>
                      {getHackathonStatusBadge(hackathon.status)}
                    </div>
                    <CardDescription className="line-clamp-2">
                      {hackathon.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-3">
                    <div className="flex justify-between mb-4 text-sm text-muted-foreground">
                      <div>
                        <Calendar className="h-4 w-4 inline-block mr-1" />
                        {formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}
                      </div>
                      <div>
                        <Users className="h-4 w-4 inline-block mr-1" />
                        {hackathon.teams} {t("judge.teams") || "jamoa"}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 p-3 bg-muted/50 rounded-md">
                      <div>
                        <div className="text-sm font-medium">
                          {t("judge.finalResults") || "Yakuniy natijalar"}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {t("judge.allEvaluated") || "Barcha loyihalar baholangan"}
                        </div>
                      </div>
                      
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t px-6 py-3">
                    <Button variant="secondary" className="w-full">
                      {t("judge.viewResults") || "Natijalarni ko'rish"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredHackathons.length === 0 && (
              <div className="text-center py-12">
                <XCircle className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  {t("judge.noCompletedHackathons") || "Yakunlangan musobaqalar yo'q"}
                </h3>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="all">
            {/* Similar to active, but shows all hackathons regardless of status */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hackathons.map((hackathon) => (
                <Card key={hackathon.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{hackathon.name}</CardTitle>
                      {getHackathonStatusBadge(hackathon.status)}
                    </div>
                    <CardDescription className="line-clamp-2">
                      {hackathon.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-3">
                    <div className="flex justify-between mb-4 text-sm text-muted-foreground">
                      <div>
                        <Calendar className="h-4 w-4 inline-block mr-1" />
                        {formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}
                      </div>
                      <div>
                        <Users className="h-4 w-4 inline-block mr-1" />
                        {hackathon.teams} {t("judge.teams") || "jamoa"}
                      </div>
                    </div>
                    
                    {hackathon.status !== "upcoming" && (
                      <div className="flex items-center justify-between mt-4 p-3 bg-muted/50 rounded-md">
                        <div>
                          <div className="text-sm font-medium">
                            {t("judge.submissions") || "Topshiriqlar"}
                          </div>
                          <div className="flex items-center mt-1">
                            <span className="text-lg font-medium">
                              {hackathon.evaluatedCount}/{hackathon.submissionsCount}
                            </span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {t("judge.evaluated") || "baholangan"}
                            </span>
                          </div>
                        </div>
                        
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          {hackathon.status === "completed" ? (
                            <Award className="h-6 w-6 text-primary" />
                          ) : (
                            <ClipboardList className="h-6 w-6 text-primary" />
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter className="border-t px-6 py-3">
                    <Button 
                      variant={hackathon.status === "completed" ? "secondary" : 
                              hackathon.status === "upcoming" ? "outline" : "default"}
                      className="w-full"
                      disabled={hackathon.status === "upcoming"}
                    >
                      {hackathon.status === "completed" ? 
                        (t("judge.viewResults") || "Natijalarni ko'rish") : 
                        hackathon.status === "upcoming" ?
                          (t("judge.viewDetails") || "Batafsil ma'lumot") :
                          (t("judge.reviewSubmissions") || "Loyihalarni baholash")}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {t("judge.projectSubmissions") || "Loyiha topshiriqlari"}
            </h2>
            
            <div className="mt-4 sm:mt-0 flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t("judge.searchProjects") || "Loyihalarni qidirish..."}
                  className="pl-9 w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                {t("common.filter") || "Filtrlash"}
              </Button>
            </div>
          </div>
          
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px] cursor-pointer" onClick={() => handleSort("teamName")}>
                    <div className="flex items-center">
                      {t("judge.teamProject") || "Jamoa/Loyiha"}
                      {sortField === "teamName" && (
                        sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("submittedAt")}>
                    <div className="flex items-center">
                      {t("judge.submittedAt") || "Topshirilgan sana"}
                      {sortField === "submittedAt" && (
                        sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                    <div className="flex items-center">
                      {t("judge.status") || "Holat"}
                      {sortField === "status" && (
                        sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer text-right" onClick={() => handleSort("score")}>
                    <div className="flex items-center justify-end">
                      {t("judge.score") || "Ball"}
                      {sortField === "score" && (
                        sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">{t("judge.actions") || "Amallar"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedSubmissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">
                      <div className="flex flex-col items-center justify-center">
                        <ClipboardList className="h-8 w-8 text-muted-foreground mb-2" />
                        <p>{t("judge.noSubmissions") || "Hech qanday topshiriq topilmadi"}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{submission.teamName}</p>
                          <p className="text-sm text-muted-foreground">{submission.projectName}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(submission.submittedAt).toLocaleString(language === 'uz' ? 'uz-UZ' : 'en-US', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(submission.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        {submission.evaluation ? (
                          <div className="flex items-center justify-end">
                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                              <span className="font-medium">{submission.evaluation.total}/40</span>
                            </div>
                            <div className="flex">
                              {Array(Math.min(5, Math.ceil(submission.evaluation.total / 8))).fill(0).map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              ))}
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant={submission.status === "pending" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => handleEvaluationOpen(submission)}
                        >
                          {submission.status === "pending" ? 
                            (t("judge.evaluate") || "Baholash") : 
                            (t("judge.viewDetails") || "Batafsil")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      
      {/* Evaluation Dialog */}
      <Dialog open={evaluationDialogOpen} onOpenChange={setEvaluationDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          {selectedSubmission && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl">{selectedSubmission.projectName}</DialogTitle>
                  {getStatusBadge(selectedSubmission.status)}
                </div>
                <DialogDescription>
                  {t("judge.teamName") || "Jamoa"}: {selectedSubmission.teamName} - {selectedSubmission.hackathonName}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">{t("judge.projectDetails") || "Loyiha tafsilotlari"}</h3>
                  <p className="text-muted-foreground">{selectedSubmission.projectDescription}</p>
                  
                  <div className="flex flex-wrap gap-3 mt-4">
                    {selectedSubmission.projectRepo && (
                      <a 
                        href={selectedSubmission.projectRepo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-primary"
                      >
                        <Github className="h-4 w-4 mr-1" />
                        {t("judge.sourceCode") || "GitHub repozitoriyasi"}
                        <ExternalLink className="h-3.5 w-3.5 ml-1" />
                      </a>
                    )}
                    
                    {selectedSubmission.demoLink && (
                      <a 
                        href={selectedSubmission.demoLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center text-sm text-primary"
                      >
                        <Globe className="h-4 w-4 mr-1" />
                        {t("judge.liveDemo") || "Demo ko'rish"}
                        <ExternalLink className="h-3.5 w-3.5 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">{t("judge.evaluation") || "Baholash"}</h3>
                  
                  {selectedSubmission.status === "pending" ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium block">
                          {t("judge.innovation") || "Innovatsiya"} (0-10)
                        </label>
                        <Input type="number" min="0" max="10" placeholder="0" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium block">
                          {t("judge.implementation") || "Texnik amalga oshirish"} (0-10)
                        </label>
                        <Input type="number" min="0" max="10" placeholder="0" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium block">
                          {t("judge.presentation") || "Taqdimot va dizayn"} (0-10)
                        </label>
                        <Input type="number" min="0" max="10" placeholder="0" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium block">
                          {t("judge.impact") || "Ta'sir va amaliy qo'llash"} (0-10)
                        </label>
                        <Input type="number" min="0" max="10" placeholder="0" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium block">
                          {t("judge.comments") || "Izohlar va tavsiyalar"}
                        </label>
                        <Textarea rows={3} placeholder={t("judge.commentsPlaceholder") || "Jamoa uchun izohlaringizni yozing..."} />
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <div className="text-sm text-muted-foreground">
                          {t("judge.totalOutOf") || "Jami: 0/40"}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="destructive">
                            {t("judge.reject") || "Rad etish"}
                          </Button>
                          <Button>
                            {t("judge.submitEvaluation") || "Baholashni saqlash"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {selectedSubmission.evaluation && (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-3 bg-background rounded-md">
                              <div className="text-sm text-muted-foreground mb-1">
                                {t("judge.innovation") || "Innovatsiya"}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="text-2xl font-medium">
                                  {selectedSubmission.evaluation.innovation}/10
                                </div>
                                <div className="flex">
                                  {Array(Math.min(5, Math.ceil(selectedSubmission.evaluation.innovation / 2))).fill(0).map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-3 bg-background rounded-md">
                              <div className="text-sm text-muted-foreground mb-1">
                                {t("judge.implementation") || "Texnik amalga oshirish"}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="text-2xl font-medium">
                                  {selectedSubmission.evaluation.implementation}/10
                                </div>
                                <div className="flex">
                                  {Array(Math.min(5, Math.ceil(selectedSubmission.evaluation.implementation / 2))).fill(0).map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-3 bg-background rounded-md">
                              <div className="text-sm text-muted-foreground mb-1">
                                {t("judge.presentation") || "Taqdimot va dizayn"}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="text-2xl font-medium">
                                  {selectedSubmission.evaluation.presentation}/10
                                </div>
                                <div className="flex">
                                  {Array(Math.min(5, Math.ceil(selectedSubmission.evaluation.presentation / 2))).fill(0).map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-3 bg-background rounded-md">
                              <div className="text-sm text-muted-foreground mb-1">
                                {t("judge.impact") || "Ta'sir va amaliy qo'llash"}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="text-2xl font-medium">
                                  {selectedSubmission.evaluation.impact}/10
                                </div>
                                <div className="flex">
                                  {Array(Math.min(5, Math.ceil(selectedSubmission.evaluation.impact / 2))).fill(0).map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-background rounded-md flex justify-between items-center">
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">
                                {t("judge.totalScore") || "Umumiy ball"}
                              </div>
                              <div className="text-3xl font-bold">
                                {selectedSubmission.evaluation.total}/40
                              </div>
                            </div>
                            
                            <div className="flex">
                              {Array(Math.min(5, Math.ceil(selectedSubmission.evaluation.total / 8))).fill(0).map((_, i) => (
                                <Star key={i} className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                      
                      {selectedSubmission.comments && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">
                            {t("judge.comments") || "Izohlar va tavsiyalar"}
                          </h4>
                          <div className="p-3 bg-background rounded-md text-sm">
                            {selectedSubmission.comments}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-end pt-2">
                        <Button variant="outline" onClick={() => setEvaluationDialogOpen(false)}>
                          {t("common.close") || "Yopish"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default JudgeDashboard;
