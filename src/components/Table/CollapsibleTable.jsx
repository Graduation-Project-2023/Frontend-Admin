import { useTranslation } from "react-i18next";
import Accordion from "react-bootstrap/Accordion";
import cookies from "js-cookie";
import { useEffect, useState } from "react";

export const CollapsibleTable = (props) => {
  const headerItems = props.headerItems;
  const title = props.title;
  const [rowItems, setRowItems] = useState(props.rowItems);
  const currentLanguageCode = cookies.get("i18next") || "en";
  const { t } = useTranslation();

  useEffect(() => {
    setRowItems(props.rowItems);
  }, [props.rowItems]);

  const semesters = [
    { id: 0, title: "first semester", value: "FIRST" },
    { id: 1, title: "second", value: "SECOND" },
    { id: 2, title: "summer", value: "SUMMER" },
  ];

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
          {semesters.map((semester) => {
            return (
              <div className="collapsetable" key={semester.id}>
                <h3>{t(semester.title)}</h3>
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
                    {rowItems
                      .filter((course) => course.semester === semester.value)
                      .map((item) => {
                        return (
                          <tr key={item.id}>
                            <td className="collapsetable-items">{item.code}</td>
                            <td className="collapsetable-items">
                              {item.arabicName}
                            </td>
                            <td className="collapsetable-items">
                              {item.englishName}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            );
          })}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
