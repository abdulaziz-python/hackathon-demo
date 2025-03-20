
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
import { Plus, Edit, Trash, Check, X, Calendar } from "lucide-react";

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
  
  const [formData, setFormData] = useState({
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
        status: formData.status as "draft" | "active" | "completed" | "upcoming",
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Hackathon Management</h1>
        <Button onClick={handleCreateHackathon}>
          <Plus className="mr-2 h-4 w-4" /> Create Hackathon
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Hackathons</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hackathons.map((hackathon) => (
                <TableRow key={hackathon.id}>
                  <TableCell className="font-medium">{hackathon.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          hackathon.status === "active"
                            ? "bg-green-500"
                            : hackathon.status === "upcoming"
                            ? "bg-blue-500"
                            : hackathon.status === "completed"
                            ? "bg-gray-500"
                            : "bg-orange-500"
                        }`}
                      />
                      <span className="capitalize">{hackathon.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>{hackathon.participants}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditHackathon(hackathon)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteHackathon(hackathon.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
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
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="draft">Draft</option>
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingHackathon ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default HackathonManagement;
