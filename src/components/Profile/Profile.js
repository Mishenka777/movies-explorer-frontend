import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormWithValidation from "../../utils/ValidationProfile";

export default function Profile({ onLogOut, handleUpdateUser }) {
  const EmailReg =
  /^\S+@\S+\.\S+$/iu;
  const NameReg = /^[a-zA-Zа-яА-Я]+$/ui
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, handleChange, errors, isValid } =
    useFormWithValidation({
      name: (value) => {
        if (!value) {
          return "Необходимо заполнить это поле";
        } else if (value.length < 2) {
          return "Минимальное количество символов - 2";
        } else if (value.length > 31) {
          return "Максимальное количество символов - 30";
        } else if (!NameReg.test(value)) {
          return "Используйте только кириллицу или латиницу !";
        }
        return "";
      },
      email: (value) => {
        if (!value) {
          return "Необходимо заполнить это поле";
        } else if (!EmailReg.test(value)) {
          return "Поле не адресу электронной почты";
        }
        return "";
      },
    });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  useEffect(() => {
    if (
      values.name === currentUser.name &&
      values.email === currentUser.email
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [values.name, values.email, currentUser.name, currentUser.email]);

  const editProfile = (evt) => {
    evt.preventDefault();
    handleUpdateUser({ name: values.name, email: values.email });
  };

  return (
    <div className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form" onSubmit={editProfile} noValidate>
        <label className="profile__input">
          Имя
          <input
            className="profile__input-item"
            name="name"
            type="text"
            value={values.name || ""}
            required
            onChange={handleChange}
            pattern="[a-zA-Zа-яА-ЯёЁ\- ]{2,}"
          />
        </label>
        <span className="input__error_profile">{errors.name}</span>
        <label className="profile__input">
          E-mail
          <input
            className="profile__input-item"
            pattern="\S+@\S+\.\S+"
            name="email"
            type="text"
            value={values.email || ""}
            required
            onChange={handleChange}
          />
        </label>
        <span className="input__error_profile">{errors.email}</span>
        <button
          type="submit"
          disabled={!isValid || disabled}
          className={`profile__submit ${
            isValid && !disabled ? "" : "profile__submit_disabled"
          }`}
        >
          Редактировать
        </button>
      </form>
      <Link className="profile__logout" to="/" onClick={onLogOut}>
        Выйти из аккаунта
      </Link>
    </div>
  );
}
