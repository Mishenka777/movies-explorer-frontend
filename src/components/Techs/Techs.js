import SectionTitle from "../SectionTitle/SectionTitle";

export default function Techs() {
  return (
    <section className="techs" id="techs">
      <SectionTitle title="Технологии" />
      <div className="techs__container">
        <h3 className="techs__title">7 технологий</h3>
        <p className="techs__subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="technology__list">
          <li className="technology__list-item">HTML</li>
          <li className="technology__list-item">CSS</li>
          <li className="technology__list-item">JS</li>
          <li className="technology__list-item">React</li>
          <li className="technology__list-item">Git</li>
          <li className="technology__list-item">Express.js</li>
          <li className="technology__list-item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}
