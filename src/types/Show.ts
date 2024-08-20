type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

export type IShow = {
  id: string;
  name: string;
  slug: string;
  show_image: string;
  show_compressed_image: string;
  trailer: string | null;
  intro: string | null;
  show_format: "AUDIO" | "VIDEO" | "OTHER"; // Adjust based on possible values
  description: string;
  categories: Category[];
  created_at: string;
};
