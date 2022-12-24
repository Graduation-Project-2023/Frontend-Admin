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
// eslint-disable-next-line
import { DropdownSearch } from "../../../../components/forms/DropdownSearch";

export const CourseRegister = (props) => {
  const [programCourses, setProgramCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [courseData, setCourseData] = useState({});
  // eslint-disable-next-line
  const [profData, setProfData] = useState({ englishName: "", arabicName: "" });
  const [levels, setLevels] = useState([]);

  const [userUX, setUserUX] = useState({
    totalHours: false,
    siderbarLoading: false,
    siderbarError: false,
    registeredSiderbarBodyLoading: false,
    registeredSiderbarBodyError: false,
    errorMsg: "",
    submitLoading: false,
    formLoading: false,
    formError: false,
  });
  useEffect(() => {
    setUserUX((prev) => ({
      ...prev,
      formLoading: props.loading,
    }));
  }, [props.loading]);

  const lectureHrsRef = useRef();
  const labHrsRef = useRef();
  const authContext = useAuth();
  const { courseId } = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLocation = location.pathname.split("/").at(-2);
  const menus = [
    { id: "0", title: "common.coursesNotReg" },
    { id: "1", title: "common.regCourses", registered: true },
  ];

  useEffect(() => {
    setLevels(props.levels);
  }, [props.levels]);

  useEffect(() => {
    setProgramCourses(props.programCourses);
  }, [props.programCourses]);

  useEffect(() => {
    if (currentLocation === "add") {
      setCourseData(
        props.programCourses.find((course) => {
          return course.id === courseId;
        })
      );
    } else if (currentLocation === "edit") {
      if (props.programCourses.length !== 0) {
        setUserUX((prev) => ({ ...prev, formLoading: true }));
        // GET request to get the registered course data by it's id
        axios
          .get(
            BASE_URL +
              `/course_instances/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}/${courseId}`
          )
          .then((res) => {
            console.log(res.data);
            setCourseData(res.data);
            setUserUX((prev) => ({ ...prev, formLoading: false }));
          })
          .catch((error) => {
            setUserUX((prev) => ({
              ...prev,
              formLoading: false,
              formError: true,
              errorMsg: "There is an error in form Data",
            }));
            console.log(error);
          });
      }
    }
    // eslint-disable-next-line
  }, [courseId, props.programCourses]);

  useEffect(() => {
    // GET request to get all registered program courses on the current semester
    setUserUX((prev) => ({ ...prev, registeredSiderbarBodyLoading: true }));
    axios
      .get(
        BASE_URL +
          `/course_instances/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}`
      )
      .then((res) => {
        setRegisteredCourses(res.data);
        setUserUX((prev) => ({
          ...prev,
          registeredSiderbarBodyLoading: false,
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          registeredSiderbarBodyLoading: false,
          siderbarBodyError: true,
          errorMsg: "there is an error in Regitered course",
        }));
      });
    // eslint-disable-next-line
  }, [authContext.program.id]);

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

  const handleFormChange = (event) => {
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    if (event.target.type === "number") {
      fieldValue = +fieldValue;
    }
    if (
      +lectureHrsRef.current.value + +labHrsRef.current.value >
      courseData.creditHours
    ) {
      setUserUX((prev) => ({ ...prev, totalHours: true }));
      setCourseData((prev) => ({
        ...prev,
        lectureHrs: 0,
        labHrs: 0,
      }));
      return;
    }
    setUserUX((prev) => ({ ...prev, totalHours: false }));
    const course = { ...courseData };
    course[fieldName] = fieldValue;
    setCourseData(course);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      userUX.totalHours ||
      +lectureHrsRef.current.value + +labHrsRef.current.value !==
        courseData.creditHours
    ) {
      setUserUX((prev) => ({ ...prev, totalHours: true }));
      return;
    }
    const course = {
      ...courseData,
      academicSemesterId: "decc46ba-7d4b-11ed-a1eb-0242ac120002",
    };
    delete course.semester;
    setUserUX((prev) => ({ ...prev, submitLoading: true }));
    if (currentLocation === "add") {
      course["programCourseId"] = courseData.id;
      delete course.id;
      console.log(course);
      // POST request to add a new course to the current semester
      axios
        .post(
          BASE_URL +
            `/course_instances/semesters/{{academic_semester_id}}/programs/${authContext.program.id}`,
          course
        )
        .then((res) => {
          console.log(res);
          setUserUX((prev) => ({ ...prev, submitLoading: false }));
        })
        .catch((error) => {
          setUserUX((prev) => ({
            ...prev,
            submitLoading: false,
            submitError: true,
            errorMsg: "there is an error in submit",
          }));
          console.log(error);
        });
    } else if (currentLocation === "edit") {
      // PUT request to update the registered course data
      delete course.id;
      axios
        .put(
          BASE_URL +
            `/course_instances/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}/${courseData.id}`,
          course
        )
        .then((res) => {
          console.log(res);

          // navigate("/admin_portal/study_schedules/register_course");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCourseDelete = () => {
    // DELETE request to delete the registered course
    axios
      .delete(
        BASE_URL +
          `/course_instances/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}/${courseData.id}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
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
            userUX={{
              levelsLoading: userUX.siderbarLoading,
              registertedCoursesLoading: userUX.registeredSiderbarBodyLoading,
              levelsError: userUX.siderbarError,
              registeredCoursesError: userUX.registeredSiderbarBodyError,
            }}
          />
        ))}
      </div>
      <div className="registerationContainer-form">
        <h3>
          {currentLocation === "add"
            ? t(`common.addCourse`)
            : t(`common.editCourse`)}
        </h3>
        <form onSubmit={handleFormSubmit}>
          <div className="registerationContainer-form-inputs">
            <div className="row mb-4">
              <label className="form-label">{t(`courses.name`)}</label>
              {userUX.formError ? (
                userUX.errorMsg
              ) : userUX.formLoading ? (
                "loading"
              ) : (
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
              )}
            </div>
            <div className=" row mb-4">
              <div className="col-sm-6">
                <label className="form-label">{t(`courses.code`)}</label>
                {userUX.formError ? (
                  userUX.errorMsg
                ) : userUX.formLoading ? (
                  <h1>loading</h1>
                ) : (
                  <input
                    className="form-control"
                    value={courseData?.code || ""}
                    readOnly
                    disabled
                  />
                )}
              </div>
              <div className="col-sm-6">
                <label className="form-label">{t(`courses.hours`)}</label>
                {userUX.formError ? (
                  userUX.errorMsg
                ) : userUX.formLoading ? (
                  <h1>loading</h1>
                ) : (
                  <input
                    className="form-control"
                    value={courseData?.creditHours || ""}
                    readOnly
                    disabled
                  />
                )}
              </div>
            </div>
            <div className=" row mb-4">
              <label className="form-label">{t(`levels.level`)}</label>
              {userUX.formError ? (
                userUX.errorMsg
              ) : userUX.formLoading ? (
                "loading"
              ) : (
                <select
                  className="form-select"
                  name="levelId"
                  value={courseData?.levelId || ""}
                  onChange={handleFormChange}
                >
                  <option value={null}>{t(`common.select`)}</option>
                  {levels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.level}&nbsp;-&nbsp;
                      {currentLanguageCode === "en"
                        ? level.englishName
                        : level.arabicName}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {/* <div className="mb-4">
                <label className="form-label">{t(`esm el moshrf`)}</label>
                <DropdownSearch
                  name={profData}
                  menuData={[]}
                  label={"esm moshrf el mada"}
                  inputPlaceholder={"ektb esm el moshrf"}
                />
              </div> */}
            <div className="row mb-4">
              <div className="col-sm-6">
                <label className="form-label">{t(`courses.lecture`)}</label>
                {userUX.formError ? (
                  userUX.errorMsg
                ) : userUX.formLoading ? (
                  <h1>loading</h1>
                ) : (
                  <input
                    className="form-control"
                    type="number"
                    name="lectureHrs"
                    ref={lectureHrsRef}
                    value={courseData?.lectureHrs || ""}
                    onChange={handleFormChange}
                    required
                  />
                )}
              </div>
              <div className="col-sm-6">
                <label className="form-label">{t(`courses.lectures`)}</label>
                {userUX.formError ? (
                  userUX.errorMsg
                ) : userUX.formLoading ? (
                  <h1>loading</h1>
                ) : (
                  <input
                    className="form-control"
                    name="lectureCount"
                    type="number"
                    value={courseData?.lectureCount || ""}
                    onChange={handleFormChange}
                  />
                )}
              </div>
            </div>
            <div className=" row mb-4">
              <div className="col-sm-6">
                <label className="form-label">{t(`courses.section`)}</label>
                {userUX.formError ? (
                  userUX.errorMsg
                ) : userUX.formLoading ? (
                  <h1>loading</h1>
                ) : (
                  <input
                    className="form-control"
                    name="labHrs"
                    type="number"
                    value={courseData?.labHrs || ""}
                    ref={labHrsRef}
                    onChange={handleFormChange}
                  />
                )}
              </div>
              <div className="col-sm-6">
                <label className="form-label">{t(`courses.sections`)}</label>
                {userUX.formError ? (
                  userUX.errorMsg
                ) : userUX.formLoading ? (
                  <h1>loading</h1>
                ) : (
                  <input
                    className="form-control"
                    name="labCount"
                    type="number"
                    value={courseData?.labCount || ""}
                    onChange={handleFormChange}
                  />
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="form-card-button form-card-button-save"
          >
            {userUX.submitLoading
              ? "loading"
              : location.pathname.split("/").at(-2) === "add"
              ? t(`common.add`)
              : t(`common.save`)}
          </button>
          <button
            type="reset"
            className="form-card-button form-card-button-cancel"
          >
            {t(`common.cancel`)}
          </button>
          {currentLocation === "edit" && (
            <button
              type="button"
              className="form-card-button form-card-button-delete"
              onClick={handleCourseDelete}
              disabled={userUX.submitLoading}
            >
              {t(`common.delete`)}
            </button>
          )}

          {userUX.totalHours && <div>TOTAL HOURS IS WRONG</div>}
        </form>
      </div>
    </div>
  );
};
