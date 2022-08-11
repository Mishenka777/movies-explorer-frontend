import { useHistory } from "react-router-dom";

export default function PageNotFound() {
  const history = useHistory();
  return (
    <section className="page-not-found">
      <h1 className="page-not-found__title">404</h1>
      <p className="page-not-found__caption">Страница не найдена</p>
      <button
        className="page-not-found__button"
        onClick={() => history.goBack()}
      >
        Назад
      </button>
    </section>
  );
}
