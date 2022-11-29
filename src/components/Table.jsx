import { useTranslation } from "react-i18next";

export const Table = (props) => {
  const headerItems = props.headerItems;
  const rowItems = props.rowItems;
  const editableItems = props.editableItems;
  const deletableItems = props.deletableItems;

  return (
    <table>
      <thead>
        <tr>
          {headerItems.map((item) => {
            return <th key={item.id}>{item.title}</th>;
          })}
          {editableItems && <th>Edit</th>}
          {deletableItems && <th>Delete</th>}
        </tr>
      </thead>
      <tbody>
        {rowItems.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.level}</td>
              <td>{item.minHours}</td>
              <td>{item.maxHours}</td>
            </tr>
          );
        })}
        
      </tbody>
    </table>
  );
};
