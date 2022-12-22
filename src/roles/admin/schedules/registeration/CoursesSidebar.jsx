import { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";

import { Accordion } from "react-bootstrap";

export const CoursesSidebar = (props) => {
  const listData = props.listData;
  const [levels, setLevels] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredList, setFilteredList] = useState(listData);
  const authContext = useAuth();
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    setLevels(authContext.program.levels);
    // eslint-disable-next-line
  }, [authContext.program.id]);

  useEffect(() => {
    setFilteredList(
      listData.filter(
        (item) =>
          item.englishName.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.arabicName.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    // eslint-disable-next-line
  }, [searchValue]);

  useEffect(() => {
    setFilteredList(props.listData);
    // eslint-disable-next-line
  }, [props.listData]);

  return (
    <Accordion
      defaultActiveKey={["0"]}
      alwaysOpen
      className={props.registered ? "assignedPrograms" : "notAssignedPrograms"}
    >
      <Accordion.Item eventKey={props.eventKey} key={props.eventKey}>
        <Accordion.Header>
          <h3>{t(props.title)}</h3>
        </Accordion.Header>
        <Accordion.Body className="registerationContainer-menu-searchList">
          <div className="registerationContainer-menu-search">
            <input
              type="text"
              placeholder={t("courses.name")}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </div>
          {searchValue === "" ? (
            <Accordion
              defaultActiveKey="0"
              alwaysOpen
              className="registerationContainer-menu-collapse"
            >
              {levels.map((item) => (
                <Accordion.Item
                  eventKey={item.id}
                  key={item.id}
                  className="registerationContainer-menu-collapse-item"
                >
                  <Accordion.Header>
                    {currentLanguageCode === "en"
                      ? item.englishName || ""
                      : item.arabicName || ""}{" "}
                  </Accordion.Header>

                  <Accordion.Body
                    className="registerationContainer-menu-list"
                    style={{ padding: "0" }}
                  >
                    {filteredList
                      .filter((obj) => obj.levelId === item.id)
                      .map((item) => (
                        <li
                          key={item.id}
                          onClick={(event) => {
                            props.registered
                              ? props.handleListClick("edit", item)
                              : props.handleListClick("add", item);
                          }}
                        >
                          {currentLanguageCode === "en"
                            ? item.englishName
                            : item.arabicName}
                        </li>
                      ))}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          ) : (
            filteredList.map((item) => (
              <li
                key={item.id}
                onClick={(event) => {
                  props.registered
                    ? props.handleListClick("edit", item)
                    : props.handleListClick("add", item);
                }}
              >
                {currentLanguageCode === "en"
                  ? item.englishName
                  : item.arabicName}
              </li>
            ))
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
