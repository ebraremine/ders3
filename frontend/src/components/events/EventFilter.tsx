interface EventFilterProps {
  searchText: string;
  category: string;
  categories: string[];
  onSearchChange: (text: string) => void;
  onCategoryChange: (category: string) => void;
}

function EventFilter({
  searchText,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: EventFilterProps) {
  return (
    <div style={{ display: "flex", gap: "15px", marginBottom: "20px", flexWrap: "wrap" }}>
      <div>
        <label htmlFor="search"><strong>Etkinlik ara</strong></label><br />
        <input
          id="search"
          type="search"
          placeholder="Örn: atölye, kariyer"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="category"><strong>Kategori</strong></label><br />
        <select
          id="category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">Tümü</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default EventFilter;