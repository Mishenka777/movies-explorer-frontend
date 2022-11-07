import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import useFormWithValidation from "../../utils/ValidationProfile";

export default function Login({ onLogin }) {
  const EmailReg = /^\S+@\S+\.\S+$/iu;

  const { values, handleChange, errors, isValid, } = useFormWithValidation({
    password: (value) => {
      if (!value) {
        return 'Необходимо заполнить это поле'
      } else if (value.length < 8) {
        return 'Минимальное количество символов - 8'
      }
      return '';
    },
    email: (value) => {
      if (!value) {
        return 'Необходимо заполнить это поле'
      } else if (!EmailReg.test(value)) {
        return 'Поле не соотвествует адресу электронной почты'
      }
      return '';
    }
  });

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
