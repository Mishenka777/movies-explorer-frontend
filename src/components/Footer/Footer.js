export default function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__content">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__links-list">
          <li className="footer__links-item">
            <a
              className="footer__link"
              href="https://practicum.yandex.ru"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__links-item">
            <a
              className="footer__link"
              href="https://github.com/mishenka777"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li className="footer__links-item">
            <a
              className="footer__link"
              href="http://t.me/mishenka777"
              target="_blank"
              rel="noreferrer"
            >
              Telegram
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
