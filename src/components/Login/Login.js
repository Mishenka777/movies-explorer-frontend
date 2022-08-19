import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../utils/Validation";

export default function Login({ onLogin }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(values.email, values.password)
  };

  return (
    <section className="login">
      <Logo />
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <label className="login__form-item" htmlFor="login__input-email">
          E-mail
        </label>
        <input
          className="login__input"
          id="login__input-email"
          type="email"
          name="email"
          required
          onChange={handleChange}
          value={values.email || ""}
          pattern="\S+@\S+\.\S+"
        />
        <span className="login__error">{errors.email}</span>
        <label className="login__form-item" htmlFor="login__input-password">
          Пароль
        </label>
        <input
          className="login__input"
          id="login__input-password"
          type="password"
          name="password"
          required
          onChange={handleChange}
          value={values.password || ""}
          minLength="8"
        />
        <span className="login__error">{errors.password}</span>
        <button type="submit" className={`login__form-button ${
              isValid
              ? "auth-form__btn-submit_active"
              : "auth-form__btn-submit_disabled"
            }`} disabled={!isValid}>
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
