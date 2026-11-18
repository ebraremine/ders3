export const seedEvents = [
  {
    title: "Kampüs Kariyer Günleri",
    category: "Seminer",
    capacity: 150,
    date: "2026-12-01",
    time: "10:00",
    location: "Prof. Dr. M. Lütfü Çakmakçı Kültür Merkezi",
    description: "Sektörün öncü firmalarıyla kariyer buluşmaları ve staj imkanları."
  },
  {
    title: "React ve Node.js Atölyesi",
    category: "Atölye",
    capacity: 40,
    date: "2026-12-05",
    time: "14:00",
    location: "Bilgisayar Mühendisliği Lab 1",
    description: "Sıfırdan full-stack web geliştirme uygulamalı pratik seansı."
  },
  {
    title: "Yapay Zeka ve Gelecek Söyleşisi",
    category: "Söyleşi",
    capacity: 200,
    date: "2026-12-10",
    time: "13:30",
    location: "Mühendislik Fakültesi Konferans Salonu",
    description: "Yapay zeka teknolojilerinin mühendislik disiplinlerine etkileri."
  },
  {
    title: "Yazılım Kulübü Hackathon",
    category: "Yarışma",
    capacity: 60,
    date: "2026-12-15",
    time: "09:00",
    location: "İnovasyon Merkezi",
    description: "24 saat aralıksız sürecek kodlama ve proje geliştirme maratonu."
  },
  {
    title: "Girişimcilik ve Start-up Semineri",
    category: "Seminer",
    capacity: 100,
    date: "2026-12-20",
    time: "15:00",
    location: "İktisadi ve İdari Bilimler Konferans Salonu",
    description: "Öğrenciler için girişimcilik serüveni ve hibe destekleri."
  },
  {
    title: "Robotik Topluluğu Buluşması",
    category: "Atölye",
    capacity: 50,
    date: "2026-12-25",
    time: "11:00",
    location: "Elektrik-Elektronik Mühendisliği Atölyesi",
    description: "Otonom robot projeleri ve Arduino uygulamaları."
  }
];

import "dotenv/config";
import mongoose from "mongoose";
import { connectDatabase } from "./config/database.js";
import { Event } from "./models/event-model.js";
import { seedEvents } from "./data/seed-events.js";

async function seedDB() {
  try {
    await connectDatabase();
    await Event.deleteMany({});
    const created = await Event.insertMany(seedEvents);
    console.log(`${created.length} etkinlik eklendi`);
    await mongoose.disconnect();
  } catch (err) {
    console.error(`Seed hatası: ${err.message}`);
    process.exit(1);
  }
}

seedDB();