import { useState } from "react";
import type { CampusEvent, Category } from "../../types/campus-event";

interface EventFormProps {
  initialValues?: CampusEvent;
  onSubmit: (formData: Omit<CampusEvent, "id">) => void;
  onCancel: () => void;
  submitButtonText?: string;
}

function EventForm({
  initialValues,
  onSubmit,
  onCancel,
  submitButtonText = "Kaydet",
}: EventFormProps) {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [category, setCategory] = useState<Category>(initialValues?.category || "Seminer");
  const [date, setDate] = useState(initialValues?.date || "");
  const [location, setLocation] = useState(initialValues?.location || "");
  const [capacity, setCapacity] = useState(initialValues?.capacity || 50);
  const [summary, setSummary] = useState(initialValues?.summary || "");
  const [description, setDescription] = useState(initialValues?.description || "");
  const [imageUrl, setImageUrl] = useState(initialValues?.imageUrl || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      category,
      date,
      location,
      capacity: Number(capacity),
      summary,
      description,
      imageUrl: imageUrl || "https://picsum.photos/400/250",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="etkinlik-formu">
      <div>
        <label>Etkinlik Başlığı</label><br />
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div>
        <label>Kategori</label><br />
        <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
          <option value="Seminer">Seminer</option>
          <option value="Atölye">Atölye</option>
          <option value="Söyleşi">Söyleşi</option>
          <option value="Yarışma">Yarışma</option>
        </select>
      </div>

      <div>
        <label>Tarih</label><br />
        <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>

      <div>
        <label>Konum</label><br />
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </div>

      <div>
        <label>Kontenjan</label><br />
        <input type="number" value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} required />
      </div>

      <div>
        <label>Görsel URL</label><br />
        <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
      </div>

      <div>
        <label>Özet (Kart Görünümü)</label><br />
        <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} required />
      </div>

      <div>
        <label>Detaylı Açıklama</label><br />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required />
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
        <button type="submit" className="btn-yesil">{submitButtonText}</button>
        <button type="button" className="btn-gri" onClick={onCancel}>İptal</button>
      </div>
    </form>
  );
}

export default EventForm;