const Event = require('../models/event-model');

// 1. Sistem Durumu ve Öğrenci Numarası (GET /health)
exports.getHealth = (req, res) => {
  res.json({
    status: "OK",
    studentId: "2311012011",
    message: "Kampüs Etkinlikleri Backend API aktif çalışıyor 🚀"
  });
};

// 2. Tüm Etkinlikleri Listele (GET /events)
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Etkinlikler getirilirken hata oluştu: " + err.message });
  }
};

// 3. Tekil Etkinlik Getir (GET /events/:id)
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Aranan ID'ye sahip etkinlik bulunamadı." });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Etkinlik detayı getirilirken hata oluştu: " + err.message });
  }
};

// 4. Yeni Etkinlik Ekle (POST /events)
exports.createEvent = async (req, res) => {
  try {
    const newEvent = new Event({
      title: req.body.title,
      category: req.body.category,
      capacity: Number(req.body.capacity) || 100,
      date: req.body.date,
      time: req.body.time || "14:00",
      location: req.body.location,
      description: req.body.description,
      image: req.body.image || "/afis.svg"
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ error: "Etkinlik eklenirken hata oluştu: " + err.message });
  }
};

// 5. Etkinlik Güncelle (PUT /events/:id)
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        category: req.body.category,
        capacity: Number(req.body.capacity) || 100,
        date: req.body.date,
        time: req.body.time || "14:00",
        location: req.body.location,
        description: req.body.description,
        image: req.body.image || "/afis.svg"
      },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Güncellenecek etkinlik bulunamadı." });
    }

    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ error: "Etkinlik güncellenirken hata oluştu: " + err.message });
  }
};

// 6. Etkinlik Sil (DELETE /events/:id)
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Silinecek etkinlik bulunamadı." });
    }
    res.json({ message: "Etkinlik başarıyla silindi", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: "Etkinlik silinirken hata oluştu: " + err.message });
  }
};