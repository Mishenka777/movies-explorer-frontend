import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import useFormWithValidation from "../../utils/ValidationProfile";


export default function Register({ onRegister }) {
  const NameReg = /^[a-zA-Zа-яА-Я]+$/ui;
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
    name: (value) => {
      if (!value) {
        return 'Необходимо заполнить это поле'
      } else if (!NameReg.test(value)) {
        return 'Используйте только кириллицу или латиницу !'
      } else if (value.length < 2) {
        return 'Минимальное количество символов - 2'
      } else if (value.length > 30) {
        return 'Максимальное количество символов - 30'
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
    onRegister(values.name, values.email, values.password);
  };

  return (
    <section className="register">
      <Logo />
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={handleSubmit} noValidate>
        <label className="register__form-item" htmlFor="register__input-name">
          Имя
        </label>
        <input
          onChange={handleChange}
          className="register__input"
          id="register__input-name"
          type="text"
          name="name"
          required
          value={values.name || ""}
          pattern="[a-zA-Zа-яА-ЯёЁ\- ]{2,}"
        />
        <span className="register__error">{errors.name}</span>
        <label className="register__form-item" htmlFor="register__input-email">
          E-mail
        </label>
        <input
          onChange={handleChange}
          className="register__input"
          id="register__input-email"
          type="email"
          name="email"
          required
          value={values.email || ""}
          pattern="\S+@\S+\.\S+"
        />
        <span className="register__error">{errors.email}</span>
        <label
          className="register__form-item"
          htmlFor="register__input-password"
        >
          Пароль
        </label>
        <input
          onChange={handleChange}
          className="register__input"
          id="register__input-password"
          type="password"
          name="password"
          required
          minLength="8"
          value={values.password || ""}
        />
        <span className="register__error">{errors.password}</span>
        <button
          type="submit"
          className={`register__form-button ${
            isValid
              ? "auth-form__btn-submit_active"
              : "auth-form__btn-submit_disabled"
          }`}
          disabled={!isValid}
        >
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
