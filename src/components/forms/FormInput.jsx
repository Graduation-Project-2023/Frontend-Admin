import { useTranslation } from "react-i18next";

export const FormInput = (props) => {
  const inputData = props.inputData;
  const valueData = props.valueData;
  const { t } = useTranslation();

  return (
    <div className="row mb-4">
      <label className="col-sm-2 col-form-label">{t(inputData.title)}</label>
      <div className="col-sm-5">
        {inputData.options ? (
          <select
            className="form-select"
            name={inputData.name}
            onChange={props.handleEditFormChange}
            value={valueData[inputData.name] || ""}
          >
            {inputData.options.map((option) => {
              return (
                <option key={option.id} value={option.value}>
                  {t(option.title)}
                </option>
              );
            })}
          </select>
        ) : (
          <input
            name={inputData.name}
            type={inputData.type}
            required={inputData.req}
            className="form-control"
            onChange={props.handleEditFormChange}
            value={valueData[inputData.name] || ""}
          />
        )}
      </div>
    </div>
  );
};
