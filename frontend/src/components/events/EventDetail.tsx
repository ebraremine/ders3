import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="etkinlik-detay-kart">
      <img src={event.imageUrl} alt={event.title} className="detay-resim" />
      <div className="detay-icerik">
        <span className="rozet-kategori">{event.category}</span>
        <h2>{event.title}</h2>
        <p className="detay-tarih">📅 {formatDate(event.date)}</p>
        <p className="detay-konum">📍 {event.location}</p>
        <p className="detay-kontenjan">👥 Kontenjan: {event.capacity} kişi</p>
        <div className="detay-aciklama">
          <h3>Açıklama</h3>
          <p>{event.description}</p>
        </div>
        <div className="detay-butonlar" style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button className="btn-gri" onClick={onBack}>
            ← Listeye Dön
          </button>
          <button className="btn-yesil" onClick={() => onEdit(event.id)}>
            ✏️ Etkinliği Güncelle
          </button>
        </div>
      </div>
    </article>
  );
}

export default EventDetail;