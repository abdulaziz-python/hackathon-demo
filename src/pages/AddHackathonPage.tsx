
import React, { useState } from "react";
import { motion } from "framer-motion";
import CreateHackathonForm from "@/components/admin/CreateHackathonForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Calendar, Trophy, Clock, Users, Eye, CheckCircle, PlusCircle, Rocket } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const AddHackathonPage = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [previewData, setPreviewData] = useState<any>(null);
  const { toast } = useToast();
  
  const updatePreview = (data: any) => {
    setPreviewData(data);
  };
  
  const handlePublish = () => {
    toast({
      title: "Hackathon Published!",
      description: "Your hackathon has been successfully published.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pl-20 py-6 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-6"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Link to="/admin">
                <Button variant="ghost" size="sm" className="mr-4 rounded-lg">
                  <ChevronLeft className="h-4 w-4 mr-1" /> Back to Admin
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-semibold">Create New Hackathon</h1>
                <p className="text-muted-foreground mt-1">
                  Set up all the details for your new hackathon event
                </p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" className="rounded-lg">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button 
                type="submit" 
                form="create-hackathon-form" 
                className="rounded-lg"
                onClick={handlePublish}
              >
                <Rocket className="h-4 w-4 mr-2" />
                Publish Hackathon
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-card rounded-xl shadow-sm border border-border/40 p-6"
              >
                <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-5 mb-6">
                    <TabsTrigger value="details" className="flex items-center">
                      <span className="hidden md:inline">Basic Details</span>
                      <span className="md:hidden">Basics</span>
                    </TabsTrigger>
                    <TabsTrigger value="schedule" className="flex items-center">
                      <span className="hidden md:inline">Schedule</span>
                      <span className="md:hidden">Dates</span>
                    </TabsTrigger>
                    <TabsTrigger value="participants" className="flex items-center">
                      <span className="hidden md:inline">Participants</span>
                      <span className="md:hidden">Teams</span>
                    </TabsTrigger>
                    <TabsTrigger value="prizes" className="flex items-center">
                      <span className="hidden md:inline">Prizes</span>
                      <span className="md:hidden">Prizes</span>
                    </TabsTrigger>
                    <TabsTrigger value="publish" className="flex items-center">
                      <span className="hidden md:inline">Publish</span>
                      <span className="md:hidden">Publish</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details">
                    <CreateHackathonForm onUpdatePreview={updatePreview} />
                  </TabsContent>
                  
                  <TabsContent value="schedule">
                    <div className="space-y-4 text-center py-12">
                      <Clock className="h-12 w-12 mx-auto text-muted-foreground" />
                      <h3 className="text-xl font-semibold">Schedule Planning</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        This section will allow you to set up the detailed schedule 
                        for your hackathon including registration periods, judging times, 
                        and important milestones.
                      </p>
                      <Button className="mt-4">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Schedule Details
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="participants">
                    <div className="space-y-4 text-center py-12">
                      <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                      <h3 className="text-xl font-semibold">Participant Settings</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Configure team sizes, participant requirements, and registration 
                        limitations for your hackathon event.
                      </p>
                      <Button className="mt-4">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Configure Participants
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="prizes">
                    <div className="space-y-4 text-center py-12">
                      <Trophy className="h-12 w-12 mx-auto text-muted-foreground" />
                      <h3 className="text-xl font-semibold">Prize Structure</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Define the prizes, awards, and recognition that participants can win
                        during your hackathon event.
                      </p>
                      <Button className="mt-4">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Set Up Prizes
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="publish">
                    <div className="space-y-4 text-center py-12">
                      <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground" />
                      <h3 className="text-xl font-semibold">Ready to Publish</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Review all details and publish your hackathon when you're ready.
                        You can make changes after publishing as well.
                      </p>
                      <Button className="mt-4" onClick={handlePublish}>
                        <Rocket className="h-4 w-4 mr-2" />
                        Publish Hackathon
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
            
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Card className="rounded-xl shadow-sm border border-border/40 p-6 mb-6 sticky top-6">
                  <h3 className="text-lg font-medium mb-4">Hackathon Preview</h3>
                  
                  {previewData ? (
                    <div className="space-y-4">
                      <div className="aspect-video rounded-lg bg-muted relative overflow-hidden">
                        {previewData.coverImage ? (
                          <img 
                            src={previewData.coverImage} 
                            alt="Hackathon preview" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <p className="text-sm text-muted-foreground">Cover image will appear here</p>
                          </div>
                        )}
                        
                        {previewData.name && (
                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                            <h3 className="text-white font-medium">{previewData.name}</h3>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">{previewData.name || "Hackathon Name"}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {previewData.description || "Hackathon description will appear here."}
                        </p>
                        
                        {previewData.startDate && previewData.endDate && (
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{new Date(previewData.startDate).toLocaleDateString()} - {new Date(previewData.endDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        
                        {previewData.status && (
                          <div className="flex items-center">
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              previewData.status === "draft" ? "bg-warning/10 text-warning" : 
                              previewData.status === "active" ? "bg-success/10 text-success" : 
                              "bg-primary/10 text-primary"
                            }`}>
                              {previewData.status.charAt(0).toUpperCase() + previewData.status.slice(1)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Preview will appear as you fill the form</p>
                    </div>
                  )}
                  
                  <CardContent className="p-0 pt-4">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="mr-3 bg-primary/10 p-2 rounded-lg">
                          <Calendar size={18} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Set Clear Dates</h4>
                          <p className="text-xs text-muted-foreground">Define registration, start and end dates</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mr-3 bg-primary/10 p-2 rounded-lg">
                          <Trophy size={18} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Define Prizes</h4>
                          <p className="text-xs text-muted-foreground">Clear prize structure increases participation</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mr-3 bg-primary/10 p-2 rounded-lg">
                          <Users size={18} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Team Settings</h4>
                          <p className="text-xs text-muted-foreground">Define minimum and maximum team sizes</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddHackathonPage;
