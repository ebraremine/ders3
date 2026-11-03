import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";

export default function HomePage() {
  const { events } = useEvents();
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <div className="ana-sayfa">
      <h2 className="bolum-baslik">Yaklaşan 2 Etkinlik</h2>
      <EventList events={upcoming} />
      <div className="merkez-buton" style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <Link to="/events" className="buton">Tüm Etkinlikleri Gör</Link>
      </div>
    </div>
  );
}