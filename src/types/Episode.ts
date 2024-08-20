import { IShow } from "./Show";

export type IEpisode = {
  id: string;
  name: string;
  slug: string;
  episode_image: string;
  episode_compressed_image: string;
  file: string;
  description: string;
  duration: number;
  episode_type: "Full" | "Trailer" | "Bonus"; // Adjust based on possible values
  episode_number: number;
  episode_format: "AUDIO" | "VIDEO" | "OTHER"; // Adjust based on possible values
  created_at: string;
  publish_date: string;
  is_liked: boolean;
  shows: IShow[];
};
