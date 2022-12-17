import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { StudentFormData } from "./StudentFormData";
import { BASE_URL } from "../../../../shared/API";
import cookies from "js-cookie";
import axios from "axios";
import styles from "./StudentDataPortal.module.scss";

// Reusable Components
import { Accordion } from "react-bootstrap";
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { FormInput } from "../../../../components/forms/FormInput";

export const StudentDataPortal = () => {
  const [studentData, setStudentData] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [updatedData, setUpdatedData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [genderMale, setGenderMale] = useState(false);
  const [userUX, setUserUX] = useState({
    listLoading: false,
    searchClicked: false,
    studentDataLoading: false,
    emptyState: { state: false, message: "" },
  });
  const nationalIdRef = useRef();
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get("i18next") || "en";

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
    setFilteredStudents(
      currentLanguageCode === "en"
        ? students.filter((item) =>
            item.englishName?.toLowerCase().includes(searchValue.toLowerCase())
          )
        : students.filter((item) =>
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

  const handleSearchButtonClick = () => {
    setUserUX((current) => {
      return {
        ...current,
        searchClicked: true,
        listLoading: true,
        emptyState: { state: false, message: "" },
      };
    });
    // Condition to check whether the search input is empty or not
    // GET request to get all students by the search value (if its empty)
    // res => setStudents(res.data) setFilteredStudents(res.data)
    // if (res.data.length === 0) {
    // setUserUX((current) => {
    //   return { ...current, listLoading: false, emptyState: {state: true, message:"la yoogd tolaab"} };
    // })}
    // GET/POST request to get all students by the search value
    // res => setStudents(res.data) setFilteredStudents(res.data)
    // setUserUX((current) => {
    //   return { ...current, listLoading: false };
    // });
  };

  return (
    <FormNavbarContainer>
      <div className={styles.studentBody}>
        <div className={styles.studentBody_students}>
          <h3>
            {t(`registeration.menu`)}
            {filteredStudents.length > 0 && (
              <span>3dd el tolab : {filteredStudents.length}</span>
            )}
          </h3>
          <div className={styles.studentBody_students_search}>
            <input
              type="text"
              placeholder={t("registeration.search")}
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <button onClick={handleSearchButtonClick}>Search</button>
          </div>
          <h1>
            {!userUX.searchClicked &&
              students.length === 0 &&
              "click search to search"}
            {userUX.listLoading && "LOADING"}
            {userUX.emptyState.state && `${userUX.emptyState.message}`}
          </h1>
          {students.length === 0 && (
            <div className={styles.studentBody_students_list}>
              {filteredStudents.map((item) => (
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
  );
};
