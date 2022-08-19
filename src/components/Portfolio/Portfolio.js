export default function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://github.com/mishenka777/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
            <span className="portfolio__link-arrow">&#8599;</span>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://mishenka777.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
            <span className="portfolio__link-arrow">&#8599;</span>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://github.com/mishenka777/react-mesto-api-full"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
            <span className="portfolio__link-arrow">&#8599;</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
