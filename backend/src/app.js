import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json()); // POST ile gelen JSON verilerini okumak için gerekli

// Hocanın istediği öğrenci numaralı kontrol noktası
app.get("/health", (req, res) => {
  return res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2311012011"
  });
});

// Yollarımızı uygulamaya bağlıyoruz
app.use("/events", eventRoutes);

// Tanımsız bir adrese gidilirse 404 hatası döndür
app.use((req, res) => {
  return res.status(404).json({ error: { message: "Route not found" } });
});

export default app;