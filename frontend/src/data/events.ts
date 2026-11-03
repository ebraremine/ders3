import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    capacity: 100,
    date: "2026-10-12",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla kariyer söyleşileri ve şirket standları.",
    image: "/afis.svg"
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    capacity: 20,
    date: "2026-10-20",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı 2",
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi."
  },
  {
    id: "event-3",
    title: "Yapay Zeka ve Gelecek",
    category: "Söyleşi",
    capacity: 80,
    date: "2026-10-25",
    time: "13:30",
    location: "Amfi 1",
    description: "Üretken yapay zeka teknolojileri üzerine söyleşi."
  },
  {
    id: "event-4",
    title: "Hackathon 2026",
    category: "Yarışma",
    capacity: 50,
    date: "2026-10-28",
    time: "09:00",
    location: "Merkez Kütüphane",
    description: "24 saatlik yazılım geliştirme maratonu."
  },
  {
    id: "event-5",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    capacity: 30,
    date: "2026-11-01",
    time: "15:00",
    location: "Bilgisayar Laboratuvarı 1",
    description: "HTML ve CSS ile ilk kişisel sayfam yap."
  },
  {
    id: "event-6",
    title: "Girişimcilik 101",
    category: "Seminer",
    capacity: 60,
    date: "2026-11-05",
    time: "11:00",
    location: "A Blok Konferans Salonu",
    description: "Fikirden ürüne startup yolculuğu."
  }
];