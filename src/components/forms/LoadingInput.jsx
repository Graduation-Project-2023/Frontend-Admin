// Component Props:
// row: boolean to determine if the input is a row or split row
// label: string (for row)
// splitLabel: array of objects (for split row {id, label})

export const LoadingInput = (props) => {
  const row = props.row;
  const label = props.label;
  const splitLabel = props.splitLabel;

  if (row) {
    return (
      <div className="col-lg-12 mb-4">
        <label className="form-label">{label}</label>
        <div className="form-control loadingForm">
          <div className="loadingForm-shimmer"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="row">
        {splitLabel.map((item) => {
          return (
            <div className="col-lg-6 mb-4" key={item.id}>
              <label className="form-label">{item.label}</label>
              <div className="form-control loadingForm ">
                <div className="loadingForm-shimmer"></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
