
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const userActivityData = [
  { name: "Mon", logins: 45, registrations: 12 },
  { name: "Tue", logins: 52, registrations: 15 },
  { name: "Wed", logins: 49, registrations: 10 },
  { name: "Thu", logins: 63, registrations: 18 },
  { name: "Fri", logins: 58, registrations: 14 },
  { name: "Sat", logins: 48, registrations: 8 },
  { name: "Sun", logins: 38, registrations: 6 },
];

const submissionTimeData = [
  { hour: "00:00", submissions: 2 },
  { hour: "04:00", submissions: 1 },
  { hour: "08:00", submissions: 7 },
  { hour: "12:00", submissions: 15 },
  { hour: "16:00", submissions: 24 },
  { hour: "20:00", submissions: 18 },
];

const hackathonParticipationData = [
  { hackathon: "Web3", participants: 120, teams: 35 },
  { hackathon: "AI/ML", participants: 180, teams: 42 },
  { hackathon: "Mobile", participants: 86, teams: 22 },
  { hackathon: "GameDev", participants: 104, teams: 27 },
];

const userRetentionData = [
  { month: "Jan", retention: 78 },
  { month: "Feb", retention: 75 },
  { month: "Mar", retention: 82 },
  { month: "Apr", retention: 85 },
  { month: "May", retention: 80 },
  { month: "Jun", retention: 87 },
];

const AnalyticsPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <div className="flex items-center space-x-3">
          <Select defaultValue="last7days">
            <SelectTrigger className="w-[180px] h-9 text-sm">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="last7days">Last 7 days</SelectItem>
              <SelectItem value="last30days">Last 30 days</SelectItem>
              <SelectItem value="thisMonth">This month</SelectItem>
              <SelectItem value="lastMonth">Last month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* User Activity Chart */}
        <Card className="macos-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={userActivityData}
                  margin={{ top: 10, right: 30, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(0,0,0,0.05)',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Line
                    type="monotone"
                    dataKey="logins"
                    stroke="#0088FE"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="registrations"
                    stroke="#00C49F"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Submission Time Distribution */}
        <Card className="macos-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Submission Time Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={submissionTimeData}
                  margin={{ top: 10, right: 30, left: 5, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorSubmissions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="hour" axisLine={false} tickLine={false} />
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
                    dataKey="submissions"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorSubmissions)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Hackathon Participation */}
        <Card className="macos-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Hackathon Participation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={hackathonParticipationData}
                  margin={{ top: 10, right: 30, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="hackathon" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(0,0,0,0.05)',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="participants" fill="#0088FE" name="Participants" />
                  <Bar dataKey="teams" fill="#00C49F" name="Teams" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* User Retention */}
        <Card className="macos-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">User Retention Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={userRetentionData}
                  margin={{ top: 10, right: 30, left: 5, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF8042" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#FF8042" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} domain={[50, 100]} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(0,0,0,0.05)',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value) => [`${value}%`, 'Retention Rate']}
                  />
                  <Area
                    type="monotone"
                    dataKey="retention"
                    stroke="#FF8042"
                    fillOpacity={1}
                    fill="url(#colorRetention)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default AnalyticsPanel;
