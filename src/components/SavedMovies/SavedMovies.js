import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesCardList from "../../utils/cardList";
import Preloader from "../Preloader/Preloader";

export default function SaveMovies() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(!isLoading), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <section className="save-movies">
      <SearchForm />
      {!isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList moviesCardList={moviesCardList} isSaved={true} />
      )}
    </section>
  );
}
