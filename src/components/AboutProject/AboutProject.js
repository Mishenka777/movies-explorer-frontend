import SectionTitle from "../SectionTitle/SectionTitle";

export default function AboutProject() {
  return (
    <section className="about-project">
      <SectionTitle title="О проекте" />
      <div className="about-project__column">
        <div className="about-project__column-item">
          <h3 className="about-project__column-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__column-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__column-item">
          <h3 className="about-project__column-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__column-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__plan">
        <div className="about-project__plan-item about-project__plan-backend">
          1 неделя
        </div>
        <div className="about-project__plan-item about-project__plan-frontend">
          4 недели
        </div>
        <div className="about-project__plan-item">Back-end</div>
        <div className="about-project__plan-item">Front-end</div>
      </div>
    </section>
  );
}
