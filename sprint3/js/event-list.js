// js/event-list.js
import { events } from "./data.js";

// 1. Sayfadaki kapsayıcıyı (container) ve filtre elemanlarını seç
const listContainer = document.querySelector("#etkinlik-listesi");
const searchInput = document.querySelector("#arama-input"); // Sayfandaki id'ye göre kontrol et
const categorySelect = document.querySelector("#kategori-select"); // Sayfandaki id'ye göre kontrol et

// 2. Tek bir etkinlikten HTML kartı üreten fonksiyon
function createCard(event) {
  // Tarihi "12 Ekim 2026" formatına çeviriyoruz
  const formattedDate = new Date(event.date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return `
    <article class="etkinlik-karti">
      <h3>${event.title}</h3>
      <p class="kategori">${event.category}</p>
      <p class="tarih">Tarih: ${formattedDate}, ${event.time}</p>
      <p class="yer">Yer: ${event.location}</p>
      <p class="kontenjan">Kontenjan: ${event.capacity} kişi</p>
      <p class="aciklama">${event.description}</p>
        <div class="kart-linkler">
        <a href="etkinlik-detay.html?id=${event.id}" class="detay-link">Detayları gör &rarr;</a>
      </div>
    </article>
  `;
}

// 3. Ekrana kartları basan render fonksiyonu
function render(dizi) {
  if (!listContainer) return;

  if (dizi.length === 0) {
    listContainer.innerHTML = `<p class="sonuc-yok">Aramanıza uygun etkinlik bulunamadı.</p>`;
    return;
  }

  listContainer.innerHTML = dizi.map(createCard).join("");
}

// 4. Arama ve Kategori Filtreleme Mantığı
function filterEvents() {
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const selectedCategory = categorySelect ? categorySelect.value : "";

  const filtered = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === "" || selectedCategory === "Tümü" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  render(filtered);
}

// 5. Başlangıç Çalıştırması (Init)
if (listContainer) {
  // Ana sayfada data-limit="2" var mı kontrol et
  const limit = listContainer.getAttribute("data-limit");
  
  if (limit) {
    // Sadece ilk 2 etkinliği göster (index.html)
    render(events.slice(0, parseInt(limit)));
  } else {
    // Tüm etkinlikleri göster (etkinlikler.html)
    render(events);

    // Dinamik filtreleme dinleyicileri
    if (searchInput) {
      searchInput.addEventListener("input", filterEvents);
    }
    if (categorySelect) {
      categorySelect.addEventListener("change", filterEvents);
    }
  }
}