import { Route, Switch } from "react-router-dom";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import PageNotFound from "../PageNotFound/PageNotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import Header from "../Header/Header";
import SaveMovies from "../SavedMovies/SavedMovies";

export default function App() {
  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header loggedIn={false} />
          <Main />
          <Footer />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/profile">
          <Header loggedIn={true} />
          <Profile />
        </Route>
        <Route path="/movies">
          <Header loggedIn={true} />
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header loggedIn={true} />
          <SaveMovies />
          <Footer />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}
