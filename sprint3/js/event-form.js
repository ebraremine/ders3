// js/event-form.js
import { events } from "./data.js";

const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("id");

const form = document.querySelector("form");
const isUpdatePage = window.location.pathname.includes("etkinlik-guncelle.html");

let resultContainer = document.querySelector("#form-sonuc");
if (!resultContainer && form) {
  resultContainer = document.createElement("div");
  resultContainer.id = "form-sonuc";
  form.parentNode.appendChild(resultContainer);
}

// 1. GÜNCELLEME SAYFASINDA FORMU DOLDURMA
if (isUpdatePage && form) {
  const currentEvent = events.find((e) => e.id === eventId);

  if (!eventId || !currentEvent) {
    form.style.display = "none";
    if (resultContainer) {
      resultContainer.innerHTML = `
        <div style="padding:15px; color:#721c24; background:#f8d7da; border:1px solid #f5c6cb; border-radius:4px; margin-top:20px;">
          <p>Güncellenecek etkinlik bulunamadı. Lütfen listeden bir etkinlik seçip gelin.</p>
          <a href="etkinlikler.html" class="btn btn-ana">Etkinliklere Git</a>
        </div>`;
    }
  } else {
    form.style.display = "block";
    const inputs = form.querySelectorAll("input, select, textarea");
    
    // Form alanlarını sırayla veya isme göre doldur
    const setVal = (key, val) => {
      const el = form.querySelector(`[name='${key}']`) || form.querySelector(`#${key}`);
      if (el) el.value = val || "";
    };

    setVal("title", currentEvent.title);
    setVal("category", currentEvent.category);
    setVal("date", currentEvent.date);
    setVal("time", currentEvent.time);
    setVal("location", currentEvent.location);
    setVal("capacity", currentEvent.capacity);
    setVal("description", currentEvent.description);

    // Eğer name/id ile eşleşmediyse sırasıyla doldur (Yedek Plan)
    if (inputs[0] && !inputs[0].value) inputs[0].value = currentEvent.title || "";
    if (inputs[1] && !inputs[1].value) inputs[1].value = currentEvent.category || "";
    if (inputs[2] && !inputs[2].value) inputs[2].value = currentEvent.date || "";
  }
}

// 2. FORM GÖNDERİMİ VE BAŞARI MESAJI
if (form) {
  form.setAttribute("novalidate", "true");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Hata ve eski sonuçları temizle
    document.querySelectorAll(".hata-mesaji").forEach((el) => el.remove());
    if (resultContainer) resultContainer.innerHTML = "";

    const inputs = Array.from(form.querySelectorAll("input, select, textarea"));
    inputs.forEach((input) => (input.style.borderColor = ""));

    let isValid = true;

    function showError(input, message) {
      isValid = false;
      if (input) {
        input.style.borderColor = "red";
        const errorElem = document.createElement("small");
        errorElem.className = "hata-mesaji";
        errorElem.style.color = "red";
        errorElem.style.display = "block";
        errorElem.style.marginTop = "4px";
        errorElem.textContent = message;
        input.parentNode.insertBefore(errorElem, input.nextSibling);
      }
    }

    // Inputları hem isme hem sıraya göre güvenli yakala
    const titleInput = form.querySelector("[name='title'], #title") || inputs[0];
    const categoryInput = form.querySelector("[name='category'], #category") || form.querySelector("select");
    const dateInput = form.querySelector("[name='date'], #date") || form.querySelector("input[type='date']");
    const locationInput = form.querySelector("[name='location'], #location") || inputs[3];

    if (!titleInput || titleInput.value.trim().length < 3) {
      showError(titleInput, "Etkinlik adı en az 3 karakter olmalı.");
    }
    if (!categoryInput || !categoryInput.value || categoryInput.value === "Seçiniz") {
      showError(categoryInput, "Bir kategori seçin.");
    }
    if (!dateInput || !dateInput.value) {
      showError(dateInput, "Tarih seçin.");
    }

    // HATA YOKSA BAŞARI MESAJINI BAS
    if (isValid) {
      const formData = {
        id: eventId || `event-${events.length + 1}`,
        title: titleInput ? titleInput.value.trim() : "",
        category: categoryInput ? categoryInput.value : "",
        date: dateInput ? dateInput.value : "",
        location: locationInput ? locationInput.value.trim() : ""
      };

      const titleText = isUpdatePage ? "Etkinlik güncellendi" : "Etkinlik oluşturuldu";

      resultContainer.innerHTML = `
        <div class="basari-kutusu" style="padding: 15px; color: #2e7d32; background-color: #e8f5e9; border: 1px solid #c8e6c9; border-radius: 6px; margin-top: 20px;">
          <p style="margin: 0 0 10px 0; font-size: 14px;"><strong>${titleText} (bu sprintte kaydedilmez):</strong></p>
          <pre style="background: #ffffff; padding: 10px; border-radius: 4px; border: 1px solid #e0e0e0; font-family: monospace; font-size: 13px; margin: 0; white-space: pre-wrap;">${JSON.stringify(formData, null, 2)}</pre>
        </div>
      `;
    }
  });
}