import { useState, useEffect } from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PageNotFound from "../PageNotFound/PageNotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import Header from "../Header/Header";
import SaveMovies from "../SavedMovies/SavedMovies";
import * as mainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import moviesApi from "../../utils/MoviesApi";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

export default function App() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isShortSaveMovies, setIsShortSaveMovies] = useState(false);
  const [searchValue, setSearchValue] = useState({});
  const [infoMessage, setInfoMessage] = useState("");
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [filtredMovies, setFilteredMovies] = useState([]);
  const [searchSaveValue, setSearchSaveValue] = useState([]);


  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    const localSearchMovies = localStorage.getItem("foundMovies");
    const localSearchValue = localStorage.getItem("searchValue");
    const localShotMovies = localStorage.getItem("isShortMovies");
    const localMovies = localStorage.getItem("movies");

    if (
      localSearchValue &&
      localSearchMovies &&
      localShotMovies &&
      localMovies
    ) {
      setFilteredMovies(JSON.parse(localSearchMovies));
      setSearchValue(JSON.parse(localSearchValue));
      setIsShortMovies(JSON.parse(localShotMovies));
      setMovies(JSON.parse(localMovies));
    }
    const localSaveSearchValue = localStorage.getItem("searchSaveValue");
    if (localSaveSearchValue) {
      setSearchSaveValue(JSON.parse(localSearchValue));
    }
  }, []);

  function handleRegister(name, email, password) {
    mainApi
      .register(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        setInfoMessage(`${err}`);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleLogin(email, password) {
    mainApi
      .login(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        checkToken();
        history.push("/movies");
        setInfoMessage("Приветики!");
        setIsInfoTooltipPopupOpen(true);
      })
      .catch((err) => {
        setInfoMessage(`${err}`);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function checkToken() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      mainApi
        .checkToken(token)
        .then((res) => {
          if (res) {
            setCurrentUser({
              name: res.name,
              email: res.email,
              id: res._id,
            });
            setIsLoggedIn(true);
            history.push(location.pathname);
          }
        })
        .catch((err) => {
          setInfoMessage(`${err}`);
          setIsInfoTooltipPopupOpen(true);
        });
    }
  }

  function handleUpdateUser(currentUser) {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      mainApi
        .updateUserData(token, currentUser.name, currentUser.email)
        .then((res) => {
          setInfoMessage("Данные успешно обновлены");
          setIsInfoTooltipPopupOpen(true);
          setCurrentUser({
            name: res.name,
            email: res.email,
          });
        })
        .catch((err) => {
          setIsInfoTooltipPopupOpen(true);
          setInfoMessage("Некорректные данные");
        });
    }
  }

  function handleShortMovies(e) {
    setIsShortMovies(e.target.checked);
    const searchResult = handleSearchMoviesByKeyword(
      movies,
      searchValue?.keyword,
      e.target.checked
    );
    if (movies.length !== 0) {
      if (searchResult.length === 0) {
        setFilteredMovies([]);
        setInfoMessage("Ничего не найдено!");
        setIsInfoTooltipPopupOpen(true);
      } else {
        setFilteredMovies(searchResult);
      }
    }
  }

  function handleShortSaveMovies(e) {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    setIsShortSaveMovies(e.target.checked);
    if (e.target.checked) {
      const searchResult = handleSearchMoviesByKeyword(
        savedMovies,
        searchSaveValue?.keyword,
        e.target.checked
      );
      setSavedMovies(searchResult);
    } else {
      setSavedMovies(savedMovies);
    }
  }

  function handleSearchMoviesByKeyword(movies, keyword, short) {
    let foundMovies = [];
    movies.forEach((movie) => {
      if (movie.nameRU.toLowerCase().indexOf(keyword) > -1) {
        if (short) {
          movie.duration <= 40 && foundMovies.push(movie);
        } else {
          foundMovies.push(movie);
        }
      }
    });
    return foundMovies;
  }


  function handleSearchSavedMovies(keyword) {
    setLoading(true);
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      mainApi
        .getSavedMovies(token)
        .then((res) => {
          setSavedMovies(res);
          localStorage.setItem("savedMovies", JSON.stringify(res));
          const searchResult = handleSearchMoviesByKeyword(
            res,
            keyword,
            isShortSaveMovies
          );
          if (searchResult.length === 0) {
            setSavedMovies([]);
            setInfoMessage("Ничего не найдено!");
            setIsInfoTooltipPopupOpen(true);
          } else {
            setSavedMovies(searchResult);
            setSearchSaveValue({ ...searchSaveValue, keyword: keyword });
            localStorage.setItem(
              "searchSaveValue",
              JSON.stringify({ keyword })
            );
          }
        })
        .catch(() => {
          setSavedMovies([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  const handleSaveMovie = (movie) => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      mainApi
        .saveMovie(token, movie)
        .then((newMovie) => {
          setSavedMovies([newMovie, ...savedMovies]);
        })
        .catch((err) => {
          setInfoMessage(`${err}`);
          setIsInfoTooltipPopupOpen(true);
        });
    }
  };

  function handleLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("foundMovies");
    localStorage.removeItem("searchValue");
    localStorage.removeItem("isShortMovies");
    localStorage.clear();
    setIsLoggedIn(false);
    history.push("/");
  }

  function handleSearchMovies(keyword) {
    setLoading(true);
    setMovies([]);
    moviesApi
      .getInitialMovies()
      .then((res) => {
        setMovies(res);
        const searchResult = handleSearchMoviesByKeyword(
          res,
          keyword,
          isShortMovies
        );
        if (searchResult.length === 0) {
          setFilteredMovies([]);
          setInfoMessage("Ничего не найдено!");
          setIsInfoTooltipPopupOpen(true);
        } else {
          localStorage.setItem("foundMovies", JSON.stringify(searchResult));
          setFilteredMovies(JSON.parse(localStorage.getItem("foundMovies")));
          setSearchValue({ ...searchValue, keyword: keyword });
          localStorage.setItem("searchValue", JSON.stringify({ keyword }));
          localStorage.setItem("isShortMovies", JSON.stringify(isShortMovies));
          localStorage.setItem("movies", JSON.stringify(res));
          setMovies(JSON.parse(localStorage.getItem("movies")));
        }
      })
      .catch(() => {
        setMovies([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleDeleteMovie(movie) {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      mainApi
        .deleteMovie(token, movie._id)
        .then(() => {
          setSavedMovies((savedMovies) =>
            savedMovies.filter((item) => item !== movie)
          );
        })
        .catch((err) => {
          setInfoMessage(`${err}`);
          setIsInfoTooltipPopupOpen(true);
        });
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      mainApi
        .getSavedMovies(token)
        .then((savedMovies) => {
          setSavedMovies(savedMovies);
          localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
        })
        .catch((err) => console.log(`Ошибка ${err}`));
    }
  }, [isLoggedIn]);


  function closeAllPopups() {
    setIsInfoTooltipPopupOpen(false);
  }

  useEffect(() => {
    const closeAllPopupsEsc = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeAllPopupsEsc);
    return () => {
      document.removeEventListener("keydown", closeAllPopupsEsc);
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Header loggedIn={isLoggedIn} />
            <Main />
            <Footer />
          </Route>
          <Route path="/signup">
            {isLoggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Register onRegister={handleRegister} />
            )}
          </Route>
          <Route path="/signin">
            {isLoggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Login onLogin={handleLogin} />
            )}
          </Route>
          <ProtectedRoute path="/profile" isLoggedIn={isLoggedIn}>
            <Header loggedIn={isLoggedIn} />
            <Profile
              onLogOut={handleLogOut}
              handleUpdateUser={handleUpdateUser}
              loggedIn={isLoggedIn}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/movies" isLoggedIn={isLoggedIn}>
            <Header loggedIn={isLoggedIn} />
            <Movies
              onAddMovie={handleSaveMovie}
              searchValue={searchValue}
              movies={filtredMovies}
              onDeleteMovie={handleDeleteMovie}
              loading={loading}
              onShortMovies={handleShortMovies}
              onSearchMovies={handleSearchMovies}
              isShortMovies={isShortMovies}
              userSavedMovies={savedMovies}
            />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" isLoggedIn={isLoggedIn}>
            <Header loggedIn={isLoggedIn} />
            <SaveMovies
              loggedIn={isLoggedIn}
              loading={loading}
              movies={filtredMovies}
              userSavedMovies={savedMovies}
              onDeleteMovie={handleDeleteMovie}
              onSearchSavedMovies={handleSearchSavedMovies}
              onShortMovies={handleShortSaveMovies}
              searchValue={searchSaveValue}
              isShortMovies={isShortSaveMovies}
            />
            <Footer />
          </ProtectedRoute>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        <InfoTooltip
          infoMessage={infoMessage}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
