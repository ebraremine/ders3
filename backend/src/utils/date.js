export function parseDate(value) {
  // Gelen değer zaten bir Date nesnesiyse olduğu gibi döndür
  if (value instanceof Date) return value;

  // String değilse geçersiz tarih döndür
  if (typeof value !== "string") return new Date(NaN);

  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value.trim());
  if (!m) return new Date(NaN); // biçim yanlışsa -> 400 / CastError

  const [, gun, ay, yil] = m.map(Number);
  const tarih = new Date(Date.UTC(yil, ay - 1, gun));

  // Örneğin "31-02-2026" gibi takvimde olmayan tarihleri yakala
  if (
    tarih.getUTCUTCFullYear?.() !== yil &&
    tarih.getUTCFullYear() !== yil ||
    tarih.getUTCMonth() !== ay - 1 ||
    tarih.getUTCDate() !== gun
  ) {
    return new Date(NaN);
  }

  return tarih;
}

export function formatDate(tarih) {
  if (!(tarih instanceof Date) || Number.isNaN(tarih.getTime())) return tarih;

  const gun = String(tarih.getUTCDate()).padStart(2, "0");
  const ay = String(tarih.getUTCMonth() + 1).padStart(2, "0");
  const yil = tarih.getUTCFullYear();

  return `${gun}-${ay}-${yil}`;
}

export function todayStart() {
  const s = new Date();
  return new Date(Date.UTC(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate()));
}