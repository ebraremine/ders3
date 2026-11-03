import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="not-found" style={{ textAlign: "center", padding: "2rem" }}>
      <h2 className="bolum-baslik">Sayfa Bulunamadı</h2>
      <p>Aradığınız sayfa ya da etkinlik mevcut değil.</p>
      <div className="merkez-buton" style={{ marginTop: "1rem" }}>
        <Link to="/" className="buton">Ana Sayfaya Dön</Link>
      </div>
    </div>
  );
}