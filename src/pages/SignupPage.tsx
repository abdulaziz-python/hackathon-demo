
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TelegramAuth from "@/components/TelegramAuth";
import Container from "@/components/ui/Container";
import { TelegramIcon } from "@/components/ui/Icons";

const SignupPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTelegramDialogOpen, setIsTelegramDialogOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created",
      });
      
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
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold">Account Created!</h2>
              <p className="text-muted-foreground">
                Your account has been created. Redirecting to your dashboard...
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
                  Create an account
                </CardTitle>
                <CardDescription className="text-center">
                  Fill in your details to create a new account
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 h-11 rounded-lg"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
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
                    className="w-full mt-2 h-11 rounded-lg btn-hover-effect"
                    onClick={handleTelegramAuth}
                  >
                    <TelegramIcon className="mr-2 h-4 w-4" />
                    Sign up with Telegram
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Sign in
                  </Link>
                </div>
                <div className="text-xs text-center text-muted-foreground">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </div>
              </CardFooter>
            </Card>
          )}
        </motion.div>
      </div>
      
      <Dialog open={isTelegramDialogOpen} onOpenChange={setIsTelegramDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign up with Telegram</DialogTitle>
          </DialogHeader>
          <TelegramAuth onSuccess={handleTelegramSuccess} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default SignupPage;
