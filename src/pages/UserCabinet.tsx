import { useState } from "react";
import { 
  User, Settings, FileText, Award, Zap, 
  Users, Calendar, Trophy, Bell, LogOut, 
  Check, X, Edit, Save, CreditCard, 
  Shield, Key, Languages
} from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const UserCabinet = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingSecurity, setIsEditingSecurity] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    bio: "Software Engineer",
    location: "Tashkent, Uzbekistan",
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
    alert("Profile updated successfully!");
  };

  const saveSecurityChanges = () => {
    // Here you would typically send the securityData to your backend
    setIsEditingSecurity(false);
    alert("Security settings updated successfully!");
  };

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Navigation Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences.</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <nav className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start gap-2">
                <User className="h-4 w-4" />
                Profile
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <Shield className="h-4 w-4" />
                Security
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <CreditCard className="h-4 w-4" />
                Billing
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <Key className="h-4 w-4" />
                Privacy
              </Button>
              <Button variant="ghost" className="justify-start gap-2">
                <Languages className="h-4 w-4" />
                Language
              </Button>
              <Separator />
              <Button variant="ghost" className="justify-start gap-2 text-red-500">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </nav>
          </CardContent>
        </Card>

        {/* Profile Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Profile Information</CardTitle>
              <Button variant="outline" size="sm" onClick={toggleEditProfile}>
                {isEditingProfile ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleProfileInputChange}
                  disabled={!isEditingProfile}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileInputChange}
                  disabled={!isEditingProfile}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={profileData.bio}
                onChange={handleProfileInputChange}
                disabled={!isEditingProfile}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                id="location"
                name="location"
                value={profileData.location}
                onChange={handleProfileInputChange}
                disabled={!isEditingProfile}
              />
            </div>
          </CardContent>
          {isEditingProfile && (
            <CardFooter>
              <Button onClick={saveProfileChanges}>Save Changes</Button>
            </CardFooter>
          )}
        </Card>

        {/* Security Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Security Settings</CardTitle>
              <Button variant="outline" size="sm" onClick={toggleEditSecurity}>
                {isEditingSecurity ? "Cancel" : "Edit Security"}
              </Button>
            </div>
            <CardDescription>Manage your security preferences.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
              <Switch
                id="twoFactorAuth"
                name="twoFactorAuth"
                checked={securityData.twoFactorAuth}
                onCheckedChange={(checked) => setSecurityData(prev => ({ ...prev, twoFactorAuth: checked }))}
                disabled={!isEditingSecurity}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <Switch
                id="emailNotifications"
                name="emailNotifications"
                checked={securityData.emailNotifications}
                onCheckedChange={(checked) => setSecurityData(prev => ({ ...prev, emailNotifications: checked }))}
                disabled={!isEditingSecurity}
              />
            </div>
          </CardContent>
          {isEditingSecurity && (
            <CardFooter>
              <Button onClick={saveSecurityChanges}>Save Changes</Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </Container>
  );
};

export default UserCabinet;
