import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

function getStoredUser(): { role: string } | null {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}

/** Hanya tamu. Sudah login → redirect ke /. */
export function GuestRoute() {
  const hasToken = !!localStorage.getItem("token");
  const stored = getStoredUser();
  if (hasToken && stored) return <Navigate to="/" replace />;

  const { user, isLoading } = useAuth();
  if (hasToken && isLoading) return <Loading />;
  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
}

/** Wajib login. Belum login → redirect ke /. */
export function ProtectedRoute() {
  const hasToken = !!localStorage.getItem("token");
  if (!hasToken) return <Navigate to="/" replace />;

  const { user, isLoading } = useAuth();
  if (isLoading) return <Loading />;
  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
}

/** Wajib admin. Bukan admin → redirect ke /. */
export function AdminRoute() {
  const hasToken = !!localStorage.getItem("token");
  const stored = getStoredUser();

  if (!hasToken) return <Navigate to="/" replace />;
  if (stored && stored.role !== "admin") return <Navigate to="/" replace />;

  const { user, isLoading } = useAuth();
  if (isLoading) return <Loading />;
  if (!user || user.role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
}
