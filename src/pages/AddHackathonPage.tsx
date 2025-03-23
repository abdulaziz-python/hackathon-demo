
import React from "react";
import { motion } from "framer-motion";
import CreateHackathonForm from "@/components/admin/CreateHackathonForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, Trophy, Clock, Users } from "lucide-react";

const AddHackathonPage = () => {
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
            
            <Button 
              type="submit" 
              form="create-hackathon-form" 
              className="rounded-lg"
            >
              Publish Hackathon
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-card rounded-xl shadow-sm border border-border/40 p-6"
              >
                <CreateHackathonForm />
              </motion.div>
            </div>
            
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="bg-card rounded-xl shadow-sm border border-border/40 p-6 mb-6">
                  <h3 className="text-lg font-medium mb-4">Hackathon Guide</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mr-3 bg-primary/10 p-2 rounded-lg">
                        <Calendar size={18} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Set Clear Dates</h4>
                        <p className="text-sm text-muted-foreground">Define registration, start and end dates</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-3 bg-primary/10 p-2 rounded-lg">
                        <Trophy size={18} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Define Prizes</h4>
                        <p className="text-sm text-muted-foreground">Clear prize structure increases participation</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-3 bg-primary/10 p-2 rounded-lg">
                        <Clock size={18} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Reasonable Timeline</h4>
                        <p className="text-sm text-muted-foreground">Allow enough time for quality submissions</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-3 bg-primary/10 p-2 rounded-lg">
                        <Users size={18} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Team Settings</h4>
                        <p className="text-sm text-muted-foreground">Define minimum and maximum team sizes</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-xl shadow-sm border border-border/40 p-6">
                  <h3 className="text-lg font-medium mb-4">Preview</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    See how your hackathon will appear to participants
                  </p>
                  <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Preview will appear as you fill the form</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddHackathonPage;
