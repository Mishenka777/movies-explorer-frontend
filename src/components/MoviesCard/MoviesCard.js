import { useLocation } from "react-router-dom";
export default function MoviesCard({
  movie,
  onAddMovie,
  userSavedMovies,
  onDeleteMovie,
}) {
  const location = useLocation().pathname;

  const isSaved =
    movie.id && userSavedMovies.some((m) => m.movieId === movie.id);

  const handleClickMovie = () => {
    if (isSaved) {
      onDeleteMovie(userSavedMovies.filter((m) => m.movieId === movie.id)[0]);
    } else {
      onAddMovie(movie);
    }
  };

  const cardLikeButtonClassName = `movies-card__button ${
    isSaved ? "movies-card__button_marked" : ""
  }`;

  function handleDeleteMovie() {
    onDeleteMovie(movie);
  }

  return (
    <li className="movies-card" key={movie.id}>
      <div className="movies-card__items">
        <h2 className="movies-card__title">{movie.nameRU}</h2>
        <p className="movies-card__duration">{movie.duration}</p>
      </div>
      <a href={movie.trailerLink} target="_blank" rel="noreferrer">
        {location === "/movies" ? (
          <img
            className="movies-card__image"
            alt={movie.nameRU}
            src={`https://api.nomoreparties.co${movie.image.url}`}
          />
        ) : (
          <img
            className="movies-card__image"
            alt={movie.nameRU}
            src={movie.image}
          />
        )}
      </a>

      {location === "/movies" ? (
        <button
          aria-label="Like"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleClickMovie}
        />
      ) : (
        <button
          aria-label="Delete"
          type="button"
          className="movies-card__button movies-card__button_delete"
          onClick={handleDeleteMovie}
        />
      )}
    </li>
  );
}
