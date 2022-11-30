import { useTranslation } from "react-i18next";

export const FormCard = (props) => {
  const { t } = useTranslation();
  return (
    <div className="form-card">
      <h3>{t(props.cardTitle)}</h3>
      {props.children}
      <span>
        <button
          type="submit"
          className="form-card-button form-card-button-save"
        >
          {t(`common.save`)}
        </button>
      </span>
      <span>
        <button
          type="reset"
          className="form-card-button form-card-button-cancel"
        >
          {t(`common.cancel`)}
        </button>
      </span>
    </div>
  );
};
