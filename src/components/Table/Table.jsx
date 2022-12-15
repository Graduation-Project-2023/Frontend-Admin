import { useTranslation } from "react-i18next";
import { ReadOnlyRow } from "./ReadOnlyRow";
import { EditableRow } from "./EditableRow";
import { useState, useEffect } from "react";

export const Table = (props) => {
  const headerItems = props.headerItems;
  const editableItems = props.editableItems;
  const deletableItems = props.deletableItems;
  const { t } = useTranslation();
  const [data, setData] = useState(props.rowItems);
  const [editRowData, setEditRowData] = useState({
    ...data[0],
  });

  const [editRowId, setEditRowId] = useState(null);

  useEffect(() => {
    setData(props.rowItems);
  }, [props.rowItems]);

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
      ...editRowData,
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
      ...rowData,
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
              {editRowId && deletableItems ? (
                <th className="table-container-header">{t(`common.cancel`)}</th>
              ) : (
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
