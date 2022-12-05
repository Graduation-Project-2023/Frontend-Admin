import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsTrash } from "react-icons/bs";

export const PrerequisiteTable = (props) => {
  const headerItems = props.headerItems;
  const deletableItems = props.deletableItems;
  const [tableData, setTableData] = useState(props.rowItems);
  const { t } = useTranslation();

  useEffect(() => {
    setTableData(props.rowItems);
  }, [props.rowItems]);

  return (
    <div className="table-container">
      <h4>{t(props.tableTitle)}</h4>
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

            {deletableItems && (
              <th className="table-container-header">{t(`common.delete`)}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => {
            return (
              <tr key={item.id}>
                {Object.keys(item)?.map((key) => {
                  if (key === "id") return null;
                  return (
                    <td className="table-container-items" key={key}>
                      {item[key] === 0 ? 0 : item[key] || ""}
                    </td>
                  );
                })}
                {deletableItems && (
                  <td className="table-container-items">
                    <BsTrash
                      color="red"
                      onClick={(event) => props.handleDelete(item)}
                      className="table-container-items-icon"
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
