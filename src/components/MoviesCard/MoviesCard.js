import { useState } from "react";
export default function MoviesCard({ moviesCard, isSaved }) {
  const [isMarked, setIsMarked] = useState(false);

  function handleMarkMovie() {
    setIsMarked(!isMarked);
  }

  return (
    <li className="movies-card" key={moviesCard.id}>
      <div className="movies-card__items">
        <h2 className="movies-card__title">{moviesCard.title}</h2>
        <p className="movies-card__duration">{moviesCard.duration}</p>
      </div>
      <img
        className="movies-card__image"
        alt="картинка_из_фильма"
        src={moviesCard.image}
      />
      {!isSaved ? (
        <button
          className={
            !isMarked
              ? "movies-card__button"
              : "movies-card__button movies-card__button_marked"
          }
          onClick={handleMarkMovie}
          type="button"
        ></button>
      ) : (
        <button
          type="button"
          className="movies-card__button movies-card__button_delete"
        ></button>
      )}
    </li>
  );
}
