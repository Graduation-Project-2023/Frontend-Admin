import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";

// eslint-disable-next-line
import { BASE_URL } from "../../../../shared/API";
// eslint-disable-next-line
import axios from "axios";
import cookies from "js-cookie";

// Reusable Components
import { CoursesSidebar } from "./CoursesSidebar";
import { DropdownSearch } from "../../../../components/forms/DropdownSearch";

export const CourseRegister = (props) => {
  const [programCourses, setProgramCourses] = useState([]);
  // eslint-disable-next-line
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [courseData, setCourseData] = useState({});
  // eslint-disable-next-line
  const [profData, setProfData] = useState({ englishName: "", arabicName: "" });
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState({
    form: false,
    sidebar: false,
    submit: false,
  });
  const lectureHourRef = useRef();
  const sectionHourRef = useRef();
  const creditHourRef = useRef();
  // eslint-disable-next-line
  const [error, setError] = useState();
  // eslint-disable-next-line
  const authContext = useAuth();
  const { courseId } = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentLanguageCode = cookies.get("i18next") || "en";
  const menus = [
    { id: "0", title: "adminNavbar.academic" },
    { id: "1", title: "registered course", registered: true },
  ];

  useEffect(() => {
    setLevels(props.levels);
  }, [props.levels]);

  useEffect(() => {
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
  const handleChange = (event) => {
    event.preventDefault();

    if (event.target.type === "number") {
      event.target.value = +event.target.value;
    }
    if (
      +lectureHourRef.current.value + +sectionHourRef.current.value !==
      creditHourRef.current.value
    ) {
      console.log("enter correct value");
    }
  };
  return (
    <>
      <div className="registerationContainer-body">
        <div className={`registerationContainer-menu `}>
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
        </div>
        <div className="registerationContainer-form">
          <h3>
            {currentLanguageCode === "en"
              ? courseData?.englishName
              : courseData?.arabicName}
          </h3>
          <form onSubmit={handleFormSubmit}>
            <div className="registerationContainer-form-inputs">
              <div className="row mb-4">
                <label className="form-label">{t(`courses.name`)}</label>
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
              <div className=" row mb-4">
                <div className="col-sm-6">
                  <label className="form-label">{t(`courses.code`)}</label>

                  <input
                    className="form-control"
                    value={courseData?.code || ""}
                    readOnly
                    disabled
                  />
                </div>
                <div className="col-sm-6">
                  <label className="form-label">{t(`courses.hours`)}</label>

                  <input
                    className="form-control"
                    value={"4"}
                    ref={creditHourRef}
                    readOnly
                    disabled
                  />
                </div>
              </div>
              <div className=" row mb-4">
                <label className="form-label">{t(`levels.level`)}</label>

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
              <div className=" mb-4">
                <label className="form-label">{t(`esm el moshrf`)}</label>
                <DropdownSearch
                  name={profData}
                  menuData={[]}
                  label={"esm moshrf el mada"}
                  inputPlaceholder={"ektb esm el moshrf"}
                />
              </div>
              <div className="row mb-4">
                <div className="col-sm-6">
                  <label className="form-label">{t(`courses.lectures`)}</label>
                  <input className="form-control" />
                </div>
                <div className="col-sm-6">
                  <label className="form-label">{t(`courses.lecture`)}</label>
                  <input
                    className="form-control"
                    ref={lectureHourRef}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className=" row mb-4">
                <div className="col-sm-6">
                  <label className="form-label">{t(`courses.sections`)}</label>

                  <input className="form-control" />
                </div>
                <div className="col-sm-6">
                  <label className="form-label">{t(`courses.section`)}</label>

                  <input
                    className="form-control"
                    ref={sectionHourRef}
                    onChange={handleChange}
                  />
                </div>
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
    </>
  );
};
