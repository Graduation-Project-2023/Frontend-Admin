import { useTranslation } from "react-i18next";

export const FormCard = (props) => {
  const { t } = useTranslation();
  return (
    <div className="form-card">
      <h3>{t(props.cardTitle)}</h3>
      {props.children}
    </div>
  );
};
