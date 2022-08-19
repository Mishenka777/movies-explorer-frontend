import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../utils/Validation";

export default function Profile({ onLogOut, handleUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, handleChange, errors, isValid } =
    useFormWithValidation();
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
          disabled={!isValid}
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
