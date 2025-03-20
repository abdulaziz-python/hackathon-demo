
import { useState } from "react";
import { 
  User, Settings, FileText, Award, Zap, 
  Users, Calendar, Trophy, Bell, LogOut, 
  Check, X, Edit, Save, CreditCard, 
  Shield, Key, Languages
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserCabinet = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingSecurity, setIsEditingSecurity] = useState(false);
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    bio: "Software Engineer",
    location: "Tashkent, Uzbekistan",
    avatar: "https://ui-avatars.com/api/?name=JD&background=0088cc&color=fff&size=200"
  });
  
  const [securityData, setSecurityData] = useState({
    twoFactorAuth: true,
    emailNotifications: false,
  });

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSecurityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSecurityData(prev => ({ ...prev, [name]: checked }));
  };

  const toggleEditProfile = () => {
    setIsEditingProfile(prev => !prev);
  };

  const toggleEditSecurity = () => {
    setIsEditingSecurity(prev => !prev);
  };

  const saveProfileChanges = () => {
    // Here you would typically send the profileData to your backend
    setIsEditingProfile(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
      variant: "default",
    });
  };

  const saveSecurityChanges = () => {
    // Here you would typically send the securityData to your backend
    setIsEditingSecurity(false);
    toast({
      title: "Security settings updated",
      description: "Your security settings have been updated successfully.",
      variant: "default",
    });
  };

  return (
    <Container>
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text">User Cabinet</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="md:w-1/4">
            <Card className="premium-card sticky top-24">
              <CardContent className="p-4">
                <div className="flex flex-col items-center mb-6 pt-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 mb-3">
                    <img 
                      src={profileData.avatar} 
                      alt={profileData.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="font-semibold">{profileData.fullName}</h2>
                  <p className="text-sm text-muted-foreground">{profileData.email}</p>
                </div>
                
                <TabsList className="flex flex-col w-full bg-transparent space-y-1 h-auto">
                  <TabsTrigger value="profile" className="w-full justify-start gap-3 h-10 data-[state=active]:bg-primary/10 rounded-xl">
                    <User className="h-4 w-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="security" className="w-full justify-start gap-3 h-10 data-[state=active]:bg-primary/10 rounded-xl">
                    <Shield className="h-4 w-4" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="billing" className="w-full justify-start gap-3 h-10 data-[state=active]:bg-primary/10 rounded-xl">
                    <CreditCard className="h-4 w-4" />
                    Billing
                  </TabsTrigger>
                  <TabsTrigger value="teams" className="w-full justify-start gap-3 h-10 data-[state=active]:bg-primary/10 rounded-xl">
                    <Users className="h-4 w-4" />
                    Teams
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="w-full justify-start gap-3 h-10 data-[state=active]:bg-primary/10 rounded-xl">
                    <Bell className="h-4 w-4" />
                    Notifications
                  </TabsTrigger>
                </TabsList>
                
                <div className="mt-6 pt-6 border-t border-border/30">
                  <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 gap-3 rounded-xl">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4 space-y-6">
            {/* Profile Section */}
            <TabsContent value="profile" className="mt-0 animate-fade-in">
              <Card className="premium-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details and public profile</CardDescription>
                  </div>
                  <Button 
                    variant={isEditingProfile ? "outline" : "default"} 
                    size="sm" 
                    onClick={toggleEditProfile}
                    className="rounded-xl"
                  >
                    {isEditingProfile ? (
                      <>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20">
                      <img 
                        src={profileData.avatar} 
                        alt={profileData.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isEditingProfile && (
                      <div className="ml-6">
                        <Button variant="outline" size="sm" className="rounded-xl">
                          Change Avatar
                        </Button>
                      </div>
                    )}
                  </div>
                
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleProfileInputChange}
                        disabled={!isEditingProfile}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileInputChange}
                        disabled={!isEditingProfile}
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleProfileInputChange}
                      disabled={!isEditingProfile}
                      className="rounded-xl resize-none min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      type="text"
                      id="location"
                      name="location"
                      value={profileData.location}
                      onChange={handleProfileInputChange}
                      disabled={!isEditingProfile}
                      className="rounded-xl"
                    />
                  </div>
                </CardContent>
                {isEditingProfile && (
                  <CardFooter className="flex justify-end">
                    <Button 
                      onClick={saveProfileChanges} 
                      className="rounded-xl"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                )}
              </Card>
              
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Statistics</CardTitle>
                  <CardDescription>Your participation and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-muted/10 rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-muted-foreground">Hackathons</h3>
                        <Zap className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-2xl font-bold mt-2">12</p>
                      <span className="text-xs text-muted-foreground">Participated</span>
                    </div>
                    
                    <div className="bg-muted/10 rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-muted-foreground">Teams</h3>
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-2xl font-bold mt-2">3</p>
                      <span className="text-xs text-muted-foreground">Joined</span>
                    </div>
                    
                    <div className="bg-muted/10 rounded-xl p-4 border border-border/30">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-muted-foreground">Wins</h3>
                        <Trophy className="h-4 w-4 text-amber-500" />
                      </div>
                      <p className="text-2xl font-bold mt-2">2</p>
                      <span className="text-xs text-muted-foreground">First Place</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Security Section */}
            <TabsContent value="security" className="animate-fade-in mt-0">
              <Card className="premium-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security and authentication</CardDescription>
                  </div>
                  <Button 
                    variant={isEditingSecurity ? "outline" : "default"} 
                    size="sm" 
                    onClick={toggleEditSecurity}
                    className="rounded-xl"
                  >
                    {isEditingSecurity ? (
                      <>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Security
                      </>
                    )}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/10 border border-border/30">
                      <div className="space-y-1">
                        <h4 className="font-medium flex items-center">
                          <Key className="h-4 w-4 mr-2 text-primary" />
                          Password
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Last updated 3 months ago
                        </p>
                      </div>
                      {isEditingSecurity && (
                        <Button variant="outline" size="sm" className="rounded-xl">
                          Change Password
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/10 border border-border/30">
                      <div className="space-y-1">
                        <h4 className="font-medium flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-primary" />
                          Two-Factor Authentication
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch
                        id="twoFactorAuth"
                        name="twoFactorAuth"
                        checked={securityData.twoFactorAuth}
                        onCheckedChange={(checked) => setSecurityData(prev => ({ ...prev, twoFactorAuth: checked }))}
                        disabled={!isEditingSecurity}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/10 border border-border/30">
                      <div className="space-y-1">
                        <h4 className="font-medium flex items-center">
                          <Bell className="h-4 w-4 mr-2 text-primary" />
                          Email Notifications
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Receive security alerts via email
                        </p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        name="emailNotifications"
                        checked={securityData.emailNotifications}
                        onCheckedChange={(checked) => setSecurityData(prev => ({ ...prev, emailNotifications: checked }))}
                        disabled={!isEditingSecurity}
                      />
                    </div>
                  </div>
                </CardContent>
                {isEditingSecurity && (
                  <CardFooter className="flex justify-end">
                    <Button 
                      onClick={saveSecurityChanges} 
                      className="rounded-xl"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                )}
              </Card>
              
              <Card className="premium-card mt-6">
                <CardHeader>
                  <CardTitle className="text-red-500">Danger Zone</CardTitle>
                  <CardDescription>Irreversible actions for your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/5 border border-red-200 dark:border-red-800/30">
                      <div className="space-y-1">
                        <h4 className="font-medium text-red-600 dark:text-red-400">Delete Account</h4>
                        <p className="text-sm text-muted-foreground">
                          This action is irreversible and will delete all your data
                        </p>
                      </div>
                      <Button variant="destructive" size="sm" className="rounded-xl">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Placeholder content for other tabs */}
            <TabsContent value="billing" className="animate-fade-in mt-0">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>Manage your payment methods and billing history</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No billing information</h3>
                    <p className="text-muted-foreground max-w-md">
                      You haven't added any payment methods yet. Add a payment method to participate in premium hackathons.
                    </p>
                    <Button className="mt-6 rounded-xl">Add Payment Method</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="teams" className="animate-fade-in mt-0">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Your Teams</CardTitle>
                  <CardDescription>Manage your teams and team memberships</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No teams joined</h3>
                    <p className="text-muted-foreground max-w-md">
                      You are not a member of any teams yet. Create a team or join an existing one.
                    </p>
                    <div className="flex justify-center gap-3 mt-6">
                      <Button className="rounded-xl">Create Team</Button>
                      <Button variant="outline" className="rounded-xl">Find Teams</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="animate-fade-in mt-0">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-medium mb-2">Notification settings</h3>
                    <p className="text-muted-foreground max-w-md">
                      Configure your notification preferences to stay updated on important events.
                    </p>
                    <Button className="mt-6 rounded-xl">Configure Notifications</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </Container>
  );
};

export default UserCabinet;
