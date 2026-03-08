import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

export const useUserActions = () => {
  const queryClient = useQueryClient();

  // 1. Toggle Bookmark
  const toggleBookmark = useMutation({
    mutationFn: async (articleId: string) => {
      const response = await apiClient.post(`/bookmarks/${articleId}`);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.bookmarked) {
        toast.success("Artikel disimpan ke bookmark.");
      } else {
        toast.info("Artikel dihapus dari bookmark.");
      }
      queryClient.invalidateQueries({ queryKey: ["user-bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["article"] });
    },
    onError: () => {
      toast.error("Gagal memperbarui bookmark. Silakan login terlebih dahulu.");
    },
  });

  // 2. Submit Quiz Attempt
  const submitQuiz = useMutation({
    mutationFn: async ({ slug, score, total, timeSeconds }: { slug: string; score: number; total: number; timeSeconds: number }) => {
      const response = await apiClient.post(`/articles/${slug}/quiz-attempt`, {
        score,
        total,
        time_seconds: timeSeconds,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz-history"] });
      queryClient.invalidateQueries({ queryKey: ["user-stats"] });
    },
    onError: (error: any) => {
      console.error("Gagal menyimpan skor kuis:", error);
    },
  });

  return {
    toggleBookmark: toggleBookmark.mutateAsync,
    isTogglingBookmark: toggleBookmark.isPending,
    submitQuiz: submitQuiz.mutateAsync,
    isSubmittingQuiz: submitQuiz.isPending,
  };
};

export const useUserBookmarks = () => {
  return useQuery({
    queryKey: ["user-bookmarks"],
    queryFn: async () => {
      const response = await apiClient.get<{ data: any[] }>("/bookmarks");
      return response.data.data;
    },
    enabled: !!localStorage.getItem("token"),
  });
};

export const useUserStats = () => {
  return useQuery({
    queryKey: ["user-stats"],
    queryFn: async () => {
      const response = await apiClient.get<{ data: any }>("/progress/stats");
      return response.data.data;
    },
    enabled: !!localStorage.getItem("token"),
  });
};

export const useQuizHistory = () => {
  return useQuery({
    queryKey: ["quiz-history"],
    queryFn: async () => {
      const response = await apiClient.get<{ data: any[] }>("/quiz-attempts");
      return response.data.data;
    },
    enabled: !!localStorage.getItem("token"),
  });
};
