import { useTranslation } from "react-i18next";

export const FormCard = (props) => {
  const { t } = useTranslation();
  return (
    <div className="form-card">
      <div className="form-card-header">
        {props.cardTitle && <h3>{t(props.cardTitle)}</h3>}
        {props.button && (
          <button className="form-card-btn">{t(props.button)}</button>
        )}
      </div>
      {props.children}
    </div>
  );
};
