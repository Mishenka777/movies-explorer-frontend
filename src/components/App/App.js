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
  const [searchValue, setSearchValue] = useState({});
  const [infoMessage, setInfoMessage] = useState("");
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    const localSearchMovies = localStorage.getItem("foundMovies");
    const localSearchValue = localStorage.getItem("searchValue");
    const localShotMovies = localStorage.getItem("isShortMovies");

    if (localSearchValue && localSearchMovies && localShotMovies) {
      setMovies(JSON.parse(localSearchMovies));
      setSearchValue(JSON.parse(localSearchValue));
      setIsShortMovies(JSON.parse(localShotMovies));
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
    mainApi.updateUserData(currentUser.name, currentUser.email)
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

  function handleShortMovies(e) {
    setIsShortMovies(e.target.checked);
  }

  const handleSaveMovie = (movie) => {
    mainApi
      .saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        setInfoMessage(`${err}`);
        setIsInfoTooltipPopupOpen(true);
      });
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

  function handleSearchMoviesByKeyword(movies, keyword) {
    let foundMovies = [];
    movies.forEach((movie) => {
      if (movie.nameRU.toLowerCase().indexOf(keyword) > -1) {
        if (isShortMovies) {
          movie.duration <= 40 && foundMovies.push(movie);
        } else {
          foundMovies.push(movie);
        }
      }
    });
    return foundMovies;
  }

  function handleSearchMovies(keyword) {
    setLoading(true);
    setMovies([]);
    moviesApi
      .getInitialMovies()
      .then((res) => {
        setMovies(res);
        const searchResult = handleSearchMoviesByKeyword(res, keyword);
        if (searchResult.length === 0) {
          setMovies([]);
          setInfoMessage("Ничего не найдено!");
          setIsInfoTooltipPopupOpen(true);
        } else {
          localStorage.setItem("foundMovies", JSON.stringify(searchResult));
          setSearchValue({ ...searchValue, keyword: keyword });
          localStorage.setItem("searchValue", JSON.stringify({ keyword }));
          setMovies(JSON.parse(localStorage.getItem("foundMovies")));
          localStorage.setItem("isShortMovies", JSON.stringify(isShortMovies));
        }
      })
      .catch(() => {
        setMovies([]);
      })
    .finally(() => {
        setLoading(false);
    });
  }

  function handleSearchSavedMovies(keyword) {
    setLoading(true);
    mainApi
      .getSavedMovies()
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
        const searchResult = handleSearchMoviesByKeyword(savedMovies, keyword);
        if (searchResult.length === 0) {
          setSavedMovies([]);
          setInfoMessage("Ничего не найдено!");
          setIsInfoTooltipPopupOpen(true);
        } else {
          setSavedMovies(searchResult);
        }
      })
      .catch(() => {
        setSavedMovies([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }


  function handleDeleteMovie(movie) {
    mainApi
      .deleteMovie(movie._id)
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      mainApi
        .getSavedMovies()
        .then((savedMovies) => {
          setSavedMovies(savedMovies);
        })
        .catch((e) => {});
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
              movies={movies}
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
              movies={movies}
              userSavedMovies={savedMovies}
              onDeleteMovie={handleDeleteMovie}
              onSearchSavedMovies={handleSearchSavedMovies}
              onShortMovies={handleShortMovies}
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
