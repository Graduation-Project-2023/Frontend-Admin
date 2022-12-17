import { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { BASE_URL } from "../../../../shared/API";
import axios from "axios";
import cookies from "js-cookie";

// Reusable Components
import { Accordion } from "react-bootstrap";
import { CoursesSidebar } from "./CoursesSidebar";

export const CourseRegister = (props) => {
  const [programCourses, setProgramCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [courseData, setCourseData] = useState({});
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState();
  const { courseId } = useParams();
  const location = useLocation();
  const authContext = useAuth();
  const { t } = useTranslation();
  const professorRef = useRef();
  const currentLanguageCode = cookies.get("i18next") || "en";
  const menus = [
    { id: 1, title: "registered course", registered: true },
    { id: 2, title: "adminNavbar.academic" },
  ];

  useEffect(() => {
    setLevels(props.levels);
  }, [props.levels]);

  useEffect(() => {
    setProgramCourses(props.programCourses);
    if (location.pathname.split("/").at(-2) === "add") {
      setCourseData(
        props.programCourses.find((course) => {
          return course.id === courseId;
        })
      );
    }
  }, [props.programCourses]);

  // useEffect(() => {
  // // Request to get all registered program courses on the current semester
  //   axios
  //     .get(
  //       BASE_URL +
  //         `/course_instances/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}`
  //     )
  //     .then((res) => {
  //       setRegisteredCourses(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   // eslint-disable-next-line
  // }, [authContext.program.id]);
  const handleListClick = (state, course) => {
    console.log(state);
    console.log(course);
  };

  return (
    <div className="registerationContainer-body">
      {menus.map((menu) => (
        <CoursesSidebar
          key={menu.id}
          title={menu.title}
          listData={menu.registered ? registeredCourses : programCourses}
          handleListClick={handleListClick}
          registered={menu.registered}
          eventKey={menu.id}
        />
      ))}
      <div className="registerationContainer-form">
        <h3>
          {currentLanguageCode === "en"
            ? courseData?.englishName
            : courseData?.arabicName}
        </h3>
        <form>
          <div className="registerationContainer-form-inputs">
            <div className="row mb-4">
              <label className="col-sm-4 col-form-label">
                {t(`courses.name`)}
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  value={
                    currentLanguageCode === "en"
                      ? courseData?.englishName || ""
                      : courseData?.arabicName || ""
                  }
                  readOnly
                  disabled
                />
              </div>
            </div>
            <div className="row mb-4">
              <label className="col-sm-4 col-form-label">
                {t(`courses.code`)}
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  value={courseData?.code || ""}
                  readOnly
                  disabled
                />
              </div>
            </div>
            <div className="row mb-4">
              <label className="col-sm-4 col-form-label">
                {t(`esm moshrf el mada`)}
              </label>
              <div className="col-sm-8">
                <input className="form-control" ref={professorRef} />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="form-card-button form-card-button-save"
          >
            {t(`common.save`)}
          </button>
          <button
            type="reset"
            className="form-card-button form-card-button-cancel"
            onClick={() => console.log(courseData)}
          >
            {t(`common.cancel`)}
          </button>
        </form>
      </div>
    </div>
  );
};
