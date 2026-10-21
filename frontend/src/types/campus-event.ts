export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  date: string;
  time?: string;
  location: string;
  capacity: number;
  description: string;
  summary?: string;
  imageUrl?: string;
  image?: string; // <-- Hatanın çözümü için eklendi
}