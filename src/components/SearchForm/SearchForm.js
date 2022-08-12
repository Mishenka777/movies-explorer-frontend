import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm() {
  return (
    <form className="search-form">
      <input className="search-form__entry" placeholder="Фильм" required type="text"/>
      <button className="search-form__button" type="submit"></button>
      <FilterCheckbox />
    </form>
  );
}
