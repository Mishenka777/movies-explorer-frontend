export default function InfoTooltip({ onClose, isOpen, infoMessage }) {
  return (
    <article className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container-infotooltip">
        <button
          className="popup__exit"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{infoMessage}</h2>
      </div>
    </article>
  );
}
