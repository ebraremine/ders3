import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import {
  searchEvents,
  filterByCategory,
  findEventById,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  // Sayfa veya seçili etkinlik değiştiğinde sekme başlığını güncelleme (useEffect)
  useEffect(() => {
    const selectedEvent = selectedId ? findEventById(events, selectedId) : undefined;
    if (page === "detail" && selectedEvent) {
      document.title = `${selectedEvent.title} - Kampüs Etkinlikleri`;
    } else {
      document.title = "Kampüs Etkinlikleri";
    }
  }, [page, selectedId]);

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  // Tarihe göre sıralayıp ilk 2 yaklaşan etkinliği alma
  const upcomingEvents = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  // Filtrelenmiş etkinlik listesi
  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    selectedCategory
  );

  // Ortak Kart Bileşeni Render Fonksiyonu
  function renderCard(event: CampusEvent) {
    return (
      <article className="etkinlik-karti" key={event.id}>
        <h3>{event.title}</h3>
        <p><strong>Kategori:</strong> {event.category}</p>
        <p><strong>Tarih:</strong> <time dateTime={event.date}>{event.date}</time>, {event.time}</p>
        <p><strong>Yer:</strong> {event.location}</p>
        <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
        <p>{event.description}</p>
        <button
          className="detay-link"
          onClick={() => go("detail", event.id)}
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
        >
          Detayları gör &rarr;
        </button>
      </article>
    );
  }

  const selectedEvent = selectedId ? findEventById(events, selectedId) : undefined;

  return (
    <>
      <header className="yesil-header">
        <h1>Kampüs Etkinlikleri</h1>
        <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
        <nav>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); go("home"); }}
            aria-current={page === "home" ? "page" : undefined}
          >
            Ana Sayfa
          </a>{" "}
          |{" "}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); go("events"); }}
            aria-current={page === "events" ? "page" : undefined}
          >
            Etkinlikler
          </a>{" "}
          |{" "}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); go("add"); }}
            aria-current={page === "add" ? "page" : undefined}
          >
            Ekle
          </a>
        </nav>
      </header>

      <main className="icerik-alani">
        {/* ANA SAYFA */}
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <div className="ana-sayfa-grid">
              {upcomingEvents.map(renderCard)}
            </div>
            <br />
            <button
              className="btn-yesil"
              onClick={() => go("events")}
            >
              Tüm etkinlikleri gör
            </button>
          </section>
        )}

        {/* TÜM ETKİNLİKLER SAYFASI */}
        {page === "events" && (
          <section>
            <h2>Tüm Etkinlikler</h2>
            <p>Ekim ayında kampüste düzenlenen etkinlikler.</p>
            
            <div style={{ display: "flex", gap: "15px", marginBottom: "20px", flexWrap: "wrap" }}>
              <div>
                <label htmlFor="search"><strong>Etkinlik ara</strong></label><br />
                <input
                  id="search"
                  type="search"
                  placeholder="Örn: atölye, kariyer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="category"><strong>Kategori</strong></label><br />
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
              </div>
            </div>

            <p>
              {filteredEvents.length === 0
                ? "Aranan kriterlere uygun etkinlik bulunamadı."
                : `${filteredEvents.length} etkinlik listeleniyor.`}
            </p>

            <div className="etkinlik-grid">
              {filteredEvents.map(renderCard)}
            </div>
          </section>
        )}

        {/* DETAY SAYFASI */}
        {page === "detail" && (
          <section>
            {!selectedEvent ? (
              <div>
                <h2>Etkinlik Bulunamadı</h2>
                <button className="btn-yesil" onClick={() => go("events")}>
                  Listeye dön
                </button>
              </div>
            ) : (
              <article>
                <h2>{selectedEvent.title}</h2>
                <div className="detay-kapsayici">
                  {selectedEvent.image && (
                    <figure className="afis-alani">
                      <img
                        src={selectedEvent.image}
                        alt={`${selectedEvent.title} afişi`}
                        className="afis-resmi"
                      />
                      <figcaption>{selectedEvent.title} afişi</figcaption>
                    </figure>
                  )}

                  <section className="kunye-alani">
                    <h3>Etkinlik Künyesi</h3>
                    <dl className="kunye-listesi">
                      <dt>Tarih:</dt>
                      <dd>{selectedEvent.date}, {selectedEvent.time}</dd>

                      <dt>Yer:</dt>
                      <dd>{selectedEvent.location}</dd>

                      <dt>Kategori:</dt>
                      <dd>{selectedEvent.category}</dd>

                      <dt>Kontenjan:</dt>
                      <dd>{selectedEvent.capacity} kişi</dd>
                    </dl>
                  </section>
                </div>

                <section>
                  <h3>Açıklama</h3>
                  <p>{selectedEvent.description}</p>
                </section>

                <br />
                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="btn-yesil" onClick={() => go("events")}>
                    &larr; Listeye dön
                  </button>
                  <button className="btn-yesil" onClick={() => go("update", selectedEvent.id)}>
                    Bu etkinliği güncelle
                  </button>
                </div>
              </article>
            )}
          </section>
        )}

        {/* FORM SAYFALARI (EKLE VE GÜNCELLE) */}
        {(page === "add" || page === "update") && (
          <section>
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <p>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>

            <form className="etkinlik-formu" onSubmit={(e) => e.preventDefault()}>
              <div className="form-grup">
                <label htmlFor="title">Etkinlik Adı</label>
                <input
                  id="title"
                  type="text"
                  placeholder="Örn: Kariyer Günleri 2026"
                  maxLength={80}
                  defaultValue={page === "update" && selectedEvent ? selectedEvent.title : ""}
                />
              </div>

              <div className="form-grup">
                <label htmlFor="cat">Kategori</label>
                <select id="cat" defaultValue={page === "update" && selectedEvent ? selectedEvent.category : ""}>
                  <option value="">Seçiniz</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
              </div>

              <div className="form-grup">
                <label htmlFor="date">Tarih</label>
                <input
                  id="date"
                  type="date"
                  defaultValue={page === "update" && selectedEvent ? selectedEvent.date : ""}
                />
              </div>

              <div className="form-grup">
                <label htmlFor="time">Saat</label>
                <input
                  id="time"
                  type="time"
                  defaultValue={page === "update" && selectedEvent ? selectedEvent.time : ""}
                />
              </div>

              <div className="form-grup">
                <label htmlFor="loc">Yer</label>
                <input
                  id="loc"
                  type="text"
                  placeholder="Örn: A Blok Konferans Salonu"
                  defaultValue={page === "update" && selectedEvent ? selectedEvent.location : ""}
                />
              </div>

              <div className="form-grup">
                <label htmlFor="cap">Kontenjan</label>
                <input
                  id="cap"
                  type="number"
                  defaultValue={page === "update" && selectedEvent ? selectedEvent.capacity : ""}
                />
              </div>

              <div className="form-grup">
                <label htmlFor="desc">Açıklama</label>
                <textarea
                  id="desc"
                  rows={4}
                  defaultValue={page === "update" && selectedEvent ? selectedEvent.description : ""}
                />
              </div>

              <button type="submit" className="btn-yesil">
                {page === "add" ? "Kaydet" : "Güncelle"}
              </button>
            </form>
          </section>
        )}
      </main>

      <footer className="icerik-alani">
        <hr />
        <p>&copy; 2026 Kampüs Etkinlikleri - Tüm hakları saklıdır.</p>
      </footer>
    </>
  );
}

export default App;