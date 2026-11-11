import { events } from "../data/events.js";

// GET /events (İsteğe bağlı kategori filtreleme)
export function getEvents(req, res) {
  const { category } = req.query;
  const list = category
    ? events.filter((e) => e.category === category)
    : events;
  
  return res.json(list);
}

// GET /events/:id (Bulunamazsa 404 hatası)
export function getEventById(req, res) {
  const { id } = req.params;
  const event = events.find((e) => e.id === id);

  if (!event) {
    return res.status(404).json({ error: { message: "Event not found" } });
  }

  return res.json(event);
}

// POST /events (Eksik veride 400, başarılıysa 201)
export function createEvent(req, res) {
  const { title, category, capacity, date, time, location, description } = req.body ?? {};

  // Slayt 12: Zorunlu alan kontrolü
  if (!title || !category || !date) {
    return res.status(400).json({
      error: { message: "title, category and date are required" }
    });
  }

  const newEvent = {
    id: `event-${Date.now()}`, // Benzersiz ID
    title,
    category,
    date,
    capacity: Number(capacity) || 0,
    time: time ?? "",
    location: location ?? "",
    description: description ?? ""
  };

  events.push(newEvent);
  return res.status(201).json(newEvent);
}