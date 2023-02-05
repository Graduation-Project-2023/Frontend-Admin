import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import styles from "./ProgramCourses.module.scss";
import { ADMIN_URL } from "../../../../shared/API";
import axios from "axios";
import i18next from "i18next";

// Reusable Components
import { SidebarContainer } from "../../../../components/sidebar/SidebarContainer";
import { FormCard } from "../../../../components/forms/FormCard";
import { DropdownSearch } from "../../../../components/forms/DropdownSearch";
import { PrerequisiteTable } from "../../../../components/table/PrerequisiteTable";
import { CollapsibleTable } from "../../../../components/table/CollapsibleTable";

export const ProgramCourses = () => {
  const [programCourseData, setProgramCourseData] = useState([]);
  const [course, setCourse] = useState({});
  const [preCourses, setPreCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [programCourses, setProgramCourses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const authContext = useAuth();
  const { t } = useTranslation();
  const { programId } = useParams();
  const classWorkRef = useRef();
  const midtermRef = useRef();
  const finalExamRef = useRef();
  // eslint-disable-next-line
  const addedToGpaRef = useRef();
  const maxGrade = 100;
  const [userUX, setUserUX] = useState({
    levelTable: { loading: false, error: false, errorMsg: "" },
    courses: { loading: false, error: false, errorMsg: "" },
    programCourses: { loading: false, error: false, errorMsg: "" },
    programCourse: { loading: false, error: false, errorMsg: "" },
    form: { submit: false, delete: false, error: false, errorMsg: "" },
  });

  useEffect(() => {
    setUserUX((prev) => ({
      ...prev,
      courses: { ...prev.courses, loading: true },
    }));
    // GET request to get all college cousres
    axios
      .get(ADMIN_URL + `/courses?college_id=${authContext.college.id}`)
      .then((res) => {
        console.log(res);
        setCourses(res.data);
        setUserUX((prev) => ({
          ...prev,
          courses: { ...prev.courses, loading: false },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          courses: { loading: false, error: true, errorMsg: "courses error" },
        }));
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setUserUX((prev) => ({
      ...prev,
      programCourses: { ...prev.programCourses, loading: true },
    }));
    // GET request to get all the program cousres to display it in the tables
    axios
      .get(ADMIN_URL + `/programs/${programId}/program_courses`)
      .then((res) => {
        console.log(res);
        setProgramCourses(res.data);
        setUserUX((prev) => ({
          ...prev,
          programCourses: { ...prev.programCourses, loading: false },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          programCourses: {
            loading: false,
            error: true,
            errorMsg: "error in program courses",
          },
        }));
      });

    setLevels(authContext.program.levels);
    // eslint-disable-next-line
  }, [programId]);

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    if (event.target.type === "number") {
      fieldValue = +fieldValue;
    }
    if (
      +classWorkRef.current.value +
        +midtermRef.current.value +
        +finalExamRef.current.value >
      maxGrade
    ) {
      setUserUX((prev) => ({
        ...prev,
        form: {
          ...prev.form,
          error: true,
          errorMsg: "sum of grades must be equal to the max grade",
        },
      }));
      setProgramCourseData((current) => {
        return { ...current, midTerm: "", finalExam: "", classWork: "" };
      });
      classWorkRef.current.value = "";
      midtermRef.current.value = "";
      finalExamRef.current.value = "";
      return;
    } else {
      setUserUX((prev) => ({
        ...prev,
        form: { ...prev.form, error: false, errorMsg: "" },
      }));
    }
    setProgramCourseData((prev) => {
      return {
        ...prev,
        [fieldName]: fieldValue,
      };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    setUserUX((prev) => ({
      ...prev,
      form: { ...prev.form, submit: true, error: false, errorMsg: "" },
    }));

    const newProgramCourse = {
      ...programCourseData,
      code: course.id,
      programId: programId,
      englishName: course?.englishName,
      arabicName: course?.arabicName,
      prerequisites: preCourses?.map((item) => item.id),
    };

    if (editRowId === null) {
      // POST request to add a new program course to the database
      axios
        .post(
          ADMIN_URL + `/programs/${programId}/program_courses`,
          newProgramCourse
        )
        .then((res) => {
          console.log(res);
          setProgramCourses((prev) => [...prev, res.data]);
          setUserUX((prev) => ({
            ...prev,
            form: { ...prev.form, submit: false },
          }));
        })
        .catch((error) => {
          console.log(error);
          setUserUX((prev) => ({
            ...prev,
            form: {
              ...prev.form,
              submit: false,
              error: true,
              errorMsg: "error in adding a new program",
            },
          }));
        });
    } else {
      // PUT request to update the current program course
      axios
        .put(
          ADMIN_URL + `/programs/${programId}/program_courses/${editRowId}`,
          newProgramCourse
        )
        .then((res) => {
          console.log(res);
          const newPorgramCourses = [...programCourses];
          const index = newPorgramCourses.findIndex(
            (obj) => obj.id === editRowId
          );
          newPorgramCourses[index] = res.data;
          setProgramCourses(newPorgramCourses);
          setUserUX((prev) => ({
            ...prev,
            form: { ...prev.form, submit: false },
          }));
        })
        .catch((error) => {
          setUserUX((prev) => ({
            ...prev,
            form: {
              ...prev.form,
              submit: false,
              error: true,
              errorMsg: "error in updating the course program",
            },
          }));
          console.log(error);
        });
    }
  };

  const handleCourseSelection = (item) => {
    setCourse(item);
  };

  const addToPrerequisite = (item) => {
    if (preCourses.find((obj) => obj.id === item.id) === undefined) {
      setPreCourses((current) => [...current, item]);
    }
  };

  const removeFromPrerequisite = (item) => {
    setPreCourses((current) => current.filter((obj) => obj.id !== item.id));
  };

  const handleFormEditSwitch = (item) => {
    setEditRowId(item.id);
    setCourse(item);
    setUserUX((prev) => ({
      ...prev,
      programCourse: { loading: true, error: false, errorMsg: "" },
    }));
    // GET request to get the current program course to display it in the form
    axios
      .get(ADMIN_URL + `/programs/${programId}/program_courses/${item.id}`)
      .then((res) => {
        setProgramCourseData(res.data);
        if (res.data.prerequisites) {
          setPreCourses(res.data.prerequisites);
        }
        setUserUX((prev) => ({
          ...prev,
          programCourse: { ...prev.programCourse, loading: false },
        }));
      })
      .catch((error) => {
        setUserUX((prev) => ({
          ...prev,
          programCourse: {
            loading: false,
            error: true,
            errorMsg: "failed to fetch program course data",
          },
        }));
        console.log(error);
      });
  };

  const deleteProgramCourse = (e) => {
    e.preventDefault();
    setUserUX((prev) => ({
      ...prev,
      form: { ...prev.form, delete: true, error: false, errorMsg: "" },
    }));
    // DELETE request to delete the current program course
    axios
      .delete(ADMIN_URL + `/programs/${programId}/program_courses/${course.id}`)
      .then((res) => {
        console.log(res);
        setEditRowId(null);
        setCourse([]);
        setProgramCourseData([]);
        setPreCourses([]);
        setProgramCourses((prev) => prev.filter((obj) => obj.id !== course.id));
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
            errorMsg: "couldnt delete course",
          },
        }));
      });
  };

  const addProgramCourse = (e) => {
    e.preventDefault();
    setEditRowId(null);
    setCourse([]);
    setProgramCourseData([]);
    setPreCourses([]);
  };

  return (
    <SidebarContainer>
      <FormCard cardTitle={"academicSidebar.courses"}>
        <form
          onSubmit={(event) => {
            handleFormSubmit(event);
          }}
        >
          <div className="row">
            <div className="form-group col-xl-6 mb-4">
              <label className="col-form-label">{t("courses.code")}</label>
              {editRowId ? (
                <input disabled className="form-control" value={course.code} />
              ) : (
                <DropdownSearch
                  listData={{ type: "courseWithCode", data: courses }}
                  dropDownTitle={course}
                  inputPlaceholder={"courses.progCode"}
                  handleListClick={handleCourseSelection}
                  userUX={userUX.courses}
                />
              )}
            </div>
            <div className="form-group col-xl-6 mb-4">
              <label className="col-form-label">{t("courses.name")}</label>
              <input
                disabled
                className="form-control"
                value={
                  i18next.language === "en"
                    ? course.englishName || ""
                    : course.arabicName || ""
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-xl-4 mb-4">
              <label className="col-form-label">{t("levels.level")}</label>
              <select
                className="form-select"
                name="levelId"
                onChange={handleEditFormChange}
                value={programCourseData["levelId"] || ""}
              >
                <option value={null}>{t("common.select")}</option>
                {levels.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {i18next.language === "en"
                        ? item.englishName || ""
                        : item.arabicName || ""}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group col-xl-4 mb-4">
              <label className="col-form-label">{t("levelHours.term")}</label>
              <select
                className="form-select"
                name="semester"
                onChange={handleEditFormChange}
                value={programCourseData["semester"] || ""}
              >
                <option value={null}>{t("common.select")}</option>
                <option value="FIRST">{t("common.firstTerm")}</option>
                <option value="SECOND">{t("common.secondTerm")}</option>
                <option value="SUMMER">{t("common.summerTerm")}</option>
              </select>
            </div>
            <div className="form-group col-xl-4 mb-4">
              <label className="col-form-label">{t("courses.grade")}</label>
              <input
                className="form-control"
                type="number"
                disabled
                value={authContext.program.failureGrade}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-xl-3 mb-4">
              <label className="col-form-label">{t("courses.class")}</label>
              <input
                className="form-control"
                type="number"
                name="classWork"
                ref={classWorkRef}
                onChange={handleEditFormChange}
                value={programCourseData["classWork"] || ""}
              />
            </div>
            <div className="form-group col-xl-3 mb-4">
              <label className="col-form-label">{t("courses.mid")}</label>
              <input
                className="form-control"
                type="number"
                name="midTerm"
                ref={midtermRef}
                required
                onChange={handleEditFormChange}
                value={programCourseData["midTerm"] || ""}
              />
            </div>
            <div className="form-group col-xl-3 mb-4">
              <label className="col-form-label">{t("courses.final")}</label>
              <input
                className="form-control"
                type="number"
                name="finalExam"
                ref={finalExamRef}
                required
                onChange={handleEditFormChange}
                value={programCourseData["finalExam"] || ""}
              />
            </div>
            <div className="form-group col-xl-3 mb-4">
              <label className="col-form-label">{t("grades.max")}</label>
              <input
                className="form-control"
                type="number"
                name="maxGrade"
                value={maxGrade}
                readOnly
                disabled
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-xl-3 mb-4">
              <label className="col-form-label">
                {t("academicMain.credit")}
              </label>
              <input
                className="form-control"
                type="number"
                name="creditHours"
                required
                onChange={handleEditFormChange}
                value={programCourseData["creditHours"] || ""}
              />
            </div>
            <div className="form-group col-xl-3 mb-4">
              <label className="col-form-label">{t("courses.type")}</label>
              <select
                className="form-select"
                name="courseType"
                onChange={handleEditFormChange}
                value={programCourseData["courseType"] || ""}
              >
                <option value={null}>{t("common.select")}</option>
                <option value="COMPULSORY">{t("courses.mandatory")}</option>
                <option value="ELECTIVE">{t("courses.option")}</option>
              </select>
            </div>
            <div className="form-group col-xl-3 mb-4">
              <label className="col-form-label">{t("academicMain.type")}</label>
              <select className="form-select" name="test">
                <option value={null}>{t("common.select")}</option>
                <option value="FIRST">{t("courses.department")}</option>
                <option value="SECOND">{t("courses.faculty")}</option>
                <option value="SUMMER">{t("courses.university")}</option>
              </select>
            </div>
            <div className="form-group col-xl-3 mb-4">
              <label className="col-form-label">{t("courses.added_gpa")}</label>
              <select className="form-select" name="addedToGpa">
                <option value="FALSE">{t("common.choice_no")}</option>
                <option value="TRUE">{t("common.choice_yes")}</option>
              </select>
            </div>
            {userUX.formSubmitError && <div>{userUX.formSubmitErrorMsg}</div>}
          </div>
          <div className={styles.formLine}>
            <div className="form-group mb-4 col-md-6">
              <label className="col-form-label">
                {t("courses.prereqCourses")}
              </label>
              <DropdownSearch
                listData={{ type: "selectCourse", data: programCourses }}
                inputPlaceholder={"courses.progCode"}
                handleListClick={addToPrerequisite}
                userUX={userUX.programCourses}
              />
            </div>
            {preCourses.length !== 0 && (
              <PrerequisiteTable
                tableTitle={"courses.preTable"}
                headerItems={[
                  { id: 1, title: t(`courses.code`) },
                  { id: 2, title: t(`courses.eng_name`) },
                  { id: 3, title: t(`courses.name`) },
                ]}
                rowItems={preCourses}
                deletableItems={true}
                handleDelete={removeFromPrerequisite}
              />
            )}
          </div>
          <button
            type="submit"
            className="form-card-button form-card-button-save"
            disabled={userUX.form.submit}
          >
            {userUX.form.submit ? (
              <h1>loading</h1>
            ) : editRowId ? (
              t(`common.save`)
            ) : (
              t(`common.add`)
            )}
          </button>
          <button
            type="reset"
            className="form-card-button form-card-button-cancel"
            disabled={userUX.form.submit}
          >
            {t(`common.cancel`)}
          </button>
          {editRowId && (
            <>
              <button
                className="form-card-button form-card-button-delete"
                disabled={userUX.form.submit}
                onClick={deleteProgramCourse}
              >
                {t(`common.delete`)}
              </button>
              <button
                className="form-card-button form-card-button-save"
                disabled={userUX.form.submit}
                onClick={addProgramCourse}
              >
                {t(`common.add mokrar gded`)}
              </button>
            </>
          )}
        </form>
      </FormCard>
      {levels.map((item) => {
        return (
          <CollapsibleTable
            title={item}
            key={item.id}
            headerItems={[
              { id: 1, title: t(`courses.code`) },
              { id: 2, title: t(`courses.name`) },
              { id: 3, title: t(`courses.eng_name`) },
            ]}
            rowItems={programCourses.filter(
              (course) => course.levelId === item.id
            )}
            onRowClick={handleFormEditSwitch}
            userUX={userUX.programCourses}
          />
        );
      })}
    </SidebarContainer>
  );
};
