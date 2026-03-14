import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

/** Baca user dari localStorage secara sinkron (tanpa nunggu API). */
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

/** Hanya untuk tamu. Kalau sudah login → redirect ke home. */
export function GuestRoute() {
  const stored = getStoredUser();
  const hasToken = !!localStorage.getItem("token");

  // Cek sinkron dulu — kalau ada token + user di localStorage, langsung redirect
  if (hasToken && stored) return <Navigate to="/" replace />;

  // Kalau token ada tapi user belum ada (misal refresh), tunggu API
  const { user, isLoading } = useAuth();
  if (hasToken && isLoading) return <Loading />;
  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
}

/** Wajib login. Kalau belum login → redirect ke /login. */
export function ProtectedRoute() {
  const hasToken = !!localStorage.getItem("token");

  // Tidak ada token sama sekali → langsung redirect
  if (!hasToken) return <Navigate to="/login" replace />;

  const { user, isLoading } = useAuth();
  if (isLoading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}

/** Wajib admin. Kalau bukan admin → redirect ke home. */
export function AdminRoute() {
  const stored = getStoredUser();
  const hasToken = !!localStorage.getItem("token");

  // Cek sinkron: tidak ada token atau role bukan admin → langsung blokir
  if (!hasToken) return <Navigate to="/" replace />;
  if (stored && stored.role !== "admin") return <Navigate to="/" replace />;

  // Tunggu konfirmasi dari API
  const { user, isLoading } = useAuth();
  if (isLoading) return <Loading />;
  if (!user || user.role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
}
