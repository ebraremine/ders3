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
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi.",
    image: "/afis.svg"
  },
  {
    id: "event-3",
    title: "Yapay Zeka ve Gelecek",
    category: "Söyleşi",
    capacity: 75,
    date: "2026-10-25",
    time: "15:30",
    location: "C Blok Amfi 1",
    description: "Üretken yapay zekanın akademideki ve iş dünyasındaki yeri.",
    image: "/afis.svg"
  },
  {
    id: "event-4",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    capacity: 30,
    date: "2026-11-01",
    time: "15:00",
    location: "Bilgisayar Laboratuvarı 1",
    description: "HTML ve CSS ile ilk kişisel sayfanı yap.",
    image: "/afis.svg"
  },
  {
    id: "event-5",
    title: "Siber Güvenlik Yarışması (CTF)",
    category: "Yarışma",
    capacity: 50,
    date: "2026-11-05",
    time: "09:00",
    location: "Mühendislik Fakültesi Lab B",
    description: "Temel bayrağı yakala (CTF) siber güvenlik mücadelesi.",
    image: "/afis.svg"
  },
  {
    id: "event-6",
    title: "Girişimcilik Paneli",
    category: "Seminer",
    capacity: 120,
    date: "2026-11-10",
    time: "13:30",
    location: "Merkezi Konferans Salonu",
    description: "Başarılı start-up kurucularından deneyim paylaşımları.",
    image: "/afis.svg"
  }
];