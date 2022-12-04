import { FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

export const EditableRow = ({
  editRowData,
  handleCancelClick,
  handleEditFormChange,
}) => {
  return (
    <>
      {Object.keys(editRowData)?.map((key) => {
        if (key === "id") return null;
        if (key === "programId") return null;
        if (key === "maxCourses") return null;
        if (key === "levelId") return null;
        const type = typeof editRowData[key] === "number" ? "number" : "text";
        return (
          <td className="table-container-items" key={key}>
            <input
              type={type}
              required
              placeholder="Enter a new value..."
              name={key}
              value={editRowData[key] === 0 ? 0 : editRowData[key] || ""}
              onChange={handleEditFormChange}
              className="form-control"
            />
          </td>
        );
      })}

      <td className="table-container-items">
        <button type="submit" className="table-container-items-button">
          <FaCheck color="#858D97" className="table-container-items-icon" />
        </button>
      </td>

      <td className="table-container-items">
        <GiCancel
          color="#D65050"
          className="table-container-items-icon"
          onClick={handleCancelClick}
        />
      </td>
    </>
  );
};
