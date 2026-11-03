import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

export default function EventList({ events }: { events: CampusEvent[] }) {
  if (events.length === 0) {
    return <p className="bos-mesaj">Aradığınız kriterlere uygun etkinlik bulunamadı.</p>;
  }

  return (
    <div className="etkinlik-izgara">
      {events.map((e) => (
        <EventCard key={e.id} event={e} />
      ))}
    </div>
  );
}