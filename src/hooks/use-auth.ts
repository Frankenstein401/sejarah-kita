import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status?: 'pelajar' | 'guru' | 'umum';
  education?: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export const useAuth = () => {
  const queryClient = useQueryClient();

  // Get current user
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) return null;
      try {
        const response = await apiClient.get<{ data: User }>("/auth/me");
        return response.data.data;
      } catch (error) {
        localStorage.removeItem("token");
        return null;
      }
    },
    retry: false,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: any) => {
      const response = await apiClient.post<AuthResponse>("/auth/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token);
      queryClient.setQueryData(["auth-user"], data.user);
      toast.success(`Selamat datang kembali, ${data.user.name}!`);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Login gagal. Periksa email dan password.";
      toast.error(message);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (userData: any) => {
      const response = await apiClient.post<AuthResponse>("/auth/register", userData);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token);
      queryClient.setQueryData(["auth-user"], data.user);
      toast.success("Akun berhasil dibuat! Selamat menjelajah.");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Pendaftaran gagal.";
      toast.error(message);
    },
  });

  // Logout mutation
  const logout = () => {
    localStorage.removeItem("token");
    queryClient.setQueryData(["auth-user"], null);
    apiClient.post("/auth/logout").catch(() => {}); // Fire and forget
    toast.info("Berhasil keluar.");
  };

  return {
    user,
    isLoading,
    isError,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    logout,
    isAuthenticated: !!user,
  };
};


export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.delete("/auth/account");
      return response.data;
    },
    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.clear();
      toast.success("Akun berhasil dihapus.");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Gagal menghapus akun.";
      toast.error(message);
    },
  });
};
