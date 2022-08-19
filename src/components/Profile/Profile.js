import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="profile">
      <h2 className="profile__title">Привет, Михаил!</h2>
      <form className="profile__form">
        <label className="profile__input">
          Имя
          <input
            className="profile__input-item"
            name="name"
            type="text"
            defaultValue="Михаил"
            placeholder="Имя"
            required
          />
        </label>
        <label className="profile__input">
          E-mail
          <input
            className="profile__input-item"
            name="email"
            type="text"
            defaultValue="pochta@yandex.ru"
            placeholder="E-mail"
            required
          />
        </label>
        <button type="submit" className="profile__submit">
          Редактировать
        </button>
      </form>
      <Link className="profile__logout" to="/">
        Выйти из аккаунта
      </Link>
    </div>
  );
}
