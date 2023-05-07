import { Spinner } from "react-bootstrap";

export const SpinnerLoader = ({ size, heigth, overlay }) => {
  if (overlay)
    return (
      <div className="overlay-spinner">
        <Spinner
          animation="border"
          style={{
            color: "#76a6e0",
            width: "150px",
            height: "150px",
            margin: "20px",
          }}
        />
      </div>
    );
  else
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: "100%", height: heigth }}
      >
        <Spinner
          animation="border"
          style={{
            color: "#76a6e0",
            width: size,
            height: size,
            margin: "20px",
          }}
        />
      </div>
    );
};
