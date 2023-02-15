import { useTranslation } from "react-i18next";

export const LoadingInput = (props) => {
  const row = props.row;
  const label = props.label;

  if (row) {
    return (
      <div className="col-lg-12 mb-4">
        <label className="form-label">{label}</label>
        <div>
          <input className="form-control" />
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
