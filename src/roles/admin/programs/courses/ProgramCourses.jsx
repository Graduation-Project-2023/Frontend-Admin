import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { BASE_URL } from "../../../../shared/API";
import axios from "axios";
import cookies from "js-cookie";
import { BsTrash } from "react-icons/bs";
import styles from "./ProgramCourses.module.scss";

// Reusable Components
import { SidebarContainer } from "../../../../components/SidebarContainer";
import { FormCard } from "../../../../components/FormCard";
import { Dropdown } from "react-bootstrap";

export const ProgramCourses = () => {
  const [programCourseData, setProgramCourseData] = useState([]);

  // Courses States
  const [course, setCourse] = useState({});
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // Prereq State
  const [preCourses, setPreCourses] = useState([]);
  const [programCourses, setProgramCourses] = useState([]);
  const [filteredPreCourses, setFilteredPreCourses] = useState([]);
  const [searchPreValue, setSearchPreValue] = useState("");

  const [levels, setLevels] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState();
  // eslint-disable-next-line
  const authContext = useAuth();
  const { t } = useTranslation();
  const { programId } = useParams();
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    // GET request to get all cousres to display it in the table
    // axios
    //   .get(BASE_URL + `/programs/${programId}/courses`)
    //   .then((res) => {
    //     setCourses(res.data);
    //     setFilteredCourses(res.data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     console.log(error);
    //   });
    // eslint-disable-next-line

    setLevels([
      { id: 0, level: 1, englishName: "Level 1", arabicName: "mostawaa awal" },
      { id: 1, level: 2, englishName: "Level 2", arabicName: "mostawaa tany" },
      { id: 2, level: 3, englishName: "Level 3", arabicName: "mostawaa talt" },
    ]);
    setCourses([
      { id: 0, code: "bsm10", englishName: "Physics", arabicName: "الفيزياء" },
      { id: 1, code: "cce10", englishName: "Math", arabicName: "الرياضيات" },
      { id: 2, code: "ecc10", englishName: "Art", arabicName: "الاء" },
      { id: 3, code: "aet10", englishName: "Volley", arabicName: "الفوولي" },
    ]);
    setProgramCourses([
      { id: 0, code: "bsm10", englishName: "Physics", arabicName: "الفيزياء" },
      { id: 1, code: "cce10", englishName: "Math", arabicName: "الرياضيات" },
      { id: 2, code: "ecc10", englishName: "Art", arabicName: "الاء" },
      { id: 3, code: "aet10", englishName: "Volley", arabicName: "الفوولي" },
    ]);
    setFilteredCourses([
      { id: 0, code: "bsm10", englishName: "Physics", arabicName: "الفيزياء" },
      { id: 1, code: "cce10", englishName: "Math", arabicName: "الرياضيات" },
      { id: 2, code: "ecc10", englishName: "Art", arabicName: "الاء" },
      { id: 3, code: "aet10", englishName: "Volley", arabicName: "الفوولي" },
    ]);
    setFilteredPreCourses([
      { id: 0, code: "bsm10", englishName: "Physics", arabicName: "الفيزياء" },
      { id: 1, code: "cce10", englishName: "Math", arabicName: "الرياضيات" },
      { id: 2, code: "ecc10", englishName: "Art", arabicName: "الاء" },
      { id: 3, code: "aet10", englishName: "Volley", arabicName: "الفوولي" },
    ]);
  }, []);

  useEffect(() => {
    setFilteredCourses(
      courses.filter((item) =>
        item.code.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    // eslint-disable-next-line
  }, [searchValue]);

  useEffect(() => {
    setFilteredPreCourses(
      programCourses.filter(
        (item) =>
          item.code.toLowerCase().includes(searchPreValue.toLowerCase()) ||
          item.englishName
            .toLowerCase()
            .includes(searchPreValue.toLowerCase()) ||
          item.arabicName.toLowerCase().includes(searchPreValue.toLowerCase())
      )
    );
    // eslint-disable-next-line
  }, [searchPreValue]);

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
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const rows = [...courses];
    rows.push(programCourseData);
    // POST request to add a new program course to the database
    // axios
    //   .get(BASE_URL + `/programs/${programId}/courses`, { academicCoursesData })
    //   .then((res) => {
    //     console.log(res);
    //     setCourses(rows);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     setError(error);
    //     console.log(error);
    //   });
  };

  const addToPrerequisite = (item) => {
    const newPrerequisiteCourses = preCourses.push(item);
    setPreCourses(newPrerequisiteCourses);
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
            <label className="col-sm-1 col-form-label">
              {t("courses.code")}
            </label>
            <div className="col-sm-5">
              <Dropdown className={styles.progCourses}>
                <Dropdown.Toggle  id="dropdown-basic">
                  {course.code || t("choose a course code")}
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.progCourses_menu}>
                  <input
                    type="text"
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                    placeholder={t("program code")}
                    className="form-control"
                  />
                  <ul  className={styles.progCourses_menu_searchList}>
                    {filteredCourses.map((item) => {
                      return (
                        <li
                         
                          key={item.id}
                          onClick={() => {
                            setCourse(item);

                          }}
                        >
                          {item.code}
                        </li>
                      );
                    })}
                  </ul>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <label className="col-sm-1 col-form-label">
              {t("courses.name")}
            </label>
            <div className="col-sm-2">
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
            <label className="col-sm-1 col-form-label">
              {t("levels.level")}
            </label>
            <div className="col-sm-5">
              <select
                className= 'form-select'
                name="level"
                onChange={handleEditFormChange}
                value={programCourseData["level"] || ""}
              >
                <option value={null}>{t("common.select")}</option>
                {levels.map((item) => {
                  return (
                    <option key={item.id}>
                      {currentLanguageCode === "en"
                        ? item.englishName || ""
                        : item.arabicName || ""}
                    </option>
                  );
                })}
              </select>
            </div>
            <label className="col-sm-1 col-form-label">
              {t("levelHours.term")}
            </label>
            <div className="col-sm-2">
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
            <label className="col-sm-1 col-form-label">
              {t("courses.class")}
            </label>
            <div className="col-sm-2">
              <input
                className="form-control"
                type="number"
                name="classWork"
                onChange={handleEditFormChange}
                value={programCourseData["classWork"] || ""}
              />
            </div>
            <label className="col-sm-2 col-form-label">
              {t("courses.mid")}
            </label>
            <div className="col-sm-2">
              <input
              className="form-control"
                type="number"
                name="midTerm"
                required
                onChange={handleEditFormChange}
                value={programCourseData["midTerm"] || ""}
              />
            </div>
            <label className="col-sm-2 col-form-label">
              {t("courses.final")}
            </label>
            <div className="col-sm-2">
              <input
              className="form-control"
                type="number"
                name="finalExam"
                required
                onChange={handleEditFormChange}
                value={programCourseData["finalExam"] || ""}
              />
            </div>
          </div>
          <div className="row mb-4">
            <label className="col-sm-1 col-form-label">{t("grades.max")}</label>
            <div className="col-sm-2">
              <input
              className="form-control"
                type="number"
                name="classWork"
                onChange={handleEditFormChange}
                value={programCourseData["classWork"] || ""}
              />
            </div>
            {/* {authContext.program.credit === "CREDIT" && <></>} */}
            <label className="col-sm-2 col-form-label">
              {t("academicMain.credit")}
            </label>
            <div className="col-sm-2">
              <input
               className="form-control"
                type="number"
                name="creditHours"
                required
                onChange={handleEditFormChange}
                value={programCourseData["creditHours"] || ""}
              />
            </div>
            <label className="col-sm-2 col-form-label">{t("academicMain.type")}</label>
            <div className="col-sm-2">
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
            <label className="col-sm-1 col-form-label">
              {t("courses.grade")}
            </label>
            <div className="col-sm-2">
              <input
                className="form-control"
                type="number"
                disabled
                value={authContext.program.failureGrade}
              />
            </div>
            <label className="col-sm-1 col-form-label">
              {t("courses.type")}
            </label>
            <div className="col-sm-2">
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
          {/* <div className="row mb-4">
            <label className="col-sm-1 col-form-label">
              {t("pre req courses")}
            </label>
            <div className="col-sm-5">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {t("choose a pre req course code")}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <input
                    type="text"
                    onChange={(e) => setSearchPreValue(e.target.value)}
                    value={searchPreValue}
                    placeholder={t("program code")}
                  />
                  <ul>
                    {filteredPreCourses.map((item) => {
                      return (
                        <li
                          key={item.id}
                          onClick={() => {
                            addToPrerequisite(item);
                          }}
                        >
                          {item.code} -
                          {currentLanguageCode === "en"
                            ? item.englishName || ""
                            : item.arabicName || ""}
                        </li>
                      );
                    })}
                  </ul>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div>
            this is a table
            <ul>
              {preCourses.length > 1 ? (
                preCourses?.map((item) => {
                  return (
                    <li>
                      {item.code} - {item.arabicName}
                    </li>
                  );
                })
              ) : (
                <li>
                  {preCourses.code} - {preCourses.arabicName}
                </li>
              )}
            </ul>
          </div> */}
          {/* <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              name="addedToGpa"
              id="addedToGpa"
              onChange={handleEditFormChange}
              value={programCourseData["addedToGpa"] || ""}
            />
            <label className="form-check-label" htmlFor="addedToGpa">
              is added to gpa
            </label> */}
          {/* </div> */}
          <div className="row mb-4 table-container">
            <table className="table">
            <thead>
              <tr>
                <th className="table-container-header">
                {t("courses.code")}
                </th>
                <th className="table-container-header">
                  {t ("courses.name")}
                </th>
                <th className="table-container-header">
                  {t("common.delete")}
                </th>
              </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="table-container-items">logic</td>
                  <td className="table-container-items">bsm-500</td>
                  <td className="table-container-items"><BsTrash color=" #858d97" /></td>
                </tr>
                
              </tbody>

            </table>
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
          >
            {t(`common.cancel`)}
          </button>
        </form>
      </FormCard>
    </SidebarContainer>
  );
};
