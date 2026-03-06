import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RoleProvider } from "@/context/RoleContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import APNAutomation from "./pages/APNAutomation";
import APNUpload from "./pages/APNUpload";
import PublicHealthAutomation from "./pages/PublicHealthAutomation";
import PHUpload from "./pages/PHUpload";
import Logs from "./pages/Logs";
import EmailLogs from "./pages/EmailLogs";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RoleProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/apn-automation" element={<APNAutomation />} />
            <Route path="/apn-upload" element={<APNUpload />} />
            <Route path="/public-health-automation" element={<PublicHealthAutomation />} />
            <Route path="/ph-upload" element={<PHUpload />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/email-logs" element={<EmailLogs />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
