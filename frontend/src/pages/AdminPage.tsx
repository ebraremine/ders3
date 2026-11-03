import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format-date";

export default function AdminPage() {
  const { events, deleteEvent } = useEvents();

  function handleDelete(id: string, title: string) {
    if (window.confirm(`"${title}" silinsin mi?`)) {
      deleteEvent(id);
    }
  }

  return (
    <div className="admin-sayfasi">
      <h2 className="bolum-baslik">Etkinlik Yönetimi</h2>

      <div className="admin-ust-buton-alani">
        <Link to="/admin/new" className="buton buton-yeni">
          + Yeni etkinlik
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="bos-mesaj">Henüz etkinlik yok.</p>
      ) : (
        <table className="tablo">
          <thead>
            <tr>
              <th>Etkinlik</th>
              <th>Tarih</th>
              <th>Kategori</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id}>
                <td data-baslik="Etkinlik">{e.title}</td>
                <td data-baslik="Tarih">{formatDate(e.date)}</td>
                <td data-baslik="Kategori">{e.category}</td>
                <td className="islemler" data-baslik="İşlemler">
                  <Link to={`/admin/${e.id}/edit`} className="buton buton-duzenle">
                    Düzenle
                  </Link>
                  <button
                    onClick={() => handleDelete(e.id, e.title)}
                    className="buton buton-sil"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}