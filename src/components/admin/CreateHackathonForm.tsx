
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, MapPin, Upload as UploadIcon, UserPlus, Users } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Form schema definition
const hackathonFormSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters"),
  tagline: z.string().optional(),
  description: z.string().min(20, "Description must be at least 20 characters"),
  startDate: z.date(),
  endDate: z.date(),
  registrationDeadline: z.date(),
  location: z.string().min(3, "Location must be at least 3 characters"),
  maxTeamSize: z.string(),
  minTeamSize: z.string(),
  status: z.string(),
  category: z.string(),
  coverImage: z.string().optional(),
});

type HackathonFormValues = z.infer<typeof hackathonFormSchema>;

// Default values
const defaultValues: Partial<HackathonFormValues> = {
  name: "",
  tagline: "",
  description: "",
  location: "",
  maxTeamSize: "5",
  minTeamSize: "2",
  status: "draft",
  category: "general",
};

const CreateHackathonForm = ({ onUpdatePreview }: { onUpdatePreview: (data: any) => void }) => {
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");
  const { toast } = useToast();
  
  const form = useForm<HackathonFormValues>({
    resolver: zodResolver(hackathonFormSchema),
    defaultValues,
  });
  
  // Update preview when form values change
  useEffect(() => {
    const subscription = form.watch((value) => {
      onUpdatePreview({
        ...value,
        coverImage: coverImageUrl,
      });
    });
    return () => subscription.unsubscribe();
  }, [form, onUpdatePreview, coverImageUrl]);
  
  const onSubmit = (data: HackathonFormValues) => {
    console.log('Form submitted:', data);
    toast({
      title: "Form saved!",
      description: "Your hackathon details have been saved.",
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCoverImageUrl(event.target.result as string);
          
          // Update the preview with the new image
          const currentValues = form.getValues();
          onUpdatePreview({
            ...currentValues,
            coverImage: event.target.result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form id="create-hackathon-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6">
          <Card className="border border-border/40 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2 mb-6">
                <h3 className="text-lg font-medium">Basic Information</h3>
                <p className="text-sm text-muted-foreground">
                  Enter the basic details about your hackathon.
                </p>
              </div>
              
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hackathon Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Web3 Innovation Challenge" 
                          {...field} 
                          className="rounded-lg"
                        />
                      </FormControl>
                      <FormDescription>
                        This is the main title of your hackathon.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tagline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tagline</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Building the decentralized future" 
                          {...field} 
                          className="rounded-lg"
                        />
                      </FormControl>
                      <FormDescription>
                        A short, catchy phrase that describes your hackathon.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your hackathon in detail..." 
                          {...field} 
                          className="min-h-[120px] rounded-lg"
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a comprehensive description of what your hackathon is about, its goals, and what participants can expect.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-lg">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="web3">Web3 & Blockchain</SelectItem>
                          <SelectItem value="ai">AI & Machine Learning</SelectItem>
                          <SelectItem value="mobile">Mobile Development</SelectItem>
                          <SelectItem value="web">Web Development</SelectItem>
                          <SelectItem value="iot">IoT & Hardware</SelectItem>
                          <SelectItem value="game">Game Development</SelectItem>
                          <SelectItem value="social">Social Impact</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the primary category for your hackathon.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <FormLabel>Cover Image</FormLabel>
                  <div className="mt-2 flex flex-col space-y-2">
                    <div 
                      className="border-2 border-dashed border-border/60 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => document.getElementById('coverImage')?.click()}
                    >
                      {coverImageUrl ? (
                        <div className="relative w-full">
                          <img 
                            src={coverImageUrl} 
                            alt="Cover preview" 
                            className="w-full h-40 object-cover rounded-lg" 
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                            <p className="text-white text-sm font-medium">Click to change image</p>
                          </div>
                        </div>
                      ) : (
                        <div className="py-4 flex flex-col items-center justify-center text-center">
                          <UploadIcon className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">Upload cover image</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Recommended size: 1200 x 630 pixels
                          </p>
                        </div>
                      )}
                      <input 
                        id="coverImage"
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This image will be displayed as the banner for your hackathon.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-border/40 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2 mb-6">
                <h3 className="text-lg font-medium">Dates & Location</h3>
                <p className="text-sm text-muted-foreground">
                  Set the timeline and location for your hackathon.
                </p>
              </div>
              
              <div className="grid gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal rounded-lg",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          The official start date of your hackathon.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal rounded-lg",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          The official end date of your hackathon.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="registrationDeadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Registration Deadline</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal rounded-lg",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        The last day participants can register for your hackathon.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="e.g., Tashkent, Uzbekistan or Virtual" 
                            {...field} 
                            className="pl-10 rounded-lg"
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        The physical location or "Virtual" if it's an online event.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-border/40 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2 mb-6">
                <h3 className="text-lg font-medium">Team Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Configure team size and participation requirements.
                </p>
              </div>
              
              <div className="grid gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="minTeamSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Team Size</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="rounded-lg">
                              <SelectValue placeholder="Select minimum size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 (Individual)</SelectItem>
                            <SelectItem value="2">2 Members</SelectItem>
                            <SelectItem value="3">3 Members</SelectItem>
                            <SelectItem value="4">4 Members</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The minimum allowed team size.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="maxTeamSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Team Size</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="rounded-lg">
                              <SelectValue placeholder="Select maximum size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="2">2 Members</SelectItem>
                            <SelectItem value="3">3 Members</SelectItem>
                            <SelectItem value="4">4 Members</SelectItem>
                            <SelectItem value="5">5 Members</SelectItem>
                            <SelectItem value="6">6 Members</SelectItem>
                            <SelectItem value="10">10 Members</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The maximum allowed team size.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-border/40 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2 mb-6">
                <h3 className="text-lg font-medium">Publishing</h3>
                <p className="text-sm text-muted-foreground">
                  Set the visibility and status of your hackathon.
                </p>
              </div>
              
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-lg">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="upcoming">Upcoming</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Control the visibility of your hackathon.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" className="rounded-lg">Save Details</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateHackathonForm;
