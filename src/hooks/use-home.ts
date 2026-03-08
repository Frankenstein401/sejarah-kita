import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  era: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  article_slug?: string;
  era: {
    name: string;
    slug: string;
    color_hue: string;
  };
}

export interface MapLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  year: string;
  description: string;
  article_slug?: string;
  era: {
    slug: string;
    color_hue: string;
  };
}

export const useTopics = () => {
  return useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      const response = await apiClient.get<{ data: Topic[] }>("/topics");
      return response.data.data;
    },
  });
};

export const useTimeline = () => {
  return useQuery({
    queryKey: ["timeline"],
    queryFn: async () => {
      const response = await apiClient.get<{ data: TimelineEvent[] }>("/timeline");
      return response.data.data;
    },
  });
};

export const useMapLocations = () => {
  return useQuery({
    queryKey: ["map-locations"],
    queryFn: async () => {
      const response = await apiClient.get<{ data: MapLocation[] }>("/map-locations");
      return response.data.data;
    },
  });
};

export const usePublicStats = () => {
  return useQuery({
    queryKey: ["public-stats"],
    queryFn: async () => {
      const response = await apiClient.get<{ data: any }>("/stats");
      return response.data.data;
    },
  });
};

export const useRandomFunFact = () => {
  return useQuery({
    queryKey: ["fun-fact-random"],
    queryFn: async () => {
      const response = await apiClient.get<{ data: any }>("/fun-facts/random");
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });
};
