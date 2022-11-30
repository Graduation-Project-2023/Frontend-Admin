import { useTranslation } from "react-i18next";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBackLine } from "react-icons/ri";

export const Table = (props) => {
  const tabletitle=props.tabletitle;
  const headerItems = props.headerItems;
  const rowItems = props.rowItems;
  const editableItems = props.editableItems;
  const deletableItems = props.deletableItems;
  const { t } = useTranslation();
  

  return (
    <div className="tablecard">
    <table className="table tbl">

      <thead>

        <tr>
          {headerItems.map((item) => {
            return <th key={item.id} className="tbl-header">{item.title}</th>;
          })}
          {editableItems && <th className="tbl-header">{t(`common.edit`)}</th>}
          {deletableItems && <th className="tbl-header" >{t(`common.delete`)}</th>}
        </tr>
      </thead>
      
      <tbody>
        {rowItems.map((item) => {
          return (
            <tr key={item.id}>
              <td className="tbl-items">{item.title}</td>
              <td className="tbl-items">{item.level}</td>
              <td className="tbl-items">{item.minHours}</td>
              <td className="tbl-items">{item.maxHours}</td>
              {editableItems && <td className="tbl-items"><CiEdit color="#858D97"fontSize="1.5rem" /></td>}
              {deletableItems && <td className="tbl-items"><RiDeleteBackLine color="#D65050" fontSize="1.5rem"/></td>}
            </tr>
          );
        })}
        
      </tbody>
      
    </table>
    </div>
  );
};
