import React from "react";
import { FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { useTranslation } from "react-i18next";

export const EditableRow = ({
  editRowData,
  handleCancelClick,
  handleEditFormChange,
}) => {
  
  const { t } = useTranslation();

  return (
    <>
      {Object.keys(editRowData)?.map((key) => {
        if (key === "id") return null;
        const type = typeof editRowData[key] === "number" ? "number" : "text";
        return (
          <td className="table-container-items" key={key}>
            <input
              type={type}
              required
              placeholder="Enter a new value..."
              name={key}
              value={editRowData[key]}
              onChange={handleEditFormChange}
            />
          </td>
        );
      })}

      <td className="table-container-items">
        <button type="submit">
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
