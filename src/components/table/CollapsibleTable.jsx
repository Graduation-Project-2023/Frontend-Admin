import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Accordion from "react-bootstrap/Accordion";

export const CollapsibleTable = (props) => {
  const headerItems = props.headerItems;
  const title = props.title;
  const [userUX, setUserUX] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });
  const [rowItems, setRowItems] = useState([]);
  const { t } = useTranslation();

  const semesters = [
    { id: 0, title: "common.firstTerm", value: "FIRST" },
    { id: 1, title: "common.secondTerm", value: "SECOND" },
    { id: 2, title: "common.summerTerm", value: "SUMMER" },
  ];

  useEffect(() => {
    setRowItems(props.rowItems);
  }, [props.rowItems]);
  useEffect(() => {
    setUserUX(props.userUX);
  }, [props.userUX]);
  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen className="collapseTable">
      <Accordion.Item eventKey={title.id}>
        <Accordion.Header>
          {title?.level} -{" "}
          {i18next.language === "en" ? title?.englishName : title?.arabicName}
        </Accordion.Header>
        <Accordion.Body>
          {semesters.length === 0 ? (
            <h1>No Semsters</h1>
          ) : (
            semesters
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
                      {userUX.error && <h1>{userUX.errorMsg}</h1>}
                      {userUX.loading && <h1>loading</h1>}
                      <thead>
                        <tr>
                          {headerItems.map((item) => {
                            return (
                              <th
                                key={item.id}
                                className="collapsetable-header "
                              >
                                {item.title}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {rowItems
                          .filter(
                            (course) => course.semester === semester.value
                          )
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
              })
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
