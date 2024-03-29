import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { RiDeleteBackLine } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";
import i18next from "i18next";

export const CoursesTable = (props) => {
  const [courses, setCourses] = useState([]);
  const [courseInstancesIds, setCourseInstancesIds] = useState([]);
  const [tableLevel, setTableLevel] = useState();
  const [userUX, setUserUX] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });
  const { t } = useTranslation();
  const levels = props.levels;

  useEffect(() => {
    console.log(props.courses);
    setCourses(props.courses);
  }, [props.courses]);

  useEffect(() => {
    setCourseInstancesIds(props.courseInstances);
  }, [props.courseInstances]);

  useEffect(() => {
    setUserUX(props.userUX);
  }, [props.userUX]);

  return (
    <div className="table-container">
      <div className="table-container-register">
        <h5>{t(props.tableTitle)}</h5>
        <div>
          {levels.map((level) => {
            return (
              <button
                onClick={() => setTableLevel(level.id)}
                key={level.id}
                className={
                  level.id === tableLevel
                    ? "table-container-register-btn-active"
                    : ""
                }
              >
                {level.level}
              </button>
            );
          })}
        </div>
      </div>
      {levels.map((level) => {
        if (level.id !== tableLevel) return null;
        else {
          return (
            <table className="table table-bordered" key={level.id}>
              <thead>
                <tr>
                  {props.headerItems.map((item) => {
                    return (
                      <th key={item.id} className="table-container-header">
                        {item.title}
                      </th>
                    );
                  })}
                  <th className="table-container-header">
                    {t(`common.add/delete`)}
                  </th>
                </tr>
              </thead>
              {userUX.error && userUX.errorMsg}
              {userUX.loading ? (
                "loading...'"
              ) : (
                <tbody>
                  {courses
                    .filter((item) => item.level.id === level.id)
                    .map((item) => {
                      if (item.classes.length === 0) return null;
                      else {
                        return (
                          <tr key={item.classes[0].id}>
                            {props.headerItems.map((heading) => {
                              if (heading.name === "name") {
                                return (
                                  <td
                                    key={heading.id}
                                    style={{ textAlign: "center" }}
                                  >
                                    {i18next.language === "en"
                                      ? item.classes[0]["englishName"]
                                      : item.classes[0]["arabicName"]}
                                  </td>
                                );
                              } else if (heading.name === "day") {
                                return (
                                  <td
                                    key={heading.id}
                                    style={{ textAlign: "center" }}
                                  >
                                    {t(
                                      `week.${item.classes[0][
                                        "day"
                                      ].toLowerCase()}`
                                    )}
                                  </td>
                                );
                              } else {
                                return (
                                  <td
                                    key={heading.id}
                                    style={{ textAlign: "center" }}
                                  >
                                    {item.classes[0][heading.name]}
                                  </td>
                                );
                              }
                            })}
                            <td style={{ textAlign: "center" }}>
                              {courseInstancesIds.includes(
                                item.classes[0].courseInstanceId
                              ) ? (
                                <RiDeleteBackLine
                                  color="#D65050"
                                  className="table-container-items-icon"
                                  onClick={() =>
                                    props.removeCourseFromTable(item.classes)
                                  }
                                />
                              ) : (
                                <AiOutlinePlusCircle
                                  color="blue"
                                  className="table-container-items-icon"
                                  onClick={() =>
                                    props.addCourseToTable(item.classes)
                                  }
                                />
                              )}
                            </td>
                          </tr>
                        );
                      }
                    })}
                </tbody>
              )}
            </table>
          );
        }
      })}
    </div>
  );
};
