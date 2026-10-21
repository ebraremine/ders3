import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  const e = event as any;
  const imageSrc = e.imageUrl || e.image || "/afis.svg";
  const summaryText = e.summary || e.description || "Etkinlik detayları için tıklayınız.";

  return (
    <article className="etkinlik-kart">
      <img src={imageSrc} alt={event.title} className="kart-resim" />
      <div className="kart-icerik">
        <span className="rozet-kategori">{event.category}</span>
        <h3>{event.title}</h3>
        <p className="kart-tarih">📅 {formatDate(event.date)}</p>
        <p className="kart-konum">📍 {event.location}</p>
        <p className="kart-ozet">{summaryText}</p>
        <button
          className="btn-detay"
          onClick={() => onShowDetail(event.id)}
        >
          Detayları Gör
        </button>
      </div>
    </article>
  );
}

export default EventCard;