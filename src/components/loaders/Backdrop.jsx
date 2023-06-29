export const Backdrop = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        width: "100vw",
        height: "100vh",
        zIndex: "99999999",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div
        className="text-center"
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div
          className="spinner-border"
          role="status"
          style={{
            display: "block",
            position: "fixed",
            top: "50%",
            right: "50%",
            color: "#76a6e0",
            width: "3rem",
            height: "3rem",
          }}
        ></div>
      </div>
    </div>
  );
};
