import { useTranslation } from "react-i18next";
import Accordion from "react-bootstrap/Accordion";
import cookies from "js-cookie";

export const CollapsibleTable = (props) => {
  const headerItems = props.headerItems;
  const title = props.title;
  const rowItems = props.rowItems;
  const collapseLevel = props.collapseLevel;
  const currentLanguageCode = cookies.get("i18next") || "en";
  const { t } = useTranslation();

  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen className="collapseTable">
      <Accordion.Item eventKey={title.id}>
        <Accordion.Header>
          {title?.level} -{" "}
          {currentLanguageCode === "en"
            ? title?.englishName
            : title?.arabicName}
        </Accordion.Header>
        <Accordion.Body>
          <div className="collapsetable">
            <table className="table">
              <thead>
                <tr>
                  {headerItems.map((item) => {
                    return (
                      <th key={item.id} className="collapsetable-header">
                        {item.title}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rowItems.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td className="collapsetable-items">{item.code}</td>
                      <td className="collapsetable-items">{item.arabicName}</td>
                      <td className="collapsetable-items">
                        {item.englishName}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
