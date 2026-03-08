import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

// ─── Dashboard ─────────────────────────────────────────────────────────────

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const response = await apiClient.get<{ data: any }>("/admin/stats");
      return response.data.data;
    },
  });
};

// ─── Articles ──────────────────────────────────────────────────────────────

export const useAdminArticles = () => {
  return useQuery({
    queryKey: ["admin-articles"],
    queryFn: async () => {
      const response = await apiClient.get<{ data: any[] }>("/admin/articles");
      return response.data.data;
    },
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.post("/admin/articles", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Artikel berhasil dibuat.");
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiClient.put(`/admin/articles/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Artikel berhasil diperbarui.");
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      queryClient.invalidateQueries({ queryKey: ["article"] });
    },
  });
};

export const useUploadArticleImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const form = new FormData();
      form.append("image", file);
      const response = await apiClient.post<{ url: string }>("/admin/articles/upload-image", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.url;
    },
    onError: () => {
      toast.error("Gagal mengunggah gambar.");
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/admin/articles/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Artikel berhasil dihapus.");
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
    },
  });
};

// ─── Comments/Discussions ──────────────────────────────────────────────────

export const useAdminComments = () => {
  return useQuery({
    queryKey: ["admin-comments"],
    queryFn: async () => {
      const response = await apiClient.get<{ data: any[] }>("/admin/discussions");
      return response.data.data;
    },
  });
};

export const useApproveComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.patch(`/admin/discussions/${id}/approve`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Komentar disetujui.");
      queryClient.invalidateQueries({ queryKey: ["admin-comments"] });
      queryClient.invalidateQueries({ queryKey: ["discussions"] });
    },
  });
};

export const useRejectComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.patch(`/admin/discussions/${id}/reject`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Komentar ditolak.");
      queryClient.invalidateQueries({ queryKey: ["admin-comments"] });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/admin/discussions/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Komentar dihapus.");
      queryClient.invalidateQueries({ queryKey: ["admin-comments"] });
    },
  });
};

// ─── Quizzes ───────────────────────────────────────────────────────────────

export const useAdminQuizzes = () => {
  return useQuery({
    queryKey: ["admin-quizzes"],
    queryFn: async () => {
      const response = await apiClient.get<{ data: any[] }>("/admin/quizzes");
      return response.data.data;
    },
  });
};

export const useAdminQuizDetail = (id: string) => {
  return useQuery({
    queryKey: ["admin-quiz", id],
    queryFn: async () => {
      const response = await apiClient.get<{ data: any }>(`/admin/quizzes/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
};

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.post("/admin/quizzes", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Kuis berhasil dibuat.");
      queryClient.invalidateQueries({ queryKey: ["admin-quizzes"] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Gagal membuat kuis.";
      toast.error(message);
    },
  });
};

export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiClient.put(`/admin/quizzes/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Kuis berhasil diperbarui.");
      queryClient.invalidateQueries({ queryKey: ["admin-quizzes"] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Gagal memperbarui kuis.";
      toast.error(message);
    },
  });
};

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/admin/quizzes/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Kuis berhasil dihapus.");
      queryClient.invalidateQueries({ queryKey: ["admin-quizzes"] });
    },
  });
};

// ─── Map Locations ─────────────────────────────────────────────────────────

export const useAdminMapLocations = () => {
  return useQuery({
    queryKey: ["admin-map-locations"],
    queryFn: async () => {
      const response = await apiClient.get<{ data: any[] }>("/admin/map-locations");
      return response.data.data;
    },
  });
};

export const useCreateMapLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.post("/admin/map-locations", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Lokasi berhasil ditambahkan.");
      queryClient.invalidateQueries({ queryKey: ["admin-map-locations"] });
      queryClient.invalidateQueries({ queryKey: ["map-locations"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal menambahkan lokasi.");
    },
  });
};

export const useUpdateMapLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiClient.put(`/admin/map-locations/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Lokasi berhasil diperbarui.");
      queryClient.invalidateQueries({ queryKey: ["admin-map-locations"] });
      queryClient.invalidateQueries({ queryKey: ["map-locations"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal memperbarui lokasi.");
    },
  });
};

export const useDeleteMapLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/admin/map-locations/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Lokasi berhasil dihapus.");
      queryClient.invalidateQueries({ queryKey: ["admin-map-locations"] });
      queryClient.invalidateQueries({ queryKey: ["map-locations"] });
    },
  });
};

// ─── Settings / Profile ────────────────────────────────────────────────────

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: { current_password: string; password: string; password_confirmation: string }) => {
      const response = await apiClient.post("/auth/change-password", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password berhasil diubah.");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Gagal mengubah password.";
      toast.error(message);
    },
  });
};
