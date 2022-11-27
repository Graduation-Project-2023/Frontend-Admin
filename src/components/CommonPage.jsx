import { Link } from "react-router-dom";

export const CommonPage = (props) => {
  return (
    <div className="container">
      <div className="common_cont">
        <div className="common_cont_icon">{props.icon}</div>
        <div className="common_cont_text">
          <h2>{props.mainText}</h2>
          <h3>{props.secondaryText}</h3>
        </div>
        {props.loader ? (
          <div className="common_cont_bar">
            <div className="common_cont_bar_box">
              <div className="common_cont_bar_box_line"></div>
            </div>
          </div>
        ) : (
          <div className="common_cont_btn">
            <Link to={props.navigateTo}>
              <button>{props.btnText}</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
