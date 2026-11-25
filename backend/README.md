# Kampüs Etkinlikleri REST API (Sprint 7)

**Öğrenci Numarası:** 2311012011

## API Endpoints

### 1. Health Check
* **GET** `/health`
* **Yanıt (200 OK):**
```json
{
  "status": "OK",
  "student": "2311012011"
}
## Sprint 9 — Kampüs API Geliştirmeleri

* **Tarih Biçimi (`GG-AA-YYYY`):** Mongoose şemasında özel `set` ve `get` fonksiyonları ile `GG-AA-YYYY` tarih ayrıştırma ve biçimlendirme desteği.
* **Rota Sıralaması:** `GET /events/upcoming` rotası, dinamik `GET /events/:id` rotasından önce tanımlanarak çakışma önlendi.
* **Kısmi Güncelleme (`PATCH /events/:id`):** Yalnızca gönderilen alanları günceller; boş gövde ve `_id`, `createdAt`, `updatedAt`, `__v` gibi korumalı alanları `400` ile reddeder; `returnDocument: "after"` ve `runValidators: true` ile çalışır.
* **Silme (`DELETE /events/:id`):** Başarılı silmede boş gövdeyle `204 No Content`, bulunamayan veya geçersiz ID'de `404` döner.
* **Filtreleme ve Arama (`GET /events?category=...&search=...`):** Kategori filtresi ve büyük/küçük harf duyarsız (`$options: "i"`) başlık araması eklendi.
* **Yaklaşan Etkinlikler (`GET /events/upcoming`):** `todayStart()` ile bugünden itibaren (`$gte`) etkinlikleri getirir ve `{ date: 1, time: 1 }` sıralamasıyla listeler.
* **API Testleri:** Postman koleksiyon testi tamamlandı ve sonuçlar `backend/requests/run-results.json` dosyasına kaydedildi.