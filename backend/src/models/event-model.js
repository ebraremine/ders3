const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  capacity: { type: Number, default: 100 },
  date: { type: String, required: true },
  time: { type: String, default: "14:00" },
  location: { type: String, required: true },
  description: { type: String },
  image: { type: String, default: "/afis.svg" }
});

// Doğru dışa aktarma (export) biçimi budur:
module.exports = mongoose.model('Event', eventSchema);