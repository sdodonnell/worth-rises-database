export default function Search({ searchTerm, setSearchTerm }) {
  return (
    <span>
        <label>Search term</label>
      <input
        value={searchTerm || ''}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        placeholder="Search by keyword"
      />
    </span>
  );
}
