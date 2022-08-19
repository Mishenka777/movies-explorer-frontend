import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="login">
      <Logo />
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form">
        <label className="login__form-item" for="login__input-email">
          E-mail
        </label>
        <input
          className="login__input"
          id="login__input-email"
          type="email"
          required
        />
        <span className="login__error"></span>
        <label className="login__form-item" for="login__input-password">
          Пароль
        </label>
        <input
          className="login__input"
          id="login__input-password"
          type="password"
          required
        />
        <span className="login__error"></span>
        <button type="submit" className="login__form-button">
          Войти
        </button>
      </form>
      <p className="login__text">
        Ещё не зарегистрированы?
        <Link className="login__link" to="/signup">
          Регистрация
        </Link>
      </p>
    </section>
  );
}
