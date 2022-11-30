import { useTranslation } from "react-i18next";
import { ReadOnlyRow } from "./ReadOnlyRow";
import { EditableRow } from "./EditableRow";
import { useState } from "react";

export const Table = (props) => {
  const headerItems = props.headerItems;
  const editableItems = props.editableItems;
  const deletableItems = props.deletableItems;
  const { t } = useTranslation();

  const [data, setData] = useState(props.rowItems);

  const [editRowData, setEditRowData] = useState({
    title: "",
    level: "",
    minHours: "",
    maxHours: ""
  });

  const [editRowId, setEditRowId] = useState(null);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newRowData = { ...editRowData };
    newRowData[fieldName] = fieldValue;

    setEditRowData(newRowData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedRow = {
      id: editRowId,
      title: editRowData.title,
      level: editRowData.level,
      minHours: editRowData.minHours,
      maxHours: editRowData.maxHours,
    };

    const newData = [...data];

    const index = data.findIndex((item) => item.id === editRowId);

    newData[index] = editedRow;

    setData(newData);
    setEditRowId(null);
  };

  const handleEditClick = (event, rowData) => {
    event.preventDefault();
    setEditRowId(rowData.id);

    const formValues = {
      title: rowData.title,
      level: rowData.level,
      minHours: rowData.minHours,
      maxHours: rowData.maxHours,
    };

    setEditRowData(formValues);
  };

  const handleCancelClick = () => {
    setEditRowId(null);
  };

  const handleDeleteClick = (rowId) => {
    const newData = [...data];

    const index = data.findIndex((item) => item.id === rowId);

    newData.splice(index, 1);

    setData(newData);
  };

  return (
    <div className="table-container">
      <h3>{t(props.tableTitle)}</h3>
      <form onSubmit={handleEditFormSubmit}>
        <table className="table">
          <thead>
            <tr>
              {headerItems.map((item) => {
                return (
                  <th key={item.id} className="table-container-header">
                    {item.title}
                  </th>
                );
              })}
              {editableItems && (
                <th className="table-container-header">{t(`common.edit`)}</th>
              )}
              {deletableItems && (
                <th className="table-container-header">{t(`common.delete`)}</th>
              )}
            </tr>
          </thead>

          <tbody>
            {data.map((item) => {
              return (
                <tr key={item.id}>
                  {editRowId === item.id ? (
                    <EditableRow
                      editRowData={editRowData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      rowData={item}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                      editableRow={editableItems}
                      deletableRow={deletableItems}
                    />
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
};
