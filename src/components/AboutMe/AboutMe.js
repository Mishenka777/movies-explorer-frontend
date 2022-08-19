import SectionTitle from "../SectionTitle/SectionTitle";
import photo from "../../images/photo.png";

export default function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <SectionTitle title="Студент" />
      <div className="about-me__container">
        <div className="about-me__items">
          <h3 className="about-me__title">Михаил</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 27 лет</p>
          <p className="about-me__text">
            Я родился и живу в Cанкт-Петербурге, закончил факультет экономики
            СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё
            увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в
            компании «СКБ Контур». После того, как прошёл курс по
            веб-разработке, начал заниматься фриланс-заказами и ушёл с
            постоянной работы.
          </p>
          <ul className="about-me__links">
            <li className="about-me__link">
              <a
                className="about-me__link-url"
                href="http://t.me/mishenka777"
                target="_blank"
                rel="noreferrer"
              >
                Telegram
              </a>
            </li>
            <li className="about-me__link">
              <a
                className="about-me__link-url"
                href="https://github.com/Mishenka777"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img className="about-me__photo" src={photo} alt="фото"></img>
      </div>
    </section>
  );
}
