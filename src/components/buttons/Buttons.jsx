// import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const FormButton = (props) => {
  // Component Props:
  // type: string
  // style: string
  // label: string
  // click: function
  // disabled: boolean

  const { t } = useTranslation();

  if (props.type === "loading") {
    return (
      <button className="form-card-button form-card-button-save" disabled>
        {t(props.label)} <span className="loader"></span>
      </button>
    );
  } else {
    return (
      <button
        type={`${props.type}`}
        className={`form-card-button form-card-button-${props.styles}`}
        disabled={props.disabled}
        onClick={props.click}
      >
        {t(props.label)}
      </button>
    );
  }
};
