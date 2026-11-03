import { useLocation, useParams } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";

export default function Header() {
  const location = useLocation();
  const { events } = useEvents();

  // Eğer /events/:id detay sayfasındaysak ilgili etkinliği bulalım
  const match = location.pathname.match(/^\/events\/([^/]+)$/);
  const eventId = match ? match[1] : null;
  const currentEvent = eventId ? events.find((e) => e.id === eventId) : null;

  return (
    <header className="site-baslik">
      {currentEvent ? (
        <>
          <h1>{currentEvent.title}</h1>
          <p>{currentEvent.category} · {currentEvent.location}</p>
        </>
      ) : (
        <>
          <h1>Kampüs Etkinlikleri</h1>
          <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
        </>
      )}
    </header>
  );
}