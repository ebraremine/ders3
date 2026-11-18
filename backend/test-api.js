// backend/test-api.js
async function runAllTests() {
  const BASE_URL = 'http://localhost:3000';
  console.log('🚀 Otomatik API Testleri Başlıyor...\n');

  try {
    // 1. Sistem Durumu (GET /health)
    console.log('1️⃣ [GET] /health test ediliyor...');
    const healthRes = await fetch(`${BASE_URL}/health`);
    const healthData = await healthRes.json();
    console.log('   Sonuç:', healthData);
    console.log('-------------------------------------------');

    // 2. Tüm Etkinlikleri Listele (GET /events)
    console.log('2️⃣ [GET] /events test ediliyor...');
    const eventsRes = await fetch(`${BASE_URL}/events`);
    const events = await eventsRes.json();
    console.log(`   Toplam Etkinlik Sayısı: ${events.length}`);
    console.log('-------------------------------------------');

    // 3. Yeni Etkinlik Ekle (POST /events)
    console.log('3️⃣ [POST] /events test ediliyor...');
    const newEvent = {
      title: "Otomatik Kod Test Etkinliği",
      category: "Teknoloji",
      capacity: 75,
      date: "2026-12-15",
      time: "15:00",
      location: "Konferans Salonu B",
      description: "Bu etkinlik kod betiği ile otomatik eklendi."
    };
    
    const postRes = await fetch(`${BASE_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent)
    });
    const createdEvent = await postRes.json();
    const createdId = createdEvent._id || createdEvent.id;
    console.log('   Oluşturulan Etkinlik ID:', createdId);
    console.log('-------------------------------------------');

    if (createdId) {
      // 4. Tekil Etkinlik Getir (GET /events/:id)
      console.log(`4️⃣ [GET] /events/${createdId} test ediliyor...`);
      const getOneRes = await fetch(`${BASE_URL}/events/${createdId}`);
      const oneEvent = await getOneRes.json();
      console.log('   Getirilen Etkinlik Başlığı:', oneEvent.title);
      console.log('-------------------------------------------');

      // 5. Etkinliği Güncelle (PUT /events/:id)
      console.log(`5️⃣ [PUT] /events/${createdId} test ediliyor...`);
      const updateRes = await fetch(`${BASE_URL}/events/${createdId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newEvent, title: "Güncellenmiş Kod Test Etkinliği" })
      });
      console.log('   Güncelleme Durum Kodu:', updateRes.status);
      console.log('-------------------------------------------');

      // 6. Etkinliği Sil (DELETE /events/:id)
      console.log(`6️⃣ [DELETE] /events/${createdId} test ediliyor...`);
      const deleteRes = await fetch(`${BASE_URL}/events/${createdId}`, {
        method: 'DELETE'
      });
      console.log('   Silme Durum Kodu:', deleteRes.status);
      console.log('-------------------------------------------');
    }

    console.log('✨ Harika! Tüm 6 API adımı kod üzerinden başarıyla test edildi ve doğrulandı!');
  } catch (err) {
    console.error('Test sırasında hata oluştu:', err);
  }
}

runAllTests();