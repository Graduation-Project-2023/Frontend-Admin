import { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { Accordion } from "react-bootstrap";
import { NoData } from "../../../../components/UX/NoData";

// Component Props:
// userUX: object {loading, error, errorMsg}
// listData: array of objects
// title: string

export const CoursesSidebar = (props) => {
  const listData = props.listData;
  const [userUX, setUserUX] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });
  const [levels, setLevels] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredList, setFilteredList] = useState(listData);
  const authContext = useAuth();
  const { t } = useTranslation();

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
  }, [props.listData]);

  useEffect(() => {
    setUserUX(props.userUX);
  }, [props.userUX]);

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
                    {i18next.language === "en"
                      ? item.englishName || ""
                      : item.arabicName || ""}{" "}
                  </Accordion.Header>
                  {userUX.error && "error"}
                  {userUX.loading ? (
                    <h1>loading</h1>
                  ) : (
                    <Accordion.Body
                      className="registerationContainer-menu-list"
                      style={{ padding: "0" }}
                    >
                      {filteredList.filter((obj) => obj.levelId === item.id)
                        .length === 0 ? (
                        <NoData />
                      ) : (
                        filteredList
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
                              {i18next.language === "en"
                                ? item.englishName
                                : item.arabicName}
                            </li>
                          ))
                      )}
                    </Accordion.Body>
                  )}
                </Accordion.Item>
              ))}
            </Accordion>
          ) : (
            <>
              {filteredList.length === 0 && <NoData />}
              {filteredList.map((item) => (
                <li
                  key={item.id}
                  onClick={(event) => {
                    props.registered
                      ? props.handleListClick("edit", item)
                      : props.handleListClick("add", item);
                  }}
                >
                  {i18next.language === "en"
                    ? item.englishName
                    : item.arabicName}
                </li>
              ))}
            </>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
