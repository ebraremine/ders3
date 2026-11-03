import { useState, type ChangeEvent, type FormEvent } from "react";
import type { EventFormData, EventFormErrors, Category } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

interface Props {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

export default function EventForm({ initialData, submitText, onSubmit }: Props) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const foundErrors = validateEvent(data);
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length === 0) {
      onSubmit(data);
    }
  }

  return (
    <form className="etkinlik-formu" onSubmit={handleSubmit} noValidate>
      <div className="form-grup">
        <label htmlFor="title">Etkinlik Adı</label>
        <input
          id="title"
          name="title"
          type="text"
          value={data.title}
          onChange={handleChange}
          aria-invalid={errors.title ? true : undefined}
        />
        {errors.title && <span className="hata-metni">{errors.title}</span>}
      </div>

      <div className="form-grup">
        <label htmlFor="category">Kategori</label>
        <select
          id="category"
          name="category"
          value={data.category}
          onChange={handleChange}
          aria-invalid={errors.category ? true : undefined}
        >
          <option value="">Seçiniz</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.category && <span className="hata-metni">{errors.category}</span>}
      </div>

      <div className="form-satir">
        <div className="form-grup">
          <label htmlFor="date">Tarih</label>
          <input
            id="date"
            name="date"
            type="date"
            value={data.date}
            onChange={handleChange}
            aria-invalid={errors.date ? true : undefined}
          />
          {errors.date && <span className="hata-metni">{errors.date}</span>}
        </div>

        <div className="form-grup">
          <label htmlFor="time">Saat</label>
          <input
            id="time"
            name="time"
            type="time"
            value={data.time}
            onChange={handleChange}
            aria-invalid={errors.time ? true : undefined}
          />
          {errors.time && <span className="hata-metni">{errors.time}</span>}
        </div>
      </div>

      <div className="form-satir">
        <div className="form-grup">
          <label htmlFor="location">Yer</label>
          <input
            id="location"
            name="location"
            type="text"
            value={data.location}
            onChange={handleChange}
            aria-invalid={errors.location ? true : undefined}
          />
          {errors.location && <span className="hata-metni">{errors.location}</span>}
        </div>

        <div className="form-grup">
          <label htmlFor="capacity">Kontenjan</label>
          <input
            id="capacity"
            name="capacity"
            type="number"
            value={data.capacity}
            onChange={handleChange}
            aria-invalid={errors.capacity ? true : undefined}
          />
          {errors.capacity && <span className="hata-metni">{errors.capacity}</span>}
        </div>
      </div>

      <div className="form-grup">
        <label htmlFor="description">Açıklama</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={data.description}
          onChange={handleChange}
          aria-invalid={errors.description ? true : undefined}
        />
        {errors.description && <span className="hata-metni">{errors.description}</span>}
      </div>

      <button type="submit" className="buton">{submitText}</button>
    </form>
  );
}