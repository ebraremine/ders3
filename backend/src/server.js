const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const eventRoutes = require('./routes/event-routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotalar
app.use('/', eventRoutes);

// MongoDB Bağlantısı ve Sunucuyu Başlatma
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/kampus";

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB Atlas veritabanına başarıyla bağlandı! 🍃");
    app.listen(PORT, () => {
      console.log(`Backend sunucusu http://localhost:${PORT} adresinde çalışıyor 🚀`);
    });
  })
  .catch((err) => {
    console.error("Veritabanı bağlantı hatası:", err);
  });