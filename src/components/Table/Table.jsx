import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBackLine } from "react-icons/ri";

export const Table = (props) => {
  const headerItems = props.headerItems;
  const rowItems = props.rowItems;
  const editableItems = props.editableItems;
  const deletableItems = props.deletableItems;
  const [editableRow, setEditableRow] = useState(false);
  const { t } = useTranslation();

  const handleRowEdit = (item) => {};
  const handleRowDelete = (item) => {};

  return (
    <div className="table-container">
      <h3>{t(props.tableTitle)}</h3>
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
          {rowItems.map((item) => {
            return (
              <tr key={item.id}>
                <td className="table-container-items">{item.title}</td>
                <td className="table-container-items">{item.level}</td>
                <td className="table-container-items">{item.minHours}</td>
                <td className="table-container-items">{item.maxHours}</td>
                {editableItems && (
                  <td className="table-container-items">
                    <CiEdit
                      color="#858D97"
                      className="table-container-items-icon"
                      onClick={() => {
                        handleRowEdit(item);
                      }}
                    />
                  </td>
                )}
                {deletableItems && (
                  <td className="table-container-items">
                    <RiDeleteBackLine
                      color="#D65050"
                      className="table-container-items-icon"
                      onClick={() => {
                        handleRowDelete(item);
                      }}
                    />
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
