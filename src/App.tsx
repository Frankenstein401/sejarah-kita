import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigationType, useLocation } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";
import Index from "./pages/Index";
import ArticleList from "./pages/ArticleList";
import ArticleDetail from "./pages/ArticleDetail";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ScrollToTop from "./components/ScrollToTop";
import { GuestRoute, ProtectedRoute, AdminRoute } from "./components/RouteGuards";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminArticles from "./pages/admin/AdminArticles";
import AdminQuizzes from "./pages/admin/AdminQuizzes";
import AdminComments from "./pages/admin/AdminComments";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminMapEditor from "./pages/admin/AdminMapEditor";
import AdminTimeline from "./pages/admin/AdminTimeline";
import ProfilePage from "./pages/ProfilePage";

const queryClient = new QueryClient();

/** Blokir semua akses direct URL (POP = ketik URL / reload). Hanya "/" yang boleh. */
function DirectUrlBlocker({ children }: { children: React.ReactNode }) {
  const navType = useNavigationType();
  const location = useLocation();
  if (navType === "POP" && location.pathname !== "/") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
        {!loading && (
          <BrowserRouter>
            <ScrollToTop />
            <DirectUrlBlocker>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/artikel" element={<ArticleList />} />
              <Route path="/tentang" element={<AboutPage />} />
              <Route path="/artikel/:slug" element={<ArticleDetail />} />
              {/* Guest only: redirect ke home kalau sudah login */}
              <Route element={<GuestRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>

              {/* Login wajib */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profil" element={<ProfilePage />} />
              </Route>

              {/* Admin only */}
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="articles" element={<AdminArticles />} />
                  <Route path="quizzes" element={<AdminQuizzes />} />
                  <Route path="comments" element={<AdminComments />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="map" element={<AdminMapEditor />} />
                  <Route path="timeline" element={<AdminTimeline />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            </DirectUrlBlocker>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;