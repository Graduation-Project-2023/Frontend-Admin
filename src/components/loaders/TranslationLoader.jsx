export const TranslationLoader = () => {
  return (
    <div className="skeleLoader">
      <div className="skeleLoader-nav"></div>

      <div className="skeleLoader-wrapper">
        <div className="skeleLoader-cont">
          <div className="skeleLoader-spinner"></div>
        </div>

        <div className="skeleLoader-list">
          <header>
            <span>
              <div className="skeleLoader-load"></div>
            </span>
          </header>
          <span>
            <div className="skeleLoader-load"></div>
          </span>
          <span>
            <div className="skeleLoader-load"></div>
          </span>
          <span>
            <div className="skeleLoader-load"></div>
          </span>
          <span>
            <div className="skeleLoader-load"></div>
          </span>
          <span>
            <div className="skeleLoader-load"></div>
          </span>
        </div>
      </div>
    </div>
  );
};
