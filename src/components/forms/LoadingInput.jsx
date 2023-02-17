export const LoadingInput = (props) => {
  const row = props.row;
  const splitRow = props.splitRow;
  const label = props.label;

  if (row) {
    return (
      <div className="col-lg-12 mb-4">
        <label className="form-label">{label}</label>
        <div>
          <input className="form-control loadingForm" disabled />
        </div>
      </div>
    );
  } else {
    return (
      <div className="row">
        {splitRow.map((item) => {
          return (
            <div className="col-lg-6 mb-4" key={item.id}>
              <label className="form-label">{label}</label>
              <input className="form-control loadingForm" disabled />
            </div>
          );
        })}
      </div>
    );
  }
};
