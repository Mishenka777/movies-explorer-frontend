import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <section className="register">
      <Logo />
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form">
        <label className="register__form-item" for="register__input-name">
          Имя
        </label>
        <input
          className="register__input"
          id="register__input-name"
          type="text"
          required
        />
        <span className="register__error"></span>
        <label className="register__form-item" for="register__input-email">
          E-mail
        </label>
        <input
          className="register__input"
          id="register__input-email"
          type="email"
          required
        />
        <span className="register__error"></span>
        <label className="register__form-item" for="register__input-password">
          Пароль
        </label>
        <input
          className="register__input"
          id="register__input-password"
          type="password"
          required
        />
        <span className="register__error"></span>
        <button type="submit" className="register__form-button">
          Зарегистрироваться
        </button>
      </form>
      <p className="register__text">
        Уже зарегистрированы?
        <Link className="register__link" to="/signin">
          Войти
        </Link>
      </p>
    </section>
  );
}
