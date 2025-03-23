
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Send, ArrowRight, CheckCircle2 } from "lucide-react";

interface TelegramAuthProps {
  onSuccess?: (userData?: any) => void;
}

const TelegramAuth = ({ onSuccess }: TelegramAuthProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code" | "success">("phone");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Demo purpose: Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep("code");
      toast({
        title: "Verification Code Sent",
        description: "We've sent a code to your Telegram account",
      });
    }, 1500);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.length !== 5) {
      toast({
        title: "Invalid Code",
        description: "Please enter the 5-digit code sent to your Telegram",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Demo purpose: Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep("success");
      toast({
        title: "Authentication Successful",
        description: "You've successfully signed in with Telegram",
      });
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        setTimeout(() => {
          onSuccess({
            first_name: "Demo",
            last_name: "User",
            username: "demouser",
            id: "12345678"
          });
        }, 1500);
      }
    }, 1500);
  };

  const formatPhoneNumber = (value: string) => {
    // Remove non-numeric characters
    const numeric = value.replace(/[^\d]/g, '');
    return numeric;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md mx-auto shadow-sm bg-card">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="h-14 w-14 rounded-full bg-telegram text-white flex items-center justify-center">
              <Send size={28} />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Sign in with Telegram</CardTitle>
          <CardDescription className="text-center">
            {step === "phone" && "Enter your phone number connected to Telegram"}
            {step === "code" && "Enter the verification code sent to your Telegram"}
            {step === "success" && "You've successfully authenticated with Telegram"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "phone" && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                    className="pl-[+] h-12 rounded-lg"
                    disabled={loading}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  We'll send a verification code to your Telegram account
                </p>
              </div>
              <Button 
                type="submit" 
                className="w-full h-11 rounded-lg" 
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></div>
                    Sending Code...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>
          )}
          
          {step === "code" && (
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="5-digit code"
                    value={code}
                    onChange={(e) => setCode(e.target.value.slice(0, 5))}
                    className="h-12 text-center rounded-lg text-xl tracking-wide"
                    inputMode="numeric"
                    maxLength={5}
                    disabled={loading}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Enter the code we sent to your Telegram account
                </p>
              </div>
              <Button 
                type="submit" 
                className="w-full h-11 rounded-lg" 
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Verify <Send className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>
          )}
          
          {step === "success" && (
            <div className="py-4 text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
              <p className="text-lg font-medium">Authentication Successful</p>
              <p className="text-sm text-muted-foreground">
                You're now signed in with Telegram
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TelegramAuth;
