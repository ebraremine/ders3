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

// 1. GÜNCELLEME SAYFASI KONTROLÜ
if (isUpdatePage && form) {
  const currentEvent = events.find((e) => e.id === eventId);

  if (!eventId || !currentEvent) {
    form.style.display = "none";
    if (resultContainer) {
      resultContainer.innerHTML = `
        <div class="hata-kutusu" style="padding: 15px; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; margin-top: 20px;">
          <p><strong>Güncellenecek etkinlik seçilmedi!</strong> Lütfen önce etkinlikler sayfasından bir etkinlik seçip detayındaki "Bu etkinliği güncelle" butonuna tıklayın.</p>
          <a href="etkinlikler.html" class="btn btn-ana" style="display:inline-block; margin-top:10px; text-decoration:none;">Etkinliklere Git</a>
        </div>
      `;
    }
  } else {
    form.style.display = "block";

    const setInputValue = (key, val) => {
      const el = form.querySelector(`[name='${key}']`) || form.querySelector(`#${key}`);
      if (el) el.value = val || "";
    };

    setInputValue("title", currentEvent.title);
    setInputValue("category", currentEvent.category);
    setInputValue("date", currentEvent.date);
    setInputValue("time", currentEvent.time);
    setInputValue("location", currentEvent.location);
    setInputValue("capacity", currentEvent.capacity);
    setInputValue("description", currentEvent.description);
  }
}

// 2. FORM DOĞRULAMA VE GÖNDERİM
if (form) {
  form.setAttribute("novalidate", "true");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Temizlik
    document.querySelectorAll(".hata-mesaji").forEach((el) => el.remove());
    if (resultContainer) resultContainer.innerHTML = "";

    form.querySelectorAll("input, select, textarea").forEach((input) => {
      input.style.borderColor = "";
    });

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
        errorElem.style.fontWeight = "bold";
        errorElem.textContent = message;
        input.parentNode.insertBefore(errorElem, input.nextSibling);
      }
    }

    // Inputları Esnek Yakala (Hem id hem name destekli)
    const titleInput = form.querySelector("[name='title']") || form.querySelector("#title") || form.querySelectorAll("input")[0];
    const categoryInput = form.querySelector("[name='category']") || form.querySelector("#category") || form.querySelector("select");
    const dateInput = form.querySelector("[name='date']") || form.querySelector("#date") || form.querySelector("input[type='date']");
    const timeInput = form.querySelector("[name='time']") || form.querySelector("#time") || form.querySelector("input[type='time']");
    const locationInput = form.querySelector("[name='location']") || form.querySelector("#location") || form.querySelectorAll("input")[1];
    const capacityInput = form.querySelector("[name='capacity']") || form.querySelector("#capacity");
    const descriptionInput = form.querySelector("[name='description']") || form.querySelector("#description") || form.querySelector("textarea");

    // Zorunlu Alan Doğrulamaları
    if (!titleInput || titleInput.value.trim().length < 3) {
      showError(titleInput, "Etkinlik adı en az 3 karakter olmalı.");
    }

    if (!categoryInput || !categoryInput.value || categoryInput.value === "Seçiniz" || categoryInput.value === "") {
      showError(categoryInput, "Bir kategori seçin.");
    }

    if (!dateInput || !dateInput.value) {
      showError(dateInput, "Tarih seçin.");
    }

    if (!timeInput || !timeInput.value) {
      showError(timeInput, "Saat seçin.");
    }

    if (!locationInput || !locationInput.value.trim()) {
      showError(locationInput, "Yer bilgisini yazın.");
    }

    // Bütün alanlar geçerliyse Başarı Mesajını Bas
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