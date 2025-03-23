
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "@/components/ui/Container";
import UserProfileCard from "@/components/ui/UserProfileCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit2, Save, Trash, Award, Briefcase, BookOpen, Plus, ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock user data
const currentUser = {
  id: 1,
  name: "Alex Johnson",
  role: "participant" as const,
  avatar: "https://i.pravatar.cc/300?img=11",
  location: "Tashkent, Uzbekistan",
  bio: "Full-stack developer passionate about creating innovative solutions. Experienced in React, Node.js, and cloud technologies.",
  email: "alex@example.com",
  telegramUsername: "alexjohnson",
  githubUsername: "alexjohnson-dev",
  linkedinUsername: "alexjohnson",
  skills: [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 75 },
    { name: "UX/UI Design", level: 60 }
  ],
  stats: {
    hackathons: 5,
    teams: 3,
    awards: 2
  },
  badges: [
    { name: "Winner", icon: <Award className="h-3.5 w-3.5 text-warning" /> },
    { name: "Team Leader", icon: <Briefcase className="h-3.5 w-3.5 text-primary" /> },
    { name: "Mentor", icon: <BookOpen className="h-3.5 w-3.5 text-success" /> }
  ]
};

// Sample hackathons for history tab
const userHackathons = [
  {
    id: 1,
    name: "AI Innovation Challenge",
    date: "May 15-17, 2023",
    role: "Participant",
    result: "1st Place",
    certificate: true
  },
  {
    id: 2,
    name: "Web3 Development Hackathon",
    date: "August 8-10, 2023",
    role: "Team Leader",
    result: "Finalist",
    certificate: true
  },
  {
    id: 3,
    name: "Mobile App Challenge",
    date: "November 20-22, 2023",
    role: "Mentor",
    result: "N/A",
    certificate: false
  },
  {
    id: 4,
    name: "Data Science Hackathon",
    date: "February 5-7, 2024",
    role: "Judge",
    result: "N/A",
    certificate: false
  },
  {
    id: 5,
    name: "Blockchain Innovation",
    date: "April 12-14, 2024",
    role: "Participant",
    result: "3rd Place",
    certificate: true
  }
];

const UserCabinet = () => {
  const [user, setUser] = useState(currentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...currentUser });
  const { t, language } = useLanguage();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
    toast({
      title: language === "uz" ? "Profil yangilandi" : "Profile updated",
      description: language === "uz" 
        ? "Sizning profilingiz muvaffaqiyatli yangilandi." 
        : "Your profile has been successfully updated.",
    });
  };
  
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto py-10"
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Card Column */}
          <div className="md:w-1/3 space-y-6">
            <h1 className="text-3xl font-bold">{language === "uz" ? "Foydalanuvchi Profili" : "User Profile"}</h1>
            
            <div className="space-y-6">
              {/* Profile Preview */}
              <UserProfileCard 
                {...user}
                variant="expanded"
                onContactClick={() => toast({
                  title: language === "uz" ? "Aloqa Ma'lumoti" : "Contact Info",
                  description: language === "uz" 
                    ? `Siz ${user.name} bilan elektron pochta yoki Telegram orqali bog'lanishingiz mumkin.` 
                    : `You can contact ${user.name} via email or Telegram.`,
                })}
              />
            </div>
          </div>
          
          {/* Content Column */}
          <div className="md:w-2/3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="profile">{language === "uz" ? "Profil" : "Profile"}</TabsTrigger>
                <TabsTrigger value="hackathons">{language === "uz" ? "Hakaton Tarixi" : "Hackathon History"}</TabsTrigger>
                <TabsTrigger value="settings">{language === "uz" ? "Sozlamalar" : "Settings"}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>{language === "uz" ? "Shaxsiy Ma'lumot" : "Personal Information"}</CardTitle>
                      <CardDescription>
                        {isEditing 
                          ? (language === "uz" ? "Shaxsiy ma'lumotlaringizni quyida yangilang" : "Update your personal information below")
                          : (language === "uz" ? "Shaxsiy ma'lumotlaringizni boshqaring" : "Manage your personal information")}
                      </CardDescription>
                    </div>
                    
                    {isEditing ? (
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setFormData({ ...user });
                            setIsEditing(false);
                          }}
                        >
                          {language === "uz" ? "Bekor qilish" : "Cancel"}
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={handleSave}
                        >
                          <Save className="h-4 w-4 mr-1" /> {language === "uz" ? "Saqlash" : "Save"}
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit2 className="h-4 w-4 mr-1" /> {language === "uz" ? "Tahrirlash" : "Edit"}
                      </Button>
                    )}
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{language === "uz" ? "To'liq ism" : "Full Name"}</Label>
                        <Input 
                          id="name"
                          name="name"
                          placeholder={language === "uz" ? "To'liq ismingiz" : "Your full name"}
                          value={isEditing ? formData.name : user.name}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          className={!isEditing ? "bg-muted cursor-default" : ""}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">{language === "uz" ? "Email" : "Email"}</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          placeholder={language === "uz" ? "Email manzilingiz" : "Your email address"}
                          value={isEditing ? formData.email : user.email}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          className={!isEditing ? "bg-muted cursor-default" : ""}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">{language === "uz" ? "Joylashuv" : "Location"}</Label>
                        <Input 
                          id="location"
                          name="location"
                          placeholder={language === "uz" ? "Shahar, Mamlakat" : "City, Country"}
                          value={isEditing ? formData.location : user.location || ""}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          className={!isEditing ? "bg-muted cursor-default" : ""}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="role">{language === "uz" ? "Rol" : "Role"}</Label>
                        {isEditing ? (
                          <Select 
                            name="role"
                            defaultValue={formData.role}
                            onValueChange={(value) => handleSelectChange(value, "role")}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={language === "uz" ? "Rol tanlang" : "Select role"} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="participant">{language === "uz" ? "Ishtirokchi" : "Participant"}</SelectItem>
                              <SelectItem value="mentor">{language === "uz" ? "Mentor" : "Mentor"}</SelectItem>
                              <SelectItem value="judge">{language === "uz" ? "Hakam" : "Judge"}</SelectItem>
                              <SelectItem value="admin">{language === "uz" ? "Administrator" : "Admin"}</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input 
                            value={language === "uz" 
                              ? (user.role === "participant" ? "Ishtirokchi" : 
                                 user.role === "mentor" ? "Mentor" : 
                                 user.role === "judge" ? "Hakam" : "Administrator")
                              : user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            readOnly
                            className="bg-muted cursor-default"
                          />
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">{language === "uz" ? "Bio" : "Bio"}</Label>
                      <Textarea 
                        id="bio"
                        name="bio"
                        placeholder={language === "uz" ? "O'zingiz haqingizda aytib bering" : "Tell us about yourself"}
                        value={isEditing ? formData.bio : user.bio || ""}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={!isEditing ? "bg-muted cursor-default resize-none" : "min-h-[100px]"}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="telegramUsername">{language === "uz" ? "Telegram foydalanuvchi nomi" : "Telegram Username"}</Label>
                        <Input 
                          id="telegramUsername"
                          name="telegramUsername"
                          placeholder={language === "uz" ? "@siz" : "Without @"}
                          value={isEditing ? formData.telegramUsername : user.telegramUsername || ""}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          className={!isEditing ? "bg-muted cursor-default" : ""}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="githubUsername">{language === "uz" ? "GitHub foydalanuvchi nomi" : "GitHub Username"}</Label>
                        <Input 
                          id="githubUsername"
                          name="githubUsername"
                          placeholder={language === "uz" ? "GitHub foydalanuvchi nomingiz" : "Your GitHub username"}
                          value={isEditing ? formData.githubUsername : user.githubUsername || ""}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          className={!isEditing ? "bg-muted cursor-default" : ""}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="linkedinUsername">{language === "uz" ? "LinkedIn foydalanuvchi nomi" : "LinkedIn Username"}</Label>
                        <Input 
                          id="linkedinUsername"
                          name="linkedinUsername"
                          placeholder={language === "uz" ? "LinkedIn foydalanuvchi nomingiz" : "Your LinkedIn username"}
                          value={isEditing ? formData.linkedinUsername : user.linkedinUsername || ""}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          className={!isEditing ? "bg-muted cursor-default" : ""}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="hackathons">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "uz" ? "Hakaton Tarixi" : "Hackathon History"}</CardTitle>
                    <CardDescription>
                      {language === "uz" ? "Hakatonlardagi ishtirokingiz tarixi" : "Your participation history in hackathons"}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {userHackathons.map((hackathon) => (
                        <div 
                          key={hackathon.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-card border border-border/50 hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{hackathon.name}</h3>
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                hackathon.result === '1st Place' 
                                  ? 'bg-success/10 text-success' 
                                  : hackathon.result === 'Finalist' || hackathon.result === '2nd Place' || hackathon.result === '3rd Place'
                                  ? 'bg-warning/10 text-warning'
                                  : 'bg-muted text-muted-foreground'
                              }`}>
                                {hackathon.result === 'N/A' ? hackathon.role : hackathon.result}
                              </span>
                            </div>
                            <div className="flex mt-1 text-sm text-muted-foreground">
                              <span>{hackathon.date}</span>
                              <span className="mx-2">•</span>
                              <span>{hackathon.role}</span>
                            </div>
                          </div>
                          
                          <div className="ml-4">
                            <Button variant="ghost" size="sm">
                              {language === "uz" ? "Batafsil" : "Details"} <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="flex justify-center mt-4">
                        <Button variant="outline" className="w-full">
                          <Plus className="mr-2 h-4 w-4" /> {language === "uz" ? "Ko'proq Hakatonlarni Ko'rish" : "View More Hackathons"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "uz" ? "Hisob Sozlamalari" : "Account Settings"}</CardTitle>
                    <CardDescription>
                      {language === "uz" ? "Hisob sozlamalaringizni va afzalliklaringizni boshqaring" : "Manage your account settings and preferences"}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b">
                        <div>
                          <h4 className="font-medium">{language === "uz" ? "Email Bildirishnomalari" : "Email Notifications"}</h4>
                          <p className="text-sm text-muted-foreground">
                            {language === "uz" ? "Hakatonlar haqida email orqali yangilanishlarni qabul qiling" : "Receive email updates about hackathons"}
                          </p>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">{language === "uz" ? "Boshqarish" : "Manage"}</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b">
                        <div>
                          <h4 className="font-medium">{language === "uz" ? "Parol" : "Password"}</h4>
                          <p className="text-sm text-muted-foreground">
                            {language === "uz" ? "Hisobingiz parolini o'zgartiring" : "Change your account password"}
                          </p>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">{language === "uz" ? "Yangilash" : "Update"}</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b">
                        <div>
                          <h4 className="font-medium">{language === "uz" ? "Bog'langan Hisoblar" : "Connected Accounts"}</h4>
                          <p className="text-sm text-muted-foreground">
                            {language === "uz" ? "Bog'langan ijtimoiy tarmoq hisoblaringizni boshqaring" : "Manage your connected social accounts"}
                          </p>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">{language === "uz" ? "Boshqarish" : "Manage"}</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h4 className="font-medium text-destructive">{language === "uz" ? "Hisobni o'chirish" : "Delete Account"}</h4>
                          <p className="text-sm text-muted-foreground">
                            {language === "uz" ? "Hisobingizni va ma'lumotlaringizni butunlay o'chirib tashlang" : "Permanently delete your account and data"}
                          </p>
                        </div>
                        <div>
                          <Button variant="destructive" size="sm">
                            <Trash className="mr-2 h-4 w-4" /> {language === "uz" ? "O'chirish" : "Delete"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </Container>
  );
};

export default UserCabinet;
