import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

export default function MoviesCardList({
  movies,
  visibleMoviesCount,
  onAddMovie,
  userSavedMovies,
  onDeleteMovie,
  loading,
}) {
  const location = useLocation().pathname;

  return (
    <ul className="movies-card-list">
      {loading ? (
        <Preloader loading={loading} />
      ) : location === "/movies" ? (
        <>
          {movies.slice(0, visibleMoviesCount).map((movie) => (
            <MoviesCard
              key={movie.id || movie._id}
              movie={movie}
              onAddMovie={onAddMovie}
              onDeleteMovie={onDeleteMovie}
              userSavedMovies={userSavedMovies}
            />
          ))}
        </>
      ) : (
        <>
          {userSavedMovies.slice(0, visibleMoviesCount).map((movie) => (
            <MoviesCard
              key={movie.id || movie._id}
              movie={movie}
              onDeleteMovie={onDeleteMovie}
              userSavedMovies={userSavedMovies}
            />
          ))}
        </>
      )}
    </ul>
  );
}
