import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm({
  onShortMovies,
  isShortMovies,
  onSearchMovies,
  onSearchSavedMovies,
  searchValue,
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
  }

  function onSubmit(e) {
    e.preventDefault();
    localStorage.setItem("keyword", search);
    onSearchMovies(search);
  }

  useEffect(() => {
    setSearch(localStorage.getItem("keyword"));
  }, []);

  return (
    <form
      className="search-form"
      onSubmit={location === "/movies" ? onSubmit : onSubmitSavedMovies}
      noValidate
    >
      <input
        className="search-form__entry"
        placeholder={searchValue?.keyword || "Фильм"}
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
