import type { CampusEvent, Category } from "../types/campus-event";

export function filterEvents(
  events: CampusEvent[],
  searchText: string,
  category: Category | ""
): CampusEvent[] {
  return events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchText.toLowerCase()) ||
      e.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = category === "" || e.category === category;
    return matchesSearch && matchesCategory;
  });
}

export function findEventById(events: CampusEvent[], id: string): CampusEvent | undefined {
  return events.find((e) => e.id === id);
}