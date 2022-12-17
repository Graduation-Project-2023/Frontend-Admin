import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { StudentFormData } from "./StudentFormData";
import axios from "axios";
import { BASE_URL } from "../../../../shared/API";
import styles from "./StudentDataPortal.module.scss";

// Reusable Components
import { Accordion } from "react-bootstrap";
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { FormInput } from "../../../../components/forms/FormInput";
import cookies from "js-cookie";

export const StudentDataPortal = () => {
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get("i18next") || "en";
  const [studentData, setStudentData] = useState([]);
  const [filteredStudentData, setFilteredStudentData] = useState([]);
  const [updatedData, setUpdatedData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [genderMale, setGenderMale] = useState(false);
  const [showStudents, setShowStudents] = useState(false);
  const nationalIdRef = useRef();
  const { studentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (studentId !== "register" && studentId !== undefined) {
      // GET request to get student data by it's id
      axios
        .get(BASE_URL + `/students/${studentId}`)
        .then((res) => {
          setStudentData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setStudentData([]);
    }
    // eslint-disable-next-line
  }, [studentId]);
  useEffect(() => {
    setFilteredStudentData(
      studentData.filter(
        (item) =>
          item.englishName?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.arabicName?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue]);

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    if (event.target.type === "number") {
      fieldValue = +fieldValue;
    }
    if (fieldName === "gender") {
      if (fieldValue === "MALE") {
        setGenderMale(true);
      } else {
        setGenderMale(false);
      }
    }
    const student = { ...studentData };
    student[fieldName] = fieldValue;
    setStudentData(student);
    setUpdatedData((current) => {
      return { ...current, [`${fieldName}`]: fieldValue };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      ...studentData,
    };
    // Condition to check whether it's adding a new student or updating the current
    studentId !== "register" && studentId !== undefined
      ? // PUT request to update the current student data
        axios
          .put(BASE_URL + `/students/${newStudent.id}`, newStudent)
          .then((res) => {
            setStudentData(res.data);
          })
          .catch((error) => {
            console.log(error);
          })
      : // POST request to create a new student
        axios
          .post(BASE_URL + `/students`, newStudent)
          .then((res) => {
            console.log(res);
            navigate(`/student_data/${res.data.id}`);
          })
          .catch((error) => {
            console.log(error);
          });
  };

  return (
    <div className="container">
      <FormNavbarContainer>
        <div className={styles.studentBody}>
          <div className={styles.studentBody_students}>
            <h3>
              {t(`registeration.menu`)}
              <span>number of students</span>
            </h3>

            <div className={styles.studentBody_students_search}>
              <input
                type="text"
                placeholder={t("registeration.search")}
                value={searchValue}
              />
              <button
                onClick={() => {
                  setShowStudents(true);
                }}
              >
                Search
              </button>
            </div>
            {showStudents && (
              <div className={styles.studentBody_students_list}>
                {setFilteredStudentData.map((item) => (
                  <li key={item.id}>
                    {currentLanguageCode === "en"
                      ? item.englishName
                      : item.arabicName}
                  </li>
                ))}
              </div>
            )}
          </div>
          <div className={styles.studentBody_data}>
            <form onSubmit={handleFormSubmit}>
              <Accordion
                defaultActiveKey={["0"]}
                alwaysOpen
                className="collapseSection"
              >
                {StudentFormData.map((item) => {
                  if (
                    (studentId === "register" || studentId === undefined) &&
                    item.addStudent
                  ) {
                    return null;
                  }
                  if (item.male && !genderMale) {
                    return null;
                  }
                  return (
                    <Accordion.Item eventKey={item.id} key={item.id}>
                      <Accordion.Header>{t(item.title)}</Accordion.Header>
                      <Accordion.Body style={{ margin: "2rem" }}>
                        {item.formData.map((data) => {
                          return (
                            <FormInput
                              inputData={data}
                              handleEditFormChange={handleEditFormChange}
                              valueData={studentData}
                              key={data.id}
                            />
                          );
                        })}
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
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
              </Accordion>
            </form>
          </div>
        </div>
      </FormNavbarContainer>
    </div>
  );
};
