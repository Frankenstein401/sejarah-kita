import { Navigate, Outlet, useNavigationType } from "react-router-dom";
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

/**
 * Hanya tamu yang datang via klik tombol (PUSH).
 * Direct URL (POP) → redirect ke /.
 * Sudah login → redirect ke /.
 */
export function GuestRoute() {
  const navType = useNavigationType();
  const hasToken = !!localStorage.getItem("token");
  const stored = getStoredUser();

  // Direct URL / reload → blokir
  if (navType === "POP") return <Navigate to="/" replace />;

  // Sudah login → redirect ke home
  if (hasToken && stored) return <Navigate to="/" replace />;

  const { user, isLoading } = useAuth();
  if (hasToken && isLoading) return <Loading />;
  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
}

/** Wajib login. Kalau belum login → redirect ke /. */
export function ProtectedRoute() {
  const hasToken = !!localStorage.getItem("token");
  if (!hasToken) return <Navigate to="/" replace />;

  const { user, isLoading } = useAuth();
  if (isLoading) return <Loading />;
  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
}

/** Wajib admin. Kalau bukan admin → redirect ke /. */
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
