export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  date: string;
  time?: string; // <-- Hatanın çözümü için zaman alanını opsiyonel ekledik
  location: string;
  capacity: number;
  description: string;
  summary?: string;
  imageUrl?: string;
}