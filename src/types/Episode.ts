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
  episode_number: number;
  created_at: string;
  publish_date: string;
  is_liked: boolean;
  shows: IShow[];
};
