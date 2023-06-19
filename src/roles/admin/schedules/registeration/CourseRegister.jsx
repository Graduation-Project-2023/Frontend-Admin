import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { ADMIN_URL } from "../../../../shared/API";
import axios from "axios";
import i18next from "i18next";
import { CourseRegisterData } from "./CourseRegisterData";

// Reusable Components
import { CoursesSidebar } from "./CoursesSidebar";
import { FormInput } from "../../../../components/forms/FormInput";


export const CourseRegister = (props) => {
  const [programCourses, setProgramCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [courseData, setCourseData] = useState({});
  const [levels, setLevels] = useState([]);
  const [lectureGrps, setLectureGrps] = useState(false);
  const [userUX, setUserUX] = useState({
    progCourses: { loading: false, error: false, errorMsg: "" },
    regCourses: { loading: false, error: false, errorMsg: "" },
    form: { submit: false, delete: false, error: false, errorMsg: "" },
    course: { loading: false, error: false, errorMsg: "" },
  });
  const authContext = useAuth();
  const { courseId } = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentLocation = location.pathname.split("/").at(-2);
  const Sidebars = [
    { id: "0", title: "common.coursesNotReg", registered: false },
    { id: "1", title: "common.regCourses", registered: true },
  ];
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };

  useEffect(() => {
    setLevels(props.levels);
  }, [props.levels]);

  useEffect(() => {
    setProgramCourses(props.programCourses);
  }, [props.programCourses]);

  useEffect(() => {
    setUserUX((prev) => ({
      ...prev,
      progCourses: {
        loading: props.userUX.loading,
        error: props.userUX.error,
        errorMsg: props.userUX.errorMsg,
      },
    }));
  }, [props.userUX]);

  useEffect(() => {
    if (currentLocation === "add") {
      if (props.programCourses.length !== 0) {
        setCourseData({
          ...props.programCourses.find((course) => {
            return course.id === courseId;
          }),
          hasLectureGroups: false,
        });
      }
    } else if (currentLocation === "edit") {
      if (props.programCourses.length !== 0) {
        setUserUX((prev) => ({
          ...prev,
          course: { ...prev.course, loading: true },
        }));
        // GET request to get the registered course data by it's id
        axios
          .get(
            ADMIN_URL +
              `/course_instances/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}/${courseId}`,
            config
          )
          .then((res) => {
            console.log(res.data);
            setCourseData(res.data);
            setLectureGrps(res.data.hasLectureGroups);
            setUserUX((prev) => ({
              ...prev,
              course: { ...prev.course, loading: false },
            }));
          })
          .catch((error) => {
            setUserUX((prev) => ({
              ...prev,
              course: {
                loading: false,
                error: true,
                errorMsg: "error fetching course data",
              },
            }));
            console.log(error);
          });
      }
    }
    // eslint-disable-next-line
  }, [courseId, props.programCourses]);

  useEffect(() => {
    // GET request to get all registered program courses on the current semester
    setUserUX((prev) => ({
      ...prev,
      regCourses: { ...prev.regCourses, loading: true },
    }));
    axios
      .get(
        ADMIN_URL +
          `/course_instances/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}`,
        config
      )
      .then((res) => {
        setRegisteredCourses(res.data);
        setUserUX((prev) => ({
          ...prev,
          regCourses: { ...prev.regCourses, loading: false },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          regCourses: {
            ...prev.regCourses,
            loading: false,
            error: true,
            errorMsg: "error fetching registered courses",
          },
        }));
      });
    // eslint-disable-next-line
  }, [authContext.program.id]);

  const handleListClick = (state, course) => {
    if (state === "add") {
      navigate(`/admin/study_schedules/register_course/add/${course.id}`);
    } else if (state === "edit") {
      navigate(`/admin/study_schedules/register_course/edit/${course.id}`);
    }
  };

  const handleEditFormChange = (event) => {
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    if (event.target.type === "number") {
      fieldValue = +fieldValue;
    }
    if (fieldName === "lectureGroups") {
      if (fieldValue === "TRUE") {
        setLectureGrps(true);
        setCourseData((prev) => ({
          ...prev,
          hasLectureGroups: true,
        }));
        return;
      } else if (fieldValue === "FALSE") {
        setLectureGrps(false);
        setCourseData((prev) => ({
          ...prev,
          lectureGroupCount: 0,
          hasLectureGroups: false,
        }));
        return;
      }
    }
    setCourseData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const course = {
      ...courseData,
      academicSemesterId: "decc46ba-7d4b-11ed-a1eb-0242ac120002",
    };
    delete course.semester;
    setUserUX((prev) => ({
      ...prev,
      form: { submit: true, error: false, delete: false, errorMsg: "" },
    }));
    if (currentLocation === "add") {
      course["programCourseId"] = courseData.id;
      delete course.id;
      console.log(course);
      // POST request to add a new course to the current semester
      axios
        .post(
          ADMIN_URL +
            `/course_instances/semesters/{{academic_semester_id}}/programs/${authContext.program.id}`,
          course,
          config
        )
        .then((res) => {
          console.log(res);
          setUserUX((prev) => ({
            ...prev,
            form: { ...prev.form, submit: false },
          }));
          setRegisteredCourses((prev) => [...prev, res.data]);
        })
        .catch((error) => {
          console.log(error);
          setUserUX((prev) => ({
            ...prev,
            form: {
              ...prev.form,
              submit: false,
              error: true,
              errorMsg: "error in submit",
            },
          }));
        });
    } else if (currentLocation === "edit") {
      // PUT request to update the registered course data
      delete course.id;
      axios
        .put(
          ADMIN_URL +
            `/course_instances/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}/${courseData.id}`,
          course,
          config
        )
        .then((res) => {
          console.log(res);
          setUserUX((prev) => ({
            ...prev,
            form: { ...prev.form, submit: false },
          }));
          // navigate("/admin/study_schedules/register_course");
        })
        .catch((error) => {
          console.log(error);
          setUserUX((prev) => ({
            ...prev,
            form: {
              ...prev.form,
              submit: false,
              error: true,
              errorMsg: "error in submit",
            },
          }));
        });
    }
  };

  const handleCourseDelete = () => {
    setUserUX((prev) => ({
      ...prev,
      form: { delete: true, error: false, submit: false, errorMsg: "" },
    }));
    // DELETE request to delete the registered course
    axios
      .delete(
        ADMIN_URL +
          `/course_instances/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}/${courseData.id}`,
        config
      )
      .then((res) => {
        console.log(res);
        setUserUX((prev) => ({
          ...prev,
          form: { ...prev.form, delete: false },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          form: {
            ...prev.form,
            delete: false,
            error: true,
            errorMsg: "error in delete",
          },
        }));
      });
  };

  return (
    <div className="registerationContainer-body">
      <div className={`registerationContainer-menu `}>
        {Sidebars.map((menu) => (
          <CoursesSidebar
            key={menu.id}
            title={menu.title}
            listData={menu.registered ? registeredCourses : programCourses}
            handleListClick={handleListClick}
            registered={menu.registered}
            eventKey={menu.id}
            userUX={menu.registered ? userUX.regCourses : userUX.progCourses}
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
            {CourseRegisterData.map((data) => {
              if (data.levels) {
                return (
                  <div className="row" key={data.id}>
                    <div className="col-lg-12 mb-4">
                      <label className="form-label">{t(`levels.level`)}</label>
                      <select
                        className="form-select"
                        name="levelId"
                        value={courseData?.levelId || ""}
                        onChange={handleEditFormChange}
                      >
                        <option value={null}>{t(`common.select`)}</option>
                        {levels.map((level) => (
                          <option key={level.id} value={level.id}>
                            {level.level}&nbsp;-&nbsp;
                            {i18next.language === "en"
                              ? level.englishName
                              : level.arabicName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                );
              } else if (data.lectureGroups) {
                return (
                  <div className="row" key={data.id}>
                    <div className="col-lg-6 mb-4">
                      <label className="form-label">
                        {t(`courses.hasGroups`)}
                      </label>
                      <select
                        className="form-select"
                        name="lectureGroups"
                        value={lectureGrps ? "TRUE" : "FALSE"}
                        onChange={handleEditFormChange}
                      >
                        <option value={"FALSE"}>{t(`common.choice_no`)}</option>
                        <option value={"TRUE"}>{t(`common.choice_yes`)}</option>
                      </select>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <label className="form-label">
                        {t(`courses.groups`)}
                      </label>
                      <input
                        className="form-control"
                        name="lectureGroupCount"
                        value={courseData?.lectureGroupCount || 0}
                        onChange={handleEditFormChange}
                        disabled={!lectureGrps}
                        type="number"
                      />
                    </div>
                  </div>
                );
              } else if (data.prof) {
                return (
                  <div className="row" key={data.id}>
                    <div className="col-lg-12 mb-4">
                      <label className="form-label">
                        {t(`courses.supervisor`)}
                      </label>
                      <select className="form-select" name="lectureGroups">
                        <option value={"FALSE"}>{t(`د/احمد مصطفى`)}</option>
                        <option value={"TRUE"}>{t(`د/محمد مصطفى`)}</option>
                      </select>
                    </div>
                  </div>
                );
              } else {
                return (
                  <FormInput
                    inputData={data}
                    handleEditFormChange={handleEditFormChange}
                    valueData={courseData}
                    key={data.id}
                  />
                );
              }
            })}
          </div>
          <button
            type="submit"
            className="form-card-button form-card-button-save"
          >
            {userUX.submitLoading ? (
              <span className="loader"></span>
            ) : currentLocation === "add" ? (
              t(`common.add`)
            ) : (
              t(`common.save`)
            )}
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
