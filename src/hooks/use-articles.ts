import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export interface Article {
  id: string;
  slug: string;
  title: string;
  year: string;
  summary: string;
  hero_image: string;
  view_count: number;
  created_at: string;
  era: {
    id: string;
    name: string;
    slug: string;
    color_hue: string;
  };
}

export const useArticles = (params?: { era?: string; search?: string }) => {
  return useQuery({
    queryKey: ["articles", params],
    queryFn: async () => {
      const response = await apiClient.get<{ data: Article[] }>("/articles", {
        params,
      });
      return response.data.data;
    },
  });
};

export const useArticleDetail = (slug: string) => {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const response = await apiClient.get<{ data: any }>(`/articles/${slug}`);
      return response.data.data;
    },
    enabled: !!slug,
  });
};

export const useEras = () => {
  return useQuery({
    queryKey: ["eras"],
    queryFn: async () => {
      const response = await apiClient.get<{ data: any[] }>("/eras");
      return response.data.data;
    },
  });
};
