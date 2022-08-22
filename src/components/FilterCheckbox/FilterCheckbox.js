function FilterCheckbox({ onShortMovies, isShortMovies}) {
  return (
    <label className="filter-checkbox">
      <input
        type="checkbox"
        className="filter-checkbox__input"
        onChange={onShortMovies}
        checked={isShortMovies}      
      />
      <span className="filter-checkbox__visual"></span>
      Короткометражки
    </label>
  );
}

export default FilterCheckbox;
