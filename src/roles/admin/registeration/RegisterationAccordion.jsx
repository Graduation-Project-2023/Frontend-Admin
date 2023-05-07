import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import styles from "./RegisterationPortal.module.scss";

// Reusable Components
import { Accordion } from "react-bootstrap";
import { NoData } from "../../../components/UX/NoData";

export const RegisterationAccordion = (props) => {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const students = props.students;
  const level = props.level;
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredStudents(props.students);
  }, [props.students]);

  useEffect(() => {
    setFilteredStudents(
      students.filter(
        (item) =>
          item.englishName?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.arabicName?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    // eslint-disable-next-line
  }, [searchValue]);

  const handleStudentClick = (student) => {
    // change the static id to student.id
    navigate(
      `/admin/registeration/student/698b2eed-b652-4246-bdbc-610da8b67cb5`
    );
  };

  return (
    <Accordion.Item eventKey={level.id} key={level.id}>
      <Accordion.Header>
        {i18next.language === "en" ? level.englishName : level.arabicName}
      </Accordion.Header>
      <Accordion.Body>
        <div className="registerationContainer-body">
          <div className={`registerationContainer-menu ${styles.studentList}`}>
            <h3>{t(`registeration.menu`)}</h3>
            <div
              className={`registerationContainer-menu-search ${styles.studentList_search}`}
            >
              <input
                type="text"
                placeholder={t("registeration.search")}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            {filteredStudents.length > 0 ? (
              <div className="registerationContainer-menu-list">
                {filteredStudents.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => {
                      handleStudentClick(item);
                    }}
                  >
                    {i18next.language === "en"
                      ? item.englishName
                      : item.arabicName}
                  </li>
                ))}
              </div>
            ) : (
              <NoData />
            )}
          </div>
          <div className="registerationContainer-form">
            <h3>{t(`registeration.form`)}</h3>
            <form>
              <div className="registerationContainer-form-inputs">
                <div className="row mb-4">
                  <label className="col-sm-4 col-form-label">
                    {t(`registeration.advisor`)}
                  </label>
                  <div className="col-sm-8">
                    <input className="form-control" />
                  </div>
                </div>
                <div className="row mb-4">
                  <label className="col-sm-4 col-form-label">
                    {t(`registeration.number`)}
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      disabled
                      defaultValue={students.length}
                    />
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
              >
                {t(`common.cancel`)}
              </button>
            </form>
          </div>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};
