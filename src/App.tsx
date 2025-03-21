
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import HackathonDetail from "./pages/HackathonDetail";
import TeamManagement from "./pages/TeamManagement";
import JudgeDashboard from "./pages/JudgeDashboard";
import Leaderboard from "./pages/Leaderboard";
import UserCabinet from "./pages/UserCabinet";
import AdminPanel from "./pages/AdminPanel";
import AuthPage from "./pages/AuthPage";
import AddHackathonPage from "./pages/AddHackathonPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App = () => {
  // Add transition classes to the body when the page loads
  useEffect(() => {
    document.body.classList.add("transition-colors", "duration-300");
    
    // Check for dark mode preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Add macOS design classes to body
    document.body.classList.add("font-sans", "antialiased");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" closeButton />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/signup" element={<AuthPage mode="signup" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/hackathons/:id" element={<HackathonDetail />} />
              <Route path="/team" element={<TeamManagement />} />
              <Route path="/judge" element={<JudgeDashboard />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/cabinet" element={<UserCabinet />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/admin/add-hackathon" element={<AddHackathonPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
