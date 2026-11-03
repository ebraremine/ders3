import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

export default function EventDetail({ event }: { event: CampusEvent }) {
  return (
    <article className="detay-sayfasi-kapsayici">
      <div className="detay-ust-izgara">
        {/* Sol Taraf: Afiş ve Görsel Bilgisi */}
        <div className="detay-sol-kolon">
          <img
            src={event.image || "/afis.svg"}
            alt={event.title}
            className="detay-afis-gorsel"
          />
          <p className="afis-alt-yazi">{event.title} afişi</p>
        </div>

        {/* Sağ Taraf: Etkinlik Künyesi Kutusu */}
        <div className="detay-kunye-kutusu">
          <h3>Etkinlik Künyesi</h3>
          <table className="kunye-tablo">
            <tbody>
              <tr>
                <th>Tarih</th>
                <td>{formatDate(event.date)}, {event.time}</td>
              </tr>
              <tr>
                <th>Yer</th>
                <td>{event.location}</td>
              </tr>
              <tr>
                <th>Kategori</th>
                <td>{event.category}</td>
              </tr>
              <tr>
                <th>Kontenjan</th>
                <td>{event.capacity} kişi</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Alt Kısım: Açıklama ve Butonlar */}
      <div className="detay-aciklama-alani">
        <h2>Açıklama</h2>
        <p className="detay-metin">{event.description}</p>

        <div className="detay-buton-grubu">
          <Link to="/events" className="buton buton-yesil">
            ← Listeye dön
          </Link>
          <Link to={`/admin/${event.id}/edit`} className="buton buton-yesil">
            Bu etkinliği güncelle
          </Link>
        </div>
      </div>
    </article>
  );
}