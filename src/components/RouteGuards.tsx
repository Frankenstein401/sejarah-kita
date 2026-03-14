import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}

/** Hanya untuk tamu (belum login). Kalau sudah login → redirect ke home. */
export function GuestRoute() {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Loading />;
  if (user) return <Navigate to="/" replace />;
  return <Outlet />;
}

/** Wajib login. Kalau belum login → redirect ke /login. */
export function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

/** Wajib admin. Kalau bukan admin → redirect ke home. */
export function AdminRoute() {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Loading />;
  if (!user || user.role !== "admin") return <Navigate to="/" replace />;
  return <Outlet />;
}
