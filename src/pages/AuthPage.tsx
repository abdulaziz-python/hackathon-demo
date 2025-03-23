
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Mail, Lock, BrandTelegram, User, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TelegramAuth from "@/components/TelegramAuth";
import Container from "@/components/ui/Container";

interface AuthPageProps {
  defaultTab?: "login" | "signup";
}

const AuthPage = ({ defaultTab = "login" }: AuthPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTelegramDialogOpen, setIsTelegramDialogOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Use the defaultTab prop or determine based on URL path
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);

  // Update the URL when tab changes without full page reload
  const handleTabChange = (value: string) => {
    setActiveTab(value as "login" | "signup");
    navigate(value === "signup" ? "/signup" : "/login", { replace: true });
  };

  useEffect(() => {
    // Reset form when active tab changes
    setEmail("");
    setPassword("");
    setName("");
    setSuccess(false);
  }, [activeTab]);

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Invalid input",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      
      toast({
        title: "Login successful",
        description: "Welcome back to Hackathon.uz!",
      });
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }, 1500);
  };
  
  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast({
        title: "Invalid input",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created",
      });
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }, 1500);
  };
  
  const handleTelegramAuth = () => {
    setIsTelegramDialogOpen(true);
  };
  
  const handleTelegramSuccess = (userData: any) => {
    setIsTelegramDialogOpen(false);
    
    toast({
      title: "Telegram authentication successful",
      description: `Welcome, ${userData.first_name || "User"}!`,
    });
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  // Animation for success state
  const successAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <Container>
      <div className="flex items-center justify-center min-h-screen py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          {success ? (
            <motion.div
              variants={successAnimation}
              initial="hidden"
              animate="show"
              className="text-center space-y-6"
            >
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">
                {activeTab === "login" ? "Login Successful!" : "Account Created!"}
              </h2>
              <p className="text-muted-foreground">
                {activeTab === "login" 
                  ? "You're now signed in. Redirecting to your dashboard..." 
                  : "Your account has been created. Redirecting to your dashboard..."}
              </p>
              <div className="h-1 w-full max-w-xs mx-auto bg-muted overflow-hidden rounded-full">
                <motion.div 
                  className="h-full bg-primary" 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
                />
              </div>
            </motion.div>
          ) : (
            <Card className="shadow-sm bg-card border-border/50">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center font-semibold">
                  {activeTab === "login" ? "Sign in" : "Create an account"}
                </CardTitle>
                <CardDescription className="text-center">
                  {activeTab === "login" 
                    ? "Enter your credentials to access your account" 
                    : "Fill in your details to create a new account"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <form onSubmit={handleEmailLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 h-11 rounded-lg"
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Button variant="link" className="px-0 font-normal h-auto text-xs" type="button">
                            Forgot password?
                          </Button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 h-11 rounded-lg"
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full h-11 rounded-lg mt-2 btn-hover-effect" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></div>
                            Signing in...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            Sign in <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <form onSubmit={handleEmailSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="pl-10 h-11 rounded-lg"
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 h-11 rounded-lg"
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 h-11 rounded-lg"
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full h-11 rounded-lg mt-2 btn-hover-effect" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></div>
                            Creating account...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            Create account <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
                
                <div className="relative mt-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-6 h-11 rounded-lg btn-hover-effect"
                  onClick={handleTelegramAuth}
                >
                  <BrandTelegram className="mr-2 h-4 w-4 text-[#0088cc]" />
                  {activeTab === "login" ? "Sign in with Telegram" : "Sign up with Telegram"}
                </Button>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <div className="text-xs text-center text-muted-foreground">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </div>
              </CardFooter>
            </Card>
          )}
        </motion.div>
      </div>
      
      {/* Telegram Auth Dialog */}
      <Dialog open={isTelegramDialogOpen} onOpenChange={setIsTelegramDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {activeTab === "login" ? "Sign in with Telegram" : "Sign up with Telegram"}
            </DialogTitle>
          </DialogHeader>
          <TelegramAuth onSuccess={handleTelegramSuccess} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AuthPage;
