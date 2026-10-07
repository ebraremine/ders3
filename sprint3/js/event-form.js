// js/event-form.js
import { events } from "./data.js";

// 1. URL parametresinden id okuma
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("id");

// 2. Sayfadaki form ve mesaj alanlarını seçme
const form = document.querySelector("form");
const isUpdatePage = window.location.pathname.includes("etkinlik-guncelle.html");

// Hata / Başarı mesaj kutuları için dinamik kapsayıcı
let resultContainer = document.querySelector("#form-sonuc");
if (!resultContainer && form) {
  resultContainer = document.createElement("div");
  resultContainer.id = "form-sonuc";
  form.parentNode.appendChild(resultContainer);
}

// --- GÜNCELLEME SAYFASI MANTIĞI (etkinlik-guncelle.html) ---
if (isUpdatePage) {
  const currentEvent = events.find((e) => e.id === eventId);

  if (!eventId || !currentEvent) {
    // ID yoksa veya geçersizse formu gizle, uyarı göster
    if (form) form.style.display = "none";
    if (resultContainer) {
      resultContainer.innerHTML = `
        <div class="hata-kutusu" style="padding: 15px; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; margin-top: 20px;">
          <p>Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
          <a href="etkinlikler.html" class="btn btn-ana" style="display:inline-block; margin-top:10px;">Etkinliklere Git</a>
        </div>
      `;
    }
  } else {
    // Formu etkinliğin mevcut verileriyle doldur
    if (form.elements["title"]) form.elements["title"].value = currentEvent.title;
    if (form.elements["category"]) form.elements["category"].value = currentEvent.category;
    if (form.elements["date"]) form.elements["date"].value = currentEvent.date;
    if (form.elements["time"]) form.elements["time"].value = currentEvent.time;
    if (form.elements["location"]) form.elements["location"].value = currentEvent.location;
    if (form.elements["capacity"]) form.elements["capacity"].value = currentEvent.capacity;
    if (form.elements["description"]) form.elements["description"].value = currentEvent.description;
  }
}

// --- FORM DOĞRULAMA VE GÖNDERME MANTIĞI (Ekle & Güncelle) ---
if (form) {
  form.addEventListener("submit", function (e) {
    // Sayfanın yenilenmesini engelle
    e.preventDefault();

    let isValid = true;
    
    // Eski hata mesajlarını ve kırmızı kenarlıkları temizle
    document.querySelectorAll(".hata-mesaji").forEach((el) => el.remove());
    Array.from(form.elements).forEach((input) => {
      input.style.borderColor = "";
    });

    // Doğrulama Yardımcı Fonksiyonu
    function showError(input, message) {
      isValid = false;
      input.style.borderColor = "red";
      const errorElem = document.createElement("small");
      errorElem.className = "hata-mesaji";
      errorElem.style.color = "red";
      errorElem.style.display = "block";
      errorElem.style.marginTop = "4px";
      errorElem.textContent = message;
      input.parentNode.insertBefore(errorElem, input.nextSibling);
    }

    // Inputları Seçme
    const titleInput = form.elements["title"] || form.querySelector("[name='title']");
    const categoryInput = form.elements["category"] || form.querySelector("[name='category']");
    const dateInput = form.elements["date"] || form.querySelector("[name='date']");
    const timeInput = form.elements["time"] || form.querySelector("[name='time']");
    const locationInput = form.elements["location"] || form.querySelector("[name='location']");
    const capacityInput = form.elements["capacity"] || form.querySelector("[name='capacity']");
    const descriptionInput = form.elements["description"] || form.querySelector("[name='description']");

    // Kontroller
    if (titleInput && titleInput.value.trim().length < 3) {
      showError(titleInput, "Etkinlik adı en az 3 karakter olmalıdır.");
    }

    if (categoryInput && (!categoryInput.value || categoryInput.value === "Seçiniz")) {
      showError(categoryInput, "Bir kategori seçin.");
    }

    if (dateInput && !dateInput.value) {
      showError(dateInput, "Tarih seçin.");
    }

    if (timeInput && !timeInput.value) {
      showError(timeInput, "Saat seçin.");
    }

    if (locationInput && !locationInput.value.trim()) {
      showError(locationInput, "Yer bilgisini yazın.");
    }

    // Form Başarılıysa
    if (isValid) {
      const formData = {
        id: isUpdatePage ? eventId : `event-${events.length + 1}`,
        title: titleInput ? titleInput.value.trim() : "",
        category: categoryInput ? categoryInput.value : "",
        date: dateInput ? dateInput.value : "",
        time: timeInput ? timeInput.value : "",
        location: locationInput ? locationInput.value.trim() : "",
        capacity: capacityInput && capacityInput.value ? Number(capacityInput.value) : null,
        description: descriptionInput ? descriptionInput.value.trim() : ""
      };

      // Başarı kutusu ve JSON çıktısı gösterimi
      resultContainer.innerHTML = `
        <div class="basari-kutusu" style="padding: 15px; color: #155724; background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px; margin-top: 20px;">
          <p><strong>${isUpdatePage ? "Etkinlik güncellendi" : "Etkinlik oluşturuldu"} (bu sprintte kaydedilmez):</strong></p>
          <pre style="background: #ffffff; padding: 10px; border-radius: 4px; overflow-x: auto;">${JSON.stringify(formData, null, 2)}</pre>
        </div>
      `;
    }
  });
}