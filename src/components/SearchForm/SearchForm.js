import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm({
  onShortMovies,
  isShortMovies,
  onSearchMovies,
  onSearchSavedMovies,
  searchValue,
  defaultVisibleCount,
}) {
  const [search, setSearch] = useState("");
  const [searchSaved, setSearchSaved] = useState("");
  const location = useLocation().pathname;

  function handleChange(e) {
    setSearch(e.target.value);
    setSearchSaved(e.target.value);
  }

  function onSubmitSavedMovies(e) {
    e.preventDefault();
    onSearchSavedMovies(searchSaved);
    localStorage.setItem("keywordSaved", searchSaved);
  }

  function onSubmit(e) {
    e.preventDefault();
    localStorage.setItem("keyword", search);
    onSearchMovies(search);
    defaultVisibleCount();
  }

  useEffect(() => {
    setSearch(localStorage.getItem("keyword"));
    setSearchSaved(localStorage.getItem("keywordSaved"));
  }, []);

  return (
    <form
      className="search-form"
      onSubmit={location === "/movies" ? onSubmit : onSubmitSavedMovies}
    >
      <input
        className="search-form__entry"
        placeholder="Фильм"
        defaultValue={searchValue?.keyword}
        minLength="1"
        required
        type="text"
        onChange={handleChange}
        name="film"
      />
      <button className="search-form__button" type="submit"></button>
      <FilterCheckbox
        onShortMovies={onShortMovies}
        isShortMovies={isShortMovies}
      />
    </form>
  );
}
