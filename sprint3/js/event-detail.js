// js/event-detail.js
import { events } from "./data.js";

// 1. URL'den ?id= parametresini yakala
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("id");

// 2. Sayfadaki HTML elemanlarını seç
const headerTitle = document.querySelector(".yesil-header h1");
const afişImg = document.querySelector(".afis-alani img");
const kunyeListesi = document.querySelector(".kunye-listesi");
const aciklamaMetni = document.querySelector(".iceri-alani .aciklama, main article p"); // HTML yapına göre
const icerikAlani = document.querySelector("main.icerik-alani") || document.querySelector("main");

// 3. İlgili etkinliği bul
const currentEvent = events.find((e) => e.id === eventId);

if (currentEvent) {
  // A. Sayfa Başlığı ve Header
  document.title = `Etkinlik Detayı - ${currentEvent.title}`;
  if (headerTitle) headerTitle.textContent = currentEvent.title;

  // B. Tarih Formatlama
  const formattedDate = new Date(currentEvent.date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // C. Künye Bilgilerini Doldur
  if (kunyeListesi) {
    kunyeListesi.innerHTML = `
      <dt>Tarih & Saat:</dt>
      <dd>${formattedDate}, ${currentEvent.time}</dd>
      <dt>Yer:</dt>
      <dd>${currentEvent.location}</dd>
      <dt>Kategori:</dt>
      <dd>${currentEvent.category}</dd>
      <dt>Kontenjan:</dt>
      <dd>${currentEvent.capacity} kişi</dd>
    `;
  }

  // D. Detay İçerik ve Butonlar
  const detailContainer = document.querySelector(".detay-kapsayici");
  if (detailContainer) {
    // Mevcut açıklama/buton alanını güncelle veya oluştur
    let actionArea = document.querySelector(".detay-butonlar");
    if (!actionArea) {
      actionArea = document.createElement("div");
      actionArea.className = "detay-butonlar";
      detailContainer.appendChild(actionArea);
    }

    actionArea.innerHTML = `
      <h3>Açıklama</h3>
      <p>${currentEvent.description}</p>
      <div class="buton-grubu">
        <a href="etkinlikler.html" class="btn btn-sec">← Listeye dön</a>
        <a href="etkinlik-guncelle.html?id=${currentEvent.id}" class="btn btn-ana">Bu etkinliği güncelle</a>
      </div>
    `;
  }
} else {
  // 4. Geçersiz ID veya ID olmaması durumu
  if (icerikAlani) {
    icerikAlani.innerHTML = `
      <div class="hata-kutusu" style="padding: 20px; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; margin: 20px;">
        <h2>Etkinlik Bulunamadı</h2>
        <p>Aradığınız etkinlik mevcut değil veya geçersiz bir bağlantı kullandınız.</p>
        <a href="etkinlikler.html" class="btn btn-ana">Tüm Etkinliklere Dön</a>
      </div>
    `;
  }
}