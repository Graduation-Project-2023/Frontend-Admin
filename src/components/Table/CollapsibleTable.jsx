import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import Accordion from "react-bootstrap/Accordion";

export const CollapsibleTable = (props) => {
  const headerItems = props.headerItems;
  const title = props.title;
  const [rowItems, setRowItems] = useState([]);
  const currentLanguageCode = cookies.get("i18next") || "en";
  const { t } = useTranslation();

  const semesters = [
    { id: 0, title: "first semester", value: "FIRST" },
    { id: 1, title: "second", value: "SECOND" },
    { id: 2, title: "summer", value: "SUMMER" },
  ];

  useEffect(() => {
    setRowItems(props.rowItems);
  }, [props.rowItems]);

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
          {semesters
            .filter((prog) => {
              return rowItems.some((sem) => {
                return sem.value === prog.semester;
              });
            })
            .map((semester) => {
              return (
                <div className="collapsetable" key={semester.id}>
                  <h3>{t(semester.title)}</h3>
                  <table className="table table-striped collapsetable-scroll">
                    <thead>
                      <tr>
                        {headerItems.map((item) => {
                          return (
                            <th key={item.id} className="collapsetable-header ">
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
                            <tr
                              key={item.id}
                              onClick={(event) => {
                                props.onRowClick(item);
                              }}
                            >
                              <td className="collapsetable-items">
                                {item.code}
                              </td>
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
