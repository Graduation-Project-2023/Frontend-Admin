import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie";

// Reusable Components
import { Accordion } from "react-bootstrap";
import { SearchContainer } from "../../../../components/other/SearchContainer";
import { FormCard } from "../../../../components/forms/FormCard";

export const CoursesRegisteration = (props) => {
  const [programCourses, setProgramCourses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState();
  const currentLanguageCode = cookies.get("i18next") || "en";
  const navigate = useNavigate();

  useEffect(() => {
    setLevels(props.levels);
  }, [props.levels]);

  useEffect(() => {
    setProgramCourses(props.programCourses);
  }, [props.programCourses]);

  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  const handleCourseSelect = (course) => {
    navigate(`/admin_portal/study_schedules/register_course/add/${course.id}`);
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
                {currentLanguageCode === "en"
                  ? item.englishName
                  : item.arabicName}
              </Accordion.Header>
              <Accordion.Body>
                <SearchContainer
                  title={"adminNavbarkeys.choose"}
                  placeholder={"courses.name"}
                  emptyListPlaceholder={
                    programCourses.filter((course) => {
                      return course.levelId === item.id;
                    }).length === 0
                      ? "la yooogd courses"
                      : ""
                  }
                  listLoading={loading}
                  listData={programCourses.filter((course) => {
                    return course.levelId === item.id;
                  })}
                  handleListClick={handleCourseSelect}
                />
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </FormCard>
  );
};
