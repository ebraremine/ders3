import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import Header from "./components/layout/Header";
import EventForm from "./components/forms/EventForm";

import EventCard from "./components/events/EventCard";
import EventDetail from "./components/events/EventDetail";
import Navigation from "./components/layout/Navigation";
import EventFilter from "./components/events/EventFilter";
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
    selectedCategory)

{upcomingEvents.map((ev) => (
  <EventCard key={ev.id} event={ev} onShowDetail={(id) => go("detail", id)} />
))}

  const selectedEvent = selectedId ? findEventById(events, selectedId) : undefined;

  return (
    <>
        <Header title="Kampüs Etkinlikleri" text="Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." />
<Navigation current={page} onNavigate={go} />
      <main className="icerik-alani">
        {/* ANA SAYFA */}
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList
              events={upcomingEvents}
              onShowDetail={(id) => go("detail", id)}
            />
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

          <EventFilter
            searchText={searchText}
            category={selectedCategory}
            categories={["Seminer", "Atölye", "Söyleşi", "Yarışma"]}
            onSearchChange={setSearchText}
            onCategoryChange={(cat) => setSelectedCategory(cat as any)}
          />

          <EventList
            events={filteredEvents}
            onShowDetail={(id) => go("detail", id)}
            emptyText="Aranan kriterlere uygun etkinlik bulunamadı."
          />
        </section>
      )}
          {/* DETAY SAYFASI */}
      {page === "detail" && selectedEvent && (
        <section>
          <EventDetail
            event={selectedEvent}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        </section>
      )}



        {/* EKLEME SAYFASI */}
      {page === "add" && (
        <section>
          <h2>Yeni Etkinlik Ekle</h2>
          <EventForm
            onSubmit={(formData) => {
              const newEvent: CampusEvent = {
                ...formData,
                id: String(Date.now()), // Rastgele benzersiz bir ID oluşturuyoruz
              };
              events.push(newEvent); // Etkinliği listeye ekliyoruz
              go("events");
            }}
            onCancel={() => go("events")}
            submitButtonText="Etkinlik Ekle"
          />
        </section>
      )}

      {/* GÜNCELLEME SAYFASI */}
      {page === "update" && selectedEvent && (
        <section>
          <h2>Etkinliği Güncelle</h2>
          <EventForm
            initialValues={selectedEvent}
            onSubmit={(formData) => {
              Object.assign(selectedEvent, formData); // Seçili etkinliği güncelliyoruz
              go("detail", selectedEvent.id);
            }}
            onCancel={() => go("detail", selectedEvent.id)}
            submitButtonText="Güncelle"
          />
        </section>
      )}







      </main>
      <Footer/>
   </>
  );
}

export default App;