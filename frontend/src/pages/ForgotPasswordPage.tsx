import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Geçerli bir e-posta girin.");
      setSent(false);
    } else {
      setError("");
      setSent(true);
    }
  }

  return (
    <div className="auth-sayfasi">
      <h2 className="bolum-baslik">Şifremi Unuttum</h2>
      <p className="aciklama">Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>
      {sent && (
        <p className="mesaj mesaj-basari">
          Bağlantı {email} adresine gönderildi (demo).
        </p>
      )}
      <form onSubmit={handleSubmit} noValidate className="etkinlik-formu">
        <div className="form-grup">
          <label htmlFor="email">E-posta</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={error ? true : undefined} />
          {error && <span className="hata-metni">{error}</span>}
        </div>
        <button type="submit" className="buton">Bağlantı Gönder</button>
      </form>
      <div className="auth-linkler" style={{ marginTop: "1rem" }}>
        <Link to="/login">← Girişe dön</Link>
      </div>
    </div>
  );
}