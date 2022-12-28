import { useTranslation } from "react-i18next";

// Component Props:
// type: object {type: string ,style: string, label: string}
// click: function
// disabled: boolean

export const Button = (props) => {
  const type = props.type;
  const click = props.click;
  const disabled = props.disabled;
  const { t } = useTranslation();

  // TESTING ONLY
  return (
    <button
      type={`${type.type}`}
      className={`form-card-button form-card-button-${type.style}`}
      disabled={disabled}
      onClick={click}
    >
      {t(`button.${type.label}`)}
    </button>
  );
};
