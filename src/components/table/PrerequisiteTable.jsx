import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsTrash } from "react-icons/bs";

export const PrerequisiteTable = (props) => {
  const headerItems = props.headerItems;
  const deletableItems = props.deletableItems;
  const [tableData, setTableData] = useState(props.rowItems);
  const { t } = useTranslation();

  useEffect(() => {
    console.log("props.rowItems", props.rowItems);
    setTableData(props.rowItems);
  }, [props.rowItems]);

  return (
    <div className="collapsetable">
      <h3>{t(props.tableTitle)}</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            {headerItems.map((item) => {
              return (
                <th key={item.id} className="collapsetable-header">
                  {item.title}
                </th>
              );
            })}

            {deletableItems && (
              <th className="collapsetable-header">{t(`common.delete`)}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => {
            return (
              <tr key={item.id}>
                {Object.keys(item)?.map((key) => {
                  if (key === "id") return null;
                  if (key === "level") return null;
                  if (key === "levels") return null;
                  if (key === "system") return null;
                  if (key === "maxGrade") return null;
                  if (key === "semester") return null;
                  if (key === "levelId") return null;
                  if (key === "creditHours") return null;
                  if (key === "prerequisiteProgram") return null;

                  return (
                    <td className="collapsetable-items" key={key}>
                      {item[key] === 0 ? 0 : item[key] || ""}
                    </td>
                  );
                })}
                {deletableItems && (
                  <td className="collapsetable-items">
                    <BsTrash
                      className="collapsetable-items-icon"
                      onClick={(event) => props.handleDelete(item)}
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
