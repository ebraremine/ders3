import dotenv from "dotenv";
dotenv.config();

import { connectDatabase } from "./config/database.js";
import * as EventModule from "./models/event-model.js";
import * as EventsDataModule from "./data/events.js";

const Event = EventModule.default || EventModule.Event;
const eventsData = EventsDataModule.default || EventsDataModule.initialEvents || EventsDataModule.events;

async function seed() {
  try {
    await connectDatabase();
    await Event.deleteMany({});
    
    const inserted = await Event.insertMany(eventsData);
    console.log(`BAŞARILI: ${inserted.length} etkinlik eklendi!`);
    process.exit(0);
  } catch (error) {
    console.error("Seed hatası:", error.message);
    process.exit(1);
  }
}

seed();