import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { LoadingInput } from "./LoadingInput";

// Component Props:
// inputData: object for the form data (title, name, type, req, options, row, splitRow)
// valueData: object for the value data
// handleEditFormChange: function handled in the parent component
// loading: boolean (for UserUX)

export const FormInput = (props) => {
  const inputData = props.inputData;
  const valueData = props.valueData;
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  if (loading) {
    if (inputData.row) {
      return <LoadingInput label={t(inputData.title)} row={true} />;
    } else {
      return (
        <LoadingInput
          splitLabel={inputData.splitRow.map((item) => ({
            id: item.id,
            label: t(item.title),
          }))}
        />
      );
    }
  }

  if (inputData.row) {
    return (
      <div className="col-lg-12 mb-4">
        <label className="form-label">{t(inputData.title)}</label>
        <div>
          {inputData.options ? (
            <select
              className="form-select"
              name={inputData.name}
              onChange={props.handleEditFormChange}
              required={inputData.req}
              value={valueData[inputData.name] || ""}
              disabled={inputData.disabled}
            >
              {inputData.options.map((option) => {
                return (
                  <option key={option.id} value={option.value}>
                    {t(option.title)}
                  </option>
                );
              })}
            </select>
          ) : inputData.type === "textarea" ? (
            <textarea
              name={inputData.name}
              type={inputData.type}
              required={inputData.req}
              className="form-control"
              onChange={props.handleEditFormChange}
              value={valueData[inputData.name] || ""}
              disabled={inputData.disabled}
            />
          ) : (
            <input
              name={inputData.name}
              type={inputData.type}
              required={inputData.req}
              className="form-control"
              onChange={props.handleEditFormChange}
              value={valueData[inputData.name] || ""}
              disabled={inputData.disabled}
            />
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="row">
        {inputData.splitRow.map((item) => {
          return (
            <div className="col-lg-6 mb-4" key={item.id}>
              <label className="form-label">{t(item.title)}</label>
              {item.options ? (
                <select
                  className="form-select"
                  name={item.name}
                  required={inputData.req}
                  onChange={props.handleEditFormChange}
                  value={valueData[item.name] || ""}
                  disabled={item.disabled}
                >
                  {item.options.map((option) => {
                    return (
                      <option key={option.id} value={option.value}>
                        {t(option.title)}
                      </option>
                    );
                  })}
                </select>
              ) : item.type === "textarea" ? (
                <textarea
                  name={item.name}
                  type={item.type}
                  required={item.req}
                  className="form-control"
                  onChange={props.handleEditFormChange}
                  value={valueData[item.name] || ""}
                  disabled={item.disabled}
                />
              ) : (
                <input
                  name={item.name}
                  type={item.type}
                  required={item.req}
                  className="form-control"
                  onChange={props.handleEditFormChange}
                  value={valueData[item.name] || ""}
                  disabled={item.disabled}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
};
