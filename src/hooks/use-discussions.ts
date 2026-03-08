import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

export interface CommentUser {
  id: string;
  name: string;
  avatar?: string;
}

export interface Discussion {
  id: string;
  article_id: string;
  user_id: string;
  parent_id: string | null;
  message: string;
  is_approved: boolean;
  created_at: string;
  user: CommentUser;
  replies: Discussion[];
}

export const useDiscussions = (slug: string) => {
  return useQuery({
    queryKey: ["discussions", slug],
    queryFn: async () => {
      const response = await apiClient.get<{ data: Discussion[] }>(`/articles/${slug}/discussions`);
      return response.data.data;
    },
    enabled: !!slug,
  });
};

export const useCreateDiscussion = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { message: string; parent_id?: string | null }) => {
      const response = await apiClient.post<{ data: Discussion; message: string }>(
        `/articles/${slug}/discussions`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Kita tidak langsung push ke cache karena butuh approval admin (is_approved: false)
      // Tapi kita beri notifikasi ke user
      toast.success(data.message || "Komentar berhasil dikirim, menunggu persetujuan admin.");
      queryClient.invalidateQueries({ queryKey: ["discussions", slug] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Gagal mengirim komentar.";
      toast.error(message);
    },
  });
};
