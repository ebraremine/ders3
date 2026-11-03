import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import EventForm from "../components/forms/EventForm";
import NotFoundPage from "./NotFoundPage";

export default function EditEventPage() {
  const { id } = useParams();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();

  const event = findEventById(events, id ?? "");

  if (!event) {
    return <NotFoundPage />;
  }

  const initialData = {
    ...event,
    capacity: String(event.capacity),
  };

  function handleSubmit(data: typeof initialData) {
    if (id) {
      updateEvent(id, data);
      navigate("/admin");
    }
  }

  return (
    <div className="form-sayfasi">
      <h2 className="bolum-baslik">Etkinliği Düzenle</h2>
      <EventForm initialData={initialData} submitText="Güncelle" onSubmit={handleSubmit} />
    </div>
  );
}