
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { Users, Award, Clock, Trophy } from "lucide-react";

const data = [
  { name: "Jan", participants: 22 },
  { name: "Feb", participants: 35 },
  { name: "Mar", participants: 48 },
  { name: "Apr", participants: 53 },
  { name: "May", participants: 65 },
  { name: "Jun", participants: 80 },
];

const hackathons = [
  { id: 1, name: "Web3 Hackathon", status: "active", participants: 120, endDate: "2023-12-15" },
  { id: 2, name: "AI Innovation Challenge", status: "upcoming", participants: 0, endDate: "2024-01-10" },
  { id: 3, name: "Mobile Dev Competition", status: "completed", participants: 86, endDate: "2023-11-05" },
];

const AdminDashboard = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value="1,248" 
          change="+12%" 
          icon={<Users className="h-8 w-8" />} 
        />
        <StatCard 
          title="Hackathons" 
          value="8" 
          change="+2" 
          icon={<Award className="h-8 w-8" />} 
        />
        <StatCard 
          title="Active Competitions" 
          value="3" 
          change="+1" 
          icon={<Clock className="h-8 w-8" />} 
        />
        <StatCard 
          title="Submissions" 
          value="342" 
          change="+28" 
          icon={<Trophy className="h-8 w-8" />} 
        />
      </motion.div>
      
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Participant Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="participants" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Hackathons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {hackathons.map((hackathon) => (
                <div key={hackathon.id} className="flex items-start space-x-4">
                  <div className={`w-3 h-3 mt-1.5 rounded-full ${
                    hackathon.status === 'active' ? 'bg-green-500' : 
                    hackathon.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-500'
                  }`} />
                  <div className="flex-1">
                    <h3 className="font-medium">{hackathon.name}</h3>
                    <div className="text-sm text-muted-foreground flex justify-between">
                      <span>{hackathon.status}</span>
                      <span>{hackathon.participants} participants</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, icon }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between pt-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <p className="text-xs text-green-500 mt-1">{change}</p>
        </div>
        <div className="p-2 bg-primary/10 rounded-full">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
