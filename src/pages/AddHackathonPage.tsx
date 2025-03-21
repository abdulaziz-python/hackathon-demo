
import React from "react";
import { motion } from "framer-motion";
import CreateHackathonForm from "@/components/admin/CreateHackathonForm";

const AddHackathonPage = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Create New Hackathon</h1>
          <p className="text-muted-foreground mt-1">
            Set up all the details for your new hackathon event
          </p>
        </div>
        
        <CreateHackathonForm />
      </motion.div>
    </div>
  );
};

export default AddHackathonPage;
