import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function SaveMovies({
  userSavedMovies,
  onDeleteMovie,
  movies,
  onSearchSavedMovies,
  onShortMovies,
  loading,
  searchValue,
  isShortMovies,
}) {
  return (
    <section className="save-movies">
      <SearchForm
        onSearchSavedMovies={onSearchSavedMovies}
        onShortMovies={onShortMovies}
        searchValue={searchValue}
        isShortMovies={isShortMovies}
        
      />
      <MoviesCardList
        userSavedMovies={userSavedMovies}
        loading={loading}
        onDeleteMovie={onDeleteMovie}
        movies={movies}
      />
    </section>
  );
}
