import { CiEdit } from "react-icons/ci";
import { RiDeleteBackLine } from "react-icons/ri";

export const ReadOnlyRow = ({
  rowData,
  handleEditClick,
  handleDeleteClick,
  editableRow,
  deletableRow,
}) => {
  return (
    <>
      {Object.keys(rowData)?.map((key) => {
        if (key === "id") return null;
        if (key === "programId") return null;
        if (key === "maxCourses") return null;
        return (
          <td className="table-container-items" key={key}>
            {rowData[key] || ""}
          </td>
        );
      })}

      {editableRow && (
        <td className="table-container-items">
          <CiEdit
            color="#858D97"
            className="table-container-items-icon"
            onClick={(event) => handleEditClick(event, rowData)}
          />
        </td>
      )}

      {deletableRow && (
        <td className="table-container-items">
          <RiDeleteBackLine
            color="#D65050"
            className="table-container-items-icon"
            onClick={() => handleDeleteClick(rowData.id)}
          />
        </td>
      )}
    </>
  );
};
