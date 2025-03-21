
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";
import { Users, Award, Clock, Trophy, TrendingUp, Calendar, DollarSign } from "lucide-react";

const monthlyData = [
  { name: "Jan", participants: 22 },
  { name: "Feb", participants: 35 },
  { name: "Mar", participants: 48 },
  { name: "Apr", participants: 53 },
  { name: "May", participants: 65 },
  { name: "Jun", participants: 80 },
];

const revenueData = [
  { name: "Jan", revenue: 1200 },
  { name: "Feb", revenue: 1800 },
  { name: "Mar", revenue: 2400 },
  { name: "Apr", revenue: 2100 },
  { name: "May", revenue: 2800 },
  { name: "Jun", revenue: 3500 },
];

const hackathonData = [
  { name: "Active", value: 3 },
  { name: "Upcoming", value: 5 },
  { name: "Completed", value: 12 },
];

const COLORS = ["#0088FE", "#53DCE1", "#BBBBBB"];

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
      className="space-y-6 max-w-7xl mx-auto"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <div className="text-sm text-muted-foreground bg-secondary rounded-full px-4 py-1">
          <Calendar className="inline-block h-4 w-4 mr-1" /> 
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
      
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard 
          title="Total Users" 
          value="1,248" 
          change="+12%" 
          icon={<Users className="h-7 w-7" />} 
          color="blue"
        />
        <StatCard 
          title="Active Hackathons" 
          value="3" 
          change="+1" 
          icon={<Award className="h-7 w-7" />} 
          color="indigo"
        />
        <StatCard 
          title="Submissions" 
          value="342" 
          change="+28" 
          icon={<Trophy className="h-7 w-7" />} 
          color="amber"
        />
        <StatCard 
          title="Revenue" 
          value="$25,800" 
          change="+18%" 
          icon={<DollarSign className="h-7 w-7" />} 
          color="emerald"
        />
      </motion.div>
      
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 macos-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Growth Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[290px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorPart" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0088FE" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0088FE" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '0.5rem', 
                      border: '1px solid rgba(0,0,0,0.05)',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="participants" 
                    stroke="#0088FE" 
                    fillOpacity={1} 
                    fill="url(#colorPart)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="macos-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Hackathon Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[290px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={hackathonData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {hackathonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '0.5rem', 
                      border: '1px solid rgba(0,0,0,0.05)',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-around mt-2">
              {hackathonData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center text-xs">
                  <div 
                    className="w-3 h-3 rounded-full mr-1" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span>{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 macos-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '0.5rem', 
                      border: '1px solid rgba(0,0,0,0.05)',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value) => [`$${value}`, 'Revenue']}
                  />
                  <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="macos-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Active Hackathons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hackathons.slice(0, 3).map((hackathon) => (
                <div key={hackathon.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                    hackathon.status === 'active' ? 'bg-green-500' : 
                    hackathon.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-400'
                  }`} />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{hackathon.name}</h3>
                    <div className="text-xs text-muted-foreground flex justify-between mt-1">
                      <span className="capitalize">{hackathon.status}</span>
                      <span>{hackathon.participants} participants</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-xs text-primary">View all hackathons →</button>
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
  color: "blue" | "indigo" | "amber" | "emerald";
}

const StatCard = ({ title, value, change, icon, color }: StatCardProps) => {
  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400";
      case "indigo":
        return "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400";
      case "amber":
        return "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400";
      case "emerald":
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400";
    }
  };

  return (
    <Card className="macos-card border-none">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-semibold">{value}</h3>
            <p className="text-xs text-green-500 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> {change}
            </p>
          </div>
          <div className={`p-3 rounded-full ${getColorClasses()}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
