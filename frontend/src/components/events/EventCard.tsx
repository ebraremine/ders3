import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

export default function EventCard({ event }: { event: CampusEvent }) {
  return (
    <article className="etkinlik-kart">
      <img src={event.image || "/afis.svg"} alt={event.title} />
      <div className="etkinlik-icerik">
        <span className="rozet">{event.category}</span>
        <h3>{event.title}</h3>
        <p className="tarih-yer">{formatDate(event.date)} · {event.location}</p>
        <p className="ozet">{event.description}</p>
        <Link to={`/events/${event.id}`} className="buton">
          Detayları Gör
        </Link>
      </div>
    </article>
  );
}