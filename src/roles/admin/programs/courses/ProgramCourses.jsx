import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import styles from "./ProgramCourses.module.scss";
import { BASE_URL } from "../../../../shared/API";
import axios from "axios";
import cookies from "js-cookie";

// Reusable Components
import { SidebarContainer } from "../../../../components/sidebar/SidebarContainer";
import { FormCard } from "../../../../components/forms/FormCard";
import { DropdownSearch } from "../../../../components/forms/DropdownSearch";
import { PrerequisiteTable } from "../../../../components/table/PrerequisiteTable";
import { CollapsibleTable } from "../../../../components/table/CollapsibleTable";

export const ProgramCourses = () => {
  const [updatedData, setUpdatedData] = useState({});
  const [programCourseData, setProgramCourseData] = useState([]);
  const [course, setCourse] = useState({});
  const [preCourses, setPreCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [programCourses, setProgramCourses] = useState([]);
  const [levels, setLevels] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  const [editRowId, setEditRowId] = useState(null);
  // eslint-disable-next-line
  const [error, setError] = useState();
  const authContext = useAuth();
  const { t } = useTranslation();
  const { programId } = useParams();
  const classWorkRef = useRef();
  const midtermRef = useRef();
  const finalExamRef = useRef();
  const [wrongCourseGrades, setWrongCourseGrades] = useState({
    error: false,
    errorMessage: "",
  });
  const currentLanguageCode = cookies.get("i18next") || "en";
  const maxGrade = 100;

  const handleCourseGrades = () => {
    if (
      +classWorkRef.current.value +
        +midtermRef.current.value +
        +finalExamRef.current.value >
      maxGrade
    ) {
      setWrongCourseGrades({
        error: true,
        errorMessage: "sum of grades must be equal to the max grade",
      });
      classWorkRef.current.value = "";
      midtermRef.current.value = "";
      finalExamRef.current.value = "";
    } else if (
      +classWorkRef.current.value +
        +midtermRef.current.value +
        +finalExamRef.current.value ===
      maxGrade
    ) {
      setWrongCourseGrades({ error: false });
    }
  };

  useEffect(() => {
    // GET request to get all college cousres
    axios
      .get(BASE_URL + `/courses?college_id=${authContext.college.id}`)
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // GET request to get all the program cousres to display it in the tables
    axios
      .get(BASE_URL + `/programs/${programId}/program_courses`)
      .then((res) => {
        setProgramCourses(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });

    // GET request to get all the program levels to display it in the level selection
    axios
      .get(BASE_URL + `/programs/${programId}/levels`)
      .then((res) => {
        setLevels(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        console.log(error);
      });
    // eslint-disable-next-line
  }, [programId]);

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    if (event.target.type === "number") {
      fieldValue = +fieldValue;
    }
    const newProgramCourseData = { ...programCourseData };
    newProgramCourseData[fieldName] = fieldValue;
    setProgramCourseData(newProgramCourseData);
    setUpdatedData((current) => {
      return { ...current, [`${fieldName}`]: fieldValue };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const newProgramCourses = [...programCourses];
    newProgramCourses.push(programCourseData);
    if (editRowId === null) {
      console.log(programCourseData);
      // POST request to add a new program course to the database
      // axios
      //   .post(
      //     BASE_URL + `/programs/${programId}/program_courses`,
      //     programCourseData
      //   )
      //   .then((res) => {
      //     console.log(res);
      //     setProgramCourses(newProgramCourses);
      //     setLoading(false);
      //   })
      //   .catch((error) => {
      //     setLoading(false);
      //     setError(error);
      //     console.log(error);
      //   });
    } else {
      // PUT request to update the current program course
      axios
        .put(
          BASE_URL + `/programs/${programId}/program_courses/${editRowId}`,
          updatedData
        )
        .then((res) => {
          console.log(res);
          setProgramCourses(newProgramCourses);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
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
    setLoading(true);
    axios
      .get(BASE_URL + `/programs/${programId}/program_courses/${item.id}`)
      .then((res) => {
        setProgramCourseData(res.data);
        if (res.data.prerequisites) {
          setPreCourses(res.data.prerequisites);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const deleteProgramCourse = (e) => {
    e.preventDefault();
    setLoading(true);
    // DELETE request to delete the current program course
    axios
      .delete(BASE_URL + `/programs/${programId}/program_courses/${course.id}`)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setEditRowId(null);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
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
          <div className="row mb-4">
            {editRowId ? (
              <>
                <label className="col-sm-2 col-form-label">
                  {t("courses.code")}
                </label>
                <div className="col-sm-4">
                  <input
                    disabled
                    className="form-control"
                    value={course.code}
                  />
                </div>
              </>
            ) : (
              <DropdownSearch
                label={"courses.code"}
                specialData={course}
                menuData={courses}
                inputPlaceholder={"program code"}
                handleListClick={handleCourseSelection}
                codeEqualsId={true}
              />
            )}

            <label className="col-sm-2 col-form-label">
              {t("courses.name")}
            </label>
            <div className="col-sm-4">
              <input
                disabled
                className="form-control"
                value={
                  currentLanguageCode === "en"
                    ? course.englishName || ""
                    : course.arabicName || ""
                }
              />
            </div>
          </div>
          <div className="row mb-4">
            <label className="col-sm-2 col-form-label">
              {t("levels.level")}
            </label>
            <div className="col-sm-4">
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
                      {currentLanguageCode === "en"
                        ? item.englishName || ""
                        : item.arabicName || ""}
                    </option>
                  );
                })}
              </select>
            </div>
            <label className="col-sm-2 col-form-label">
              {t("levelHours.term")}
            </label>
            <div className="col-sm-4">
              <select
                className="form-select"
                name="semester"
                onChange={handleEditFormChange}
                value={programCourseData["semester"] || ""}
              >
                <option value={null}>{t("common.select")}</option>
                <option value="FIRST">{t("academicMain.first")}</option>
                <option value="SECOND">{t("levelHours.second")}</option>
                <option value="SUMMER">{t("levelHours.summer")}</option>
              </select>
            </div>
          </div>
          <div className="row mb-4">
            <label className="col-sm-2 col-form-label">
              {t("courses.class")}
            </label>
            <div className="col-sm-4">
              <input
                className="form-control"
                type="number"
                name="classWork"
                ref={classWorkRef}
                onChange={handleCourseGrades}
              />
            </div>
            <label className="col-sm-2 col-form-label">
              {t("courses.mid")}
            </label>
            <div className="col-sm-4">
              <input
                className="form-control"
                type="number"
                name="midTerm"
                required
                ref={midtermRef}
                onChange={handleCourseGrades}
              />
            </div>
          </div>
          <div className="row mb-4">
            <label className="col-sm-2 col-form-label">
              {t("courses.final")}
            </label>
            <div className="col-sm-4">
              <input
                className="form-control"
                type="number"
                name="finalExam"
                required
                ref={finalExamRef}
                onChange={handleCourseGrades}
              />
            </div>

            {wrongCourseGrades.error && (
              <div>{wrongCourseGrades.errorMessage}</div>
            )}

            <label className="col-sm-2 col-form-label">{t("grades.max")}</label>
            <div className="col-sm-4">
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
          {/* {authContext.program.credit === "CREDIT" && <></>} */}
          <div className="row mb-4">
            <label className="col-sm-2 col-form-label">
              {t("academicMain.credit")}
            </label>
            <div className="col-sm-4">
              <input
                className="form-control"
                type="number"
                name="creditHours"
                required
                onChange={handleEditFormChange}
                value={programCourseData["creditHours"] || ""}
              />
            </div>
            <label className="col-sm-2 col-form-label">
              {t("academicMain.type")}
            </label>
            <div className="col-sm-4">
              <select
                className="form-select"
                name="require"
                onChange={handleEditFormChange}
                value={programCourseData["require"] || ""}
              >
                <option value={null}>{t("common.select")}</option>
                <option value="FIRST">{t("ta5asos")}</option>
                <option value="SECOND">{t("kolya")}</option>
                <option value="SUMMER">{t("gam3a")}</option>
              </select>
            </div>
          </div>

          <div className="row mb-4">
            <label className="col-sm-2 col-form-label">
              {t("courses.grade")}
            </label>
            <div className="col-sm-4">
              <input
                className="form-control"
                type="number"
                disabled
                value={authContext.program.failureGrade}
              />
            </div>
            <label className="col-sm-2 col-form-label">
              {t("courses.type")}
            </label>
            <div className="col-sm-4">
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
          </div>
          <div className="row mb-4">
            <div className="form-check form-switch form-check-inline col-sm-4">
              <label className="form-check-label " htmlFor="addedToGpa ">
                {" "}
                تضاف للمعدل التراكمي
              </label>
              <input
                className={`form-check-input ${styles.preSwitch}`}
                type="checkbox"
                role="switch"
                name="addedToGpa"
                id="addedToGpa"
                onChange={handleEditFormChange}
                value={programCourseData["addedToGpa"] || ""}
              />
            </div>
          </div>

          <div className={styles.formLine}>
            <div className="row mb-4">
              <DropdownSearch
                label={"pre req courses"}
                menuData={programCourses}
                inputPlaceholder={"program code"}
                handleListClick={addToPrerequisite}
              />
            </div>
            {preCourses.length !== 0 && (
              <PrerequisiteTable
                tableTitle={"gdwl el prerequisite"}
                headerItems={[
                  { id: 1, title: t(`courses.code`) },
                  { id: 2, title: t(`courses.name`) },
                  { id: 3, title: t(`courses.eng_name`) },
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
          >
            {editRowId ? t(`common.save`) : t(`common.add`)}
          </button>
          <button
            type="reset"
            className="form-card-button form-card-button-cancel"
          >
            {t(`common.cancel`)}
          </button>
          {editRowId && (
            <>
              <button
                onClick={deleteProgramCourse}
                className="form-card-button form-card-button-delete"
              >
                {t(`common.7azf el mokarar`)}
              </button>
              <button
                className="form-card-button form-card-button-cancel"
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
              (course) => course.level.level === item.level
            )}
            onRowClick={handleFormEditSwitch}
          />
        );
      })}
    </SidebarContainer>
  );
};
