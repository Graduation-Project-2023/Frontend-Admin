import { Spinner } from "react-bootstrap";

export const SpinnerLoader = ({ size, heigth }) => {
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
