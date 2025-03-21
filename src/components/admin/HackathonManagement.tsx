
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Plus, Edit, Trash, Calendar, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Hackathon {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "draft" | "active" | "completed" | "upcoming";
  participants: number;
}

const sampleHackathons: Hackathon[] = [
  {
    id: 1,
    name: "Web3 Development Challenge",
    description: "Build decentralized applications on blockchain technology",
    startDate: "2023-11-15",
    endDate: "2023-12-15",
    status: "active",
    participants: 120,
  },
  {
    id: 2,
    name: "AI Innovation Hackathon",
    description: "Create AI-powered solutions for real-world problems",
    startDate: "2024-01-10",
    endDate: "2024-02-10",
    status: "upcoming",
    participants: 0,
  },
  {
    id: 3,
    name: "Mobile App Competition",
    description: "Develop innovative mobile applications",
    startDate: "2023-09-05",
    endDate: "2023-11-05",
    status: "completed",
    participants: 86,
  },
  {
    id: 4,
    name: "IoT Solutions Hackathon",
    description: "Build innovative Internet of Things solutions",
    startDate: "2023-10-01",
    endDate: "2023-11-30",
    status: "completed",
    participants: 64,
  },
  {
    id: 5,
    name: "Sustainable Tech Challenge",
    description: "Create technologies for a sustainable future",
    startDate: "2024-02-15",
    endDate: "2024-03-15",
    status: "draft",
    participants: 0,
  },
];

const HackathonManagement = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>(sampleHackathons);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingHackathon, setEditingHackathon] = useState<Hackathon | null>(null);
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: "draft" | "active" | "completed" | "upcoming";
  }>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "draft",
  });

  const handleCreateHackathon = () => {
    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "draft",
    });
    setIsCreateDialogOpen(true);
  };

  const handleEditHackathon = (hackathon: Hackathon) => {
    setEditingHackathon(hackathon);
    setFormData({
      name: hackathon.name,
      description: hackathon.description,
      startDate: hackathon.startDate,
      endDate: hackathon.endDate,
      status: hackathon.status,
    });
    setIsCreateDialogOpen(true);
  };

  const handleDeleteHackathon = (id: number) => {
    setHackathons(hackathons.filter((h) => h.id !== id));
    toast({
      title: "Hackathon Deleted",
      description: "The hackathon has been successfully removed",
      variant: "default",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStatusChange = (value: "draft" | "active" | "completed" | "upcoming") => {
    setFormData({
      ...formData,
      status: value,
    });
  };

  const handleSubmit = () => {
    if (editingHackathon) {
      // Update existing hackathon
      setHackathons(
        hackathons.map((h) =>
          h.id === editingHackathon.id
            ? { ...h, ...formData }
            : h
        )
      );
      toast({
        title: "Hackathon Updated",
        description: "The hackathon has been successfully updated",
        variant: "default",
      });
    } else {
      // Create new hackathon
      const newHackathon: Hackathon = {
        id: Math.max(...hackathons.map((h) => h.id)) + 1,
        name: formData.name,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status,
        participants: 0,
      };
      setHackathons([...hackathons, newHackathon]);
      toast({
        title: "Hackathon Created",
        description: "New hackathon has been successfully created",
        variant: "default",
      });
    }
    setIsCreateDialogOpen(false);
    setEditingHackathon(null);
  };

  // Filter hackathons based on search query
  const filteredHackathons = hackathons.filter(
    (hackathon) =>
      hackathon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hackathon.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold">Hackathon Management</h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search hackathons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 rounded-lg"
            />
          </div>
          <Button onClick={handleCreateHackathon} size="sm" className="rounded-lg whitespace-nowrap">
            <Plus className="mr-2 h-4 w-4" /> Create
          </Button>
        </div>
      </div>

      <Card className="macos-card shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Dates</TableHead>
                <TableHead className="hidden md:table-cell">Participants</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHackathons.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    No hackathons found. Try a different search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredHackathons.map((hackathon) => (
                  <TableRow key={hackathon.id}>
                    <TableCell className="font-medium">
                      <div>
                        {hackathon.name}
                        <div className="text-xs text-muted-foreground md:hidden mt-1">
                          <span className="capitalize">{hackathon.status}</span> • {hackathon.participants} participants
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            hackathon.status === "active"
                              ? "bg-green-500"
                              : hackathon.status === "upcoming"
                              ? "bg-blue-500"
                              : hackathon.status === "completed"
                              ? "bg-gray-400"
                              : "bg-amber-500"
                          }`}
                        />
                        <span className="capitalize">{hackathon.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center text-sm whitespace-nowrap">
                        <Calendar className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                        <span>{new Date(hackathon.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(hackathon.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{hackathon.participants}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditHackathon(hackathon)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteHackathon(hackathon.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {editingHackathon ? "Edit Hackathon" : "Create New Hackathon"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Hackathon Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter hackathon name"
                className="rounded-lg"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter hackathon description"
                rows={3}
                className="rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="rounded-lg"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={handleStatusChange}>
                <SelectTrigger id="status" className="rounded-lg">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="rounded-lg">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="rounded-lg">
              {editingHackathon ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default HackathonManagement;
