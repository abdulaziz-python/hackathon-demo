
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Save } from "lucide-react";

const SettingsPanel = () => {
  const { toast } = useToast();
  
  // Site Settings
  const [siteSettings, setSiteSettings] = useState({
    siteName: "Hackathon.uz",
    siteDescription: "The premier platform for hackathons in Uzbekistan. A minimalist approach to innovation.",
    contactEmail: "info@hackathon.uz",
    footerText: "© 2023 Hackathon.uz. All rights reserved.",
  });
  
  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@hackathon.uz",
    smtpPassword: "••••••••••••",
    senderName: "Hackathon.uz Team",
    senderEmail: "notifications@hackathon.uz",
  });
  
  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    enableEmailNotifications: true,
    notifyOnNewRegistration: true,
    notifyOnNewSubmission: true,
    notifyOnHackathonStart: true,
    notifyOnHackathonEnd: true,
    enableAdminAlerts: true,
  });
  
  const handleSiteSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSiteSettings({
      ...siteSettings,
      [name]: value,
    });
  };
  
  const handleEmailSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailSettings({
      ...emailSettings,
      [name]: value,
    });
  };
  
  const handleNotificationToggle = (setting: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting as keyof typeof notificationSettings],
    });
  };
  
  const handleSaveSettings = (settingsType: string) => {
    // In a real application, this would send the settings to the backend
    toast({
      title: "Settings Saved",
      description: `Your ${settingsType} settings have been updated successfully.`,
      variant: "default",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-8">Admin Settings</h1>

      <Tabs defaultValue="site" className="space-y-6">
        <TabsList className="mb-6">
          <TabsTrigger value="site">Site Settings</TabsTrigger>
          <TabsTrigger value="email">Email Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="site">
          <Card>
            <CardHeader>
              <CardTitle>Site Configuration</CardTitle>
              <CardDescription>
                Manage your website's basic information and appearance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  name="siteName"
                  value={siteSettings.siteName}
                  onChange={handleSiteSettingsChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  name="siteDescription"
                  value={siteSettings.siteDescription}
                  onChange={handleSiteSettingsChange}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={siteSettings.contactEmail}
                  onChange={handleSiteSettingsChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="footerText">Footer Text</Label>
                <Input
                  id="footerText"
                  name="footerText"
                  value={siteSettings.footerText}
                  onChange={handleSiteSettingsChange}
                />
              </div>
              
              <Button onClick={() => handleSaveSettings("site")}>
                <Save className="mr-2 h-4 w-4" /> Save Site Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>
                Configure your email server settings for sending notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">SMTP Server</Label>
                  <Input
                    id="smtpServer"
                    name="smtpServer"
                    value={emailSettings.smtpServer}
                    onChange={handleEmailSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    name="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={handleEmailSettingsChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    name="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={handleEmailSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    name="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={handleEmailSettingsChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="senderName">Sender Name</Label>
                  <Input
                    id="senderName"
                    name="senderName"
                    value={emailSettings.senderName}
                    onChange={handleEmailSettingsChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="senderEmail">Sender Email</Label>
                  <Input
                    id="senderEmail"
                    name="senderEmail"
                    type="email"
                    value={emailSettings.senderEmail}
                    onChange={handleEmailSettingsChange}
                  />
                </div>
              </div>
              
              <Button onClick={() => handleSaveSettings("email")}>
                <Save className="mr-2 h-4 w-4" /> Save Email Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage when and how notifications are sent to users and admins.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableEmailNotifications">Enable Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow the system to send email notifications
                    </p>
                  </div>
                  <Switch
                    id="enableEmailNotifications"
                    checked={notificationSettings.enableEmailNotifications}
                    onCheckedChange={() => handleNotificationToggle("enableEmailNotifications")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifyOnNewRegistration">New User Registration</Label>
                    <p className="text-sm text-muted-foreground">
                      Send notifications when new users register
                    </p>
                  </div>
                  <Switch
                    id="notifyOnNewRegistration"
                    checked={notificationSettings.notifyOnNewRegistration}
                    onCheckedChange={() => handleNotificationToggle("notifyOnNewRegistration")}
                    disabled={!notificationSettings.enableEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifyOnNewSubmission">New Submissions</Label>
                    <p className="text-sm text-muted-foreground">
                      Send notifications for new hackathon submissions
                    </p>
                  </div>
                  <Switch
                    id="notifyOnNewSubmission"
                    checked={notificationSettings.notifyOnNewSubmission}
                    onCheckedChange={() => handleNotificationToggle("notifyOnNewSubmission")}
                    disabled={!notificationSettings.enableEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifyOnHackathonStart">Hackathon Start</Label>
                    <p className="text-sm text-muted-foreground">
                      Send notifications when a hackathon begins
                    </p>
                  </div>
                  <Switch
                    id="notifyOnHackathonStart"
                    checked={notificationSettings.notifyOnHackathonStart}
                    onCheckedChange={() => handleNotificationToggle("notifyOnHackathonStart")}
                    disabled={!notificationSettings.enableEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifyOnHackathonEnd">Hackathon End</Label>
                    <p className="text-sm text-muted-foreground">
                      Send notifications when a hackathon ends
                    </p>
                  </div>
                  <Switch
                    id="notifyOnHackathonEnd"
                    checked={notificationSettings.notifyOnHackathonEnd}
                    onCheckedChange={() => handleNotificationToggle("notifyOnHackathonEnd")}
                    disabled={!notificationSettings.enableEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableAdminAlerts">Admin Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Send critical alerts to administrators
                    </p>
                  </div>
                  <Switch
                    id="enableAdminAlerts"
                    checked={notificationSettings.enableAdminAlerts}
                    onCheckedChange={() => handleNotificationToggle("enableAdminAlerts")}
                    disabled={!notificationSettings.enableEmailNotifications}
                  />
                </div>
              </div>
              
              <Button onClick={() => handleSaveSettings("notification")}>
                <Save className="mr-2 h-4 w-4" /> Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default SettingsPanel;
