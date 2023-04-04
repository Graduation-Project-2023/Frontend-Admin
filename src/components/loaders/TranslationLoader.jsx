import { Spinner } from "react-bootstrap";

export const TranslationLoader = () => {
  return (
    <div className="skeleLoader">
      <div className="skeleLoader-nav"></div>
      <div className="skeleLoader-cont">
        <Spinner
          animation="grow"
          style={{ color: "#76a6e0", width: "80px", height: "80px" }}
        />
      </div>
    </div>
  );
};
