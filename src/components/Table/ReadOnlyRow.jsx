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
      <td className="table-container-items">{rowData.title}</td>
      <td className="table-container-items">{rowData.level}</td>
      <td className="table-container-items">{rowData.minHours}</td>
      <td className="table-container-items">{rowData.maxHours}</td>

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
