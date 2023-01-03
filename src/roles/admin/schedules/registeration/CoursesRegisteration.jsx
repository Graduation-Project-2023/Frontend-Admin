import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import i18next from "i18next";

// Reusable Components
import { Accordion } from "react-bootstrap";
import { SearchContainer } from "../../../../components/other/SearchContainer";
import { FormCard } from "../../../../components/forms/FormCard";

// Component Props
// userUX: object {loading, error, errorMsg}
// levels: array of objects
// programCourses: array of objects

export const CoursesRegisteration = (props) => {
  const [programCourses, setProgramCourses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [userUX, setUserUX] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setLevels(props.levels);
  }, [props.levels]);

  useEffect(() => {
    setProgramCourses(props.programCourses);
  }, [props.programCourses]);

  useEffect(() => {
    setUserUX(props.userUX);
  }, [props.userUX]);

  const handleCourseSelect = (course) => {
    navigate(`/portal/admin/study_schedules/register_course/add/${course.id}`);
  };

  return (
    <FormCard>
      <Accordion defaultActiveKey="0" alwaysOpen className="collapseSection">
        {levels?.map((item) => {
          return (
            <Accordion.Item
              eventKey={levels?.length === 1 ? "0" : `${item.id}`}
              key={item.id}
            >
              <Accordion.Header>
                {item.level}&nbsp;-&nbsp;
                {i18next.language === "en" ? item.englishName : item.arabicName}
              </Accordion.Header>
              <Accordion.Body>
                <SearchContainer
                  title={"adminNavbarkeys.choose"}
                  inputPlaceholder={"courses.name"}
                  emptyPlaceholder={"la yoogd courses"}
                  listData={programCourses.filter((course) => {
                    return course.levelId === item.id;
                  })}
                  handleListClick={handleCourseSelect}
                  userUX={userUX}
                />
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </FormCard>
  );
};
