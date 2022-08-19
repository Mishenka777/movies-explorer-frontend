import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

export default function Navigation() {
  const [isOpenBurger, setOpenBurger] = useState(false);

  const handleOpenBurger = () => {
    setOpenBurger(true);
  };

  const handleCloseBurger = () => {
    setOpenBurger(false);
  };
  return (
    <nav className="navigation">
      <Logo />
      <div className="navigation__link-films">
        <Link to="/movies" className="navigation__movies-link">
          Фильмы
        </Link>
        <Link to="/saved-movies" className="navigation__saved-link">
          Сохранённые фильмы
        </Link>
      </div>
      <Link to="/profile" className="navigation__profile-link"></Link>
      <button
        className="navigation__burger"
        onClick={handleOpenBurger}
      ></button>
      {isOpenBurger ? (
        <div className="navigation__burger-menu">
          <div className="navigation-burger-menu_content">
            <button
              className="navigation__burger-menu_close"
              onClick={handleCloseBurger}
            ></button>
            <div className="navigation__burger-links">
              <Link to="/" className="navigation__burger-link">
                Главная
              </Link>
              <Link to="/movies" className="navigation__burger-link">
                Фильмы
              </Link>
              <Link to="/saved-movies" className="navigation__burger-link">
                Сохраненные фильмы
              </Link>
            </div>
            <Link to="/profile" className="navigation__burger-button"></Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
}
