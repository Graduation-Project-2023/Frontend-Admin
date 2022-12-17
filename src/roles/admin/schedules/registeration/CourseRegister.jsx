import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { BASE_URL } from "../../../../shared/API";
import axios from "axios";
import cookies from "js-cookie";

// Reusable Components
import { Accordion } from "react-bootstrap";
import { CoursesSidebar } from "./CoursesSidebar";
import { DropdownSearch } from "../../../../components/forms/DropdownSearch";

export const CourseRegister = (props) => {
  const [programCourses, setProgramCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [courseData, setCourseData] = useState({});
  const [profData, setProfData] = useState({ englishName: "", arabicName: "" });
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState({
    form: false,
    sidebar: false,
    submit: false,
  });
  // eslint-disable-next-line
  const [error, setError] = useState();
  const { courseId } = useParams();
  const location = useLocation();
  const authContext = useAuth();
  const { t } = useTranslation();
  const professorRef = useRef();
  const navigate = useNavigate();
  const currentLanguageCode = cookies.get("i18next") || "en";
  const menus = [
    { id: 1, title: "registered course", registered: true },
    { id: 2, title: "adminNavbar.academic" },
  ];

  useEffect(() => {
    console.log("wtf");
    setLevels(props.levels);
  }, [props.levels]);

  useEffect(() => {
    console.log("wtf");
    setProgramCourses(props.programCourses);
  }, [props.programCourses]);

  useEffect(() => {
    if (location.pathname.split("/").at(-2) === "add") {
      setCourseData(
        props.programCourses.find((course) => {
          return course.id === courseId;
        })
      );
    } else if (location.pathname.split("/").at(-2) === "edit") {
      setLoading({ ...loading, form: true });
      //   axios
      // // GET request to get the registered course data by it's id
      //     .get(
      //       BASE_URL +
      //         `/course_instances/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}/${courseId}`
      //     )
      //     .then((res) => {
      // setLoading({ ...loading, form: false });
      //       setCourseData(res.data);
      //     })
      //     .catch((error) => {
      // setLoading({ ...loading, form: false });
      //       console.log(error);
      //     });
    }
    // eslint-disable-next-line
  }, [courseId]);

  // useEffect(() => {
  // // GET request to get all registered program courses on the current semester
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
    if (state === "add") {
      navigate(
        `/admin_portal/study_schedules/register_course/add/${course.id}`
      );
    } else if (state === "edit") {
      navigate(
        `/admin_portal/study_schedules/register_course/edit/${course.id}`
      );
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading({ ...loading, submit: true });
    if (location.pathname.split("/").at(-2) === "add") {
      // // POST request to add a new course to the current semester
      // axios
      //   .post(
      //     BASE_URL +
      //       `/course_instances/semesters/{{academic_semester_id}}/levels/{{level_id}}`
      //   )
      //   .then((res) => {
      //     setLoading({ ...loading, submit: false });
      //   })
      //   .catch((error) => {
      //     setLoading({ ...loading, submit: false });
      //     console.log(error);
      //   });
    } else if (location.pathname.split("/").at(-2) === "edit") {
      // // PUT request to update the registered course data
      // axios
      //   .put(
      //     BASE_URL +
      //       `/course_instances/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}/${courseId}`,
      //   )
      //   .then((res) => {
      //     setLoading({ ...loading, submit: false });
      //     navigate("/admin_portal/study_schedules/register_course");
      //   })
      //   .catch((error) => {
      //     setLoading({ ...loading, submit: false });
      //     console.log(error);
      //   });
    }
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
        <form onSubmit={handleFormSubmit}>
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
                {t(`el mostawa`)}
              </label>
              <div className="col-sm-8">
                <select
                  className="form-select"
                  value={courseData?.levelId || ""}
                >
                  {levels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.level}&nbsp;-&nbsp;
                      {currentLanguageCode === "en"
                        ? level.englishName
                        : level.arabicName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-4">
              <DropdownSearch
                name={profData}
                menuData={[]}
                label={"esm moshrf el mada"}
                inputPlaceholder={"ektb esm el moshrf"}
              />
            </div>
          </div>
          <button
            type="submit"
            className="form-card-button form-card-button-save"
          >
            {location.pathname.split("/").at(-2) === "add"
              ? t(`common.add`)
              : t(`common.save`)}
          </button>
          <button
            type="reset"
            className="form-card-button form-card-button-cancel"
          >
            {t(`common.cancel`)}
          </button>
        </form>
      </div>
    </div>
  );
};
