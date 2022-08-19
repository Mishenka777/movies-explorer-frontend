import { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesCards from "../../utils/cards";
import Preloader from "../Preloader/Preloader";

export default function Movies() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(!isLoading), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <section className="movies">
      <SearchForm />
      {!isLoading ? (
         <Preloader />
      ) : (
        <MoviesCardList moviesCardList={moviesCards} isSaved={false}/>
      )}
      <button className="movies__more-button">Ещё</button> 
    </section>
  );
}
