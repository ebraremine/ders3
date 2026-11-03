import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; password2?: string }>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found: typeof errors = {};

    if (name.trim().length < 3) found.name = "Ad soyad en az 3 karakter olmalı.";
    if (!email.includes("@")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    if (password2 !== password) found.password2 = "Şifreler aynı değil.";

    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <div className="auth-sayfasi">
      <h2 className="bolum-baslik">Kayıt Ol</h2>
      {sent && <p className="mesaj mesaj-basari">Kayıt başarılı! Giriş yapabilirsiniz.</p>}
      <form onSubmit={handleSubmit} noValidate className="etkinlik-formu">
        <div className="form-grup">
          <label htmlFor="name">Ad Soyad</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={errors.name ? true : undefined} />
          {errors.name && <span className="hata-metni">{errors.name}</span>}
        </div>
        <div className="form-grup">
          <label htmlFor="email">E-posta</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={errors.email ? true : undefined} />
          {errors.email && <span className="hata-metni">{errors.email}</span>}
        </div>
        <div className="form-grup">
          <label htmlFor="password">Şifre</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} aria-invalid={errors.password ? true : undefined} />
          {errors.password && <span className="hata-metni">{errors.password}</span>}
        </div>
        <div className="form-grup">
          <label htmlFor="password2">Şifre (Tekrar)</label>
          <input id="password2" type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} aria-invalid={errors.password2 ? true : undefined} />
          {errors.password2 && <span className="hata-metni">{errors.password2}</span>}
        </div>
        <button type="submit" className="buton">Kayıt Ol</button>
      </form>
      <div className="auth-linkler" style={{ marginTop: "1rem" }}>
        <Link to="/login">Zaten hesabın var mı? Giriş yap</Link>
      </div>
    </div>
  );
}