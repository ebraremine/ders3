import type { Category } from "../../types/campus-event";

interface Props {
  searchText: string;
  onSearchChange: (text: string) => void;
  selectedCategory: Category | "";
  onCategoryChange: (cat: Category | "") => void;
  categories: Category[];
}

export default function EventFilter({
  searchText,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: Props) {
  return (
    <div className="arama-filtre-kutusu">
      <input
        type="text"
        placeholder="Etkinlik ara..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        className="arama-input"
      />
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value as Category | "")}
        className="kategori-select"
      >
        <option value="">Tüm Kategoriler</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}