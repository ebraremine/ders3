// js/event-detail.js
import { events } from "./data.js";

const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("id");

const headerTitle = document.querySelector(".yesil-header h1") || document.querySelector("h1");
const kunyeListesi = document.querySelector(".kunye-listesi");
const mainArticle = document.querySelector("main article") || document.querySelector("main");

const currentEvent = events.find((e) => e.id === eventId);

if (currentEvent) {
  // Sayfa başlığını güncelle
  document.title = `Etkinlik Detayı - ${currentEvent.title}`;
  if (headerTitle) headerTitle.textContent = currentEvent.title;

  // Tarih formatlama
  const formattedDate = new Date(currentEvent.date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // Künye bilgilerini doldur
  if (kunyeListesi) {
    kunyeListesi.innerHTML = `
      <dt><strong>Tarih & Saat:</strong></dt>
      <dd>${formattedDate}, ${currentEvent.time}</dd>
      <dt><strong>Yer:</strong></dt>
      <dd>${currentEvent.location}</dd>
      <dt><strong>Kategori:</strong></dt>
      <dd>${currentEvent.category}</dd>
      <dt><strong>Kontenjan:</strong></dt>
      <dd>${currentEvent.capacity} kişi</dd>
    `;
  }

  // Eski eklenmiş alan varsa temizle
  const oldActionArea = document.querySelector(".detay-aciklama-alani");
  if (oldActionArea) oldActionArea.remove();

  // Açıklama ve Buton alanını tek bir yerde oluştur
  const actionArea = document.createElement("div");
  actionArea.className = "detay-aciklama-alani";
  actionArea.style.marginTop = "20px";

  actionArea.innerHTML = `
    <h3>Açıklama</h3>
    <p style="margin-bottom: 20px;">${currentEvent.description}</p>
    <div class="buton-grubu" style="display: flex; gap: 15px; align-items: center;">
      <a href="etkinlikler.html" class="btn btn-sec" style="text-decoration: none;">← Listeye dön</a>
      <a href="etkinlik-guncelle.html?id=${currentEvent.id}" class="btn btn-ana" style="padding: 10px 15px; background-color: #2e7d32; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">Bu etkinliği güncelle</a>
    </div>
  `;

  if (mainArticle) {
    mainArticle.appendChild(actionArea);
  }
} else {
  if (mainArticle) {
    mainArticle.innerHTML = `
      <div class="hata-kutusu" style="padding: 20px; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; margin: 20px 0;">
        <h2>Etkinlik Bulunamadı</h2>
        <p>Geçersiz bir etkinlik bağlantısı kullandınız.</p>
        <a href="etkinlikler.html" class="btn btn-ana">Tüm Etkinliklere Dön</a>
      </div>
    `;
  }
}