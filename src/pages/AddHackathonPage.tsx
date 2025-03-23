
import React from "react";
import { motion } from "framer-motion";
import CreateHackathonForm from "@/components/admin/CreateHackathonForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const AddHackathonPage = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="flex items-center mb-8">
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
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <CreateHackathonForm />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AddHackathonPage;
