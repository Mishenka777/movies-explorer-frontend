const Preloader = ({loading}) => {


  return (
    <div className={`preloader ${loading && 'preloader_visible'}`}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
};

export default Preloader;
