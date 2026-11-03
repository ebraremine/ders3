import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import type { EventFormData } from "../types/campus-event";
import EventForm from "../components/forms/EventForm";

const emptyForm: EventFormData = {
  title: "",
  category: "",
  capacity: "",
  date: "",
  time: "",
  location: "",
  description: "",
};

export default function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  function handleSubmit(data: EventFormData) {
    addEvent(data);
    navigate("/admin");
  }

  return (
    <div className="form-sayfasi">
      <h2 className="bolum-baslik">Etkinlik Ekle</h2>
      <EventForm initialData={emptyForm} submitText="Kaydet" onSubmit={handleSubmit} />
    </div>
  );
}