import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ moviesCardList, isSaved }) {
  return (
    <ul className="movies-card-list">
      {moviesCardList.map((moviesCard) => (
        <MoviesCard
          key={moviesCard.id}
          moviesCard={moviesCard}
          isSaved={isSaved}
        />
      ))}
    </ul>
  );
}
