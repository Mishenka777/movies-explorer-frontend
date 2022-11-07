import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import useCurrentWidth from "../../components/UseCurrentWidth/UseCurrentWidth";
import { getInitialMovies, getLoadMovies } from "../../utils/constants";
export default function Movies({onShortMovies, isShortMovies, onSearchMovies, loading, searchValue, userSavedMovies, movies, onAddMovie, onDeleteMovie}) {
  const width = useCurrentWidth();
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(
    getInitialMovies(width)
  );

  function handleLoadMore() {
    setVisibleMoviesCount((prevCount) => prevCount + getLoadMovies(width));
  }

  function defaultVisibleCount() {
    setVisibleMoviesCount(getInitialMovies(width))
  }

  return (
    <section className="movies">
      <SearchForm
        defaultVisibleCount={defaultVisibleCount}
        searchValue={searchValue}
        onSearchMovies={onSearchMovies}
        onShortMovies={onShortMovies}
        isShortMovies={isShortMovies}
      />
        <MoviesCardList
          loading={loading}
          movies={movies}
          onAddMovie={onAddMovie}
          onDeleteMovie={onDeleteMovie}
          userSavedMovies={userSavedMovies}
          visibleMoviesCount={visibleMoviesCount}
        />
      {visibleMoviesCount < movies.length && (
              <button className="movies__more-button" onClick={handleLoadMore}>
                Ещё
              </button>
            )}
    </section>
  );
}
