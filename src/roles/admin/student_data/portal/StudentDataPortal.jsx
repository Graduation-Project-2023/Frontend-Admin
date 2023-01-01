import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { StudentFormData } from "./StudentFormData";
import { BASE_URL } from "../../../../shared/API";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios";
import i18next from "i18next";
import styles from "./StudentDataPortal.module.scss";

// Reusable Components
import { Accordion } from "react-bootstrap";
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { FormInput } from "../../../../components/forms/FormInput";
import { FcSearch } from "react-icons/fc";

export const StudentDataPortal = () => {
  const authContext = useAuth();
  const [studentData, setStudentData] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [updatedData, setUpdatedData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [genderMale, setGenderMale] = useState(false);
  const [userUX, setUserUX] = useState({
    list: { loading: false, error: false, errorMsg: "" },
    studentData: { loading: false, error: false, errorMsg: "" },
    form: { submit: false, delete: false, error: false, errorMsg: "" },
    searchClicked: false,
  });

  const { studentId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (studentId !== "register" && studentId !== undefined) {
      // GET request to get student data by it's id
      setUserUX((prev) => ({
        ...prev,
        form: { ...prev.form, submit: true },
      }));
      axios
        .get(BASE_URL + `/student/${studentId}`)
        .then((res) => {
          setStudentData(res.data);
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
              errorMsg: "student data error",
            },
          }));
        });
    } else {
      setStudentData([]);
    }
  }, [studentId]);

  useEffect(() => {
    setFilteredStudents(
      i18next.language === "en"
        ? students.filter((item) =>
            item.englishName?.toLowerCase().includes(searchValue.toLowerCase())
          )
        : students.filter((item) =>
            item.arabicName?.toLowerCase().includes(searchValue.toLowerCase())
          )
    );
    // eslint-disable-next-line
  }, [searchValue]);

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    if (event.target.type === "number") {
      if (fieldName === "nationalId") {
      } else {
        fieldValue = +fieldValue;
      }
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
    if (studentData.nationalId.split("").length !== 14) {
      setUserUX((prev) => ({
        ...prev,
        form: {
          ...prev.form,
          error: true,
          errorMsg: "National ID must be 14 digits",
        },
      }));
      return;
    }
    const newStudent = {
      ...studentData,
    };
    console.log(newStudent);
    setUserUX((prev) => ({
      ...prev,
      form: { ...prev.form, submit: true },
    }));
    // Condition to check whether it's adding a new student or updating the current
    studentId !== "register" && studentId !== undefined
      ? // PUT request to update the current student data
        axios
          .put(BASE_URL + `/student/${newStudent.id}`, updatedData)
          .then((res) => {
            setStudentData(res.data);
            setUserUX((prev) => ({
              ...prev,
              form: {
                ...prev.form,
                submit: false,
              },
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
                errorMsg: "student data error",
              },
            }));
          })
      : // POST request to create a new student
        axios
          .post(BASE_URL + `/student`, newStudent)
          .then((res) => {
            console.log(res);
            navigate(`/student_data/${res.data.id}`);
            setUserUX((prev) => ({
              ...prev,
              form: {
                ...prev.form,
                submit: false,
              },
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
                errorMsg: "student data error",
              },
            }));
          });
  };

  const handleSearchButtonClick = () => {
    setUserUX((prev) => ({
      ...prev,
      searchClicked: true,
      list: { loading: true, error: false, errorMsg: "" },
    }));
    searchValue === ""
      ? axios
          .get(BASE_URL + `/student/all/${authContext.college}`)
          .then((res) => {
            setStudentData(res.data);
            setFilteredStudents(res.data);
            setUserUX((prev) => ({
              ...prev,
              list: {
                loading: false,
                error: res.data === 0 ? true : false,
                errorMsg: res.data === 0 ? "No Students Found" : "",
              },
            }));
          })
          .catch((error) => {
            console.log(error);
            setUserUX((prev) => ({
              ...prev,
              list: { loading: false, error: true, errorMsg: "error" },
            }));
          })
      : console.log("search");

    // : axios.get(BASE_URL + `/student/${searchValue}`).then((res) => {
    //     setStudentData(res.data);
    //     setFilteredStudents(res.data);
    //     setUserUX((prev) => ({
    //       ...prev,
    //       listLoading: false,
    //     }));
    //   });
  };
  const handleStudentDelete = (e) => {
    e.preventDefault();
    setUserUX((prev) => ({
      ...prev,
      form: {
        ...prev.form,
        delete: true,
      },
    }));
    axios
      .delete(BASE_URL + `/student/${studentId}`)
      .then((res) => {
        console.log(res);
        setUserUX((prev) => ({
          ...prev,
          form: {
            ...prev.form,
            delete: false,
          },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          form: {
            ...prev.form,
            error: true,
            errorMsg: "error in deleting student",
            delete: false,
          },
        }));
      });
  };

  return (
    <FormNavbarContainer>
      <div className={styles.studentBody}>
        <div className={styles.studentBody_students}>
          <h3>
            {t(`registeration.all`)}
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
          <h1 className={styles.studentBody_students_alertBox}>
            {!userUX.searchClicked && students.length === 0 && (
              <>
                <FcSearch />
                <div>{t(`registeration.type`)}</div>
              </>
            )}
            {userUX.list.error && userUX.list.errorMsg}
            {userUX.list.loading && "LOADING"}
          </h1>
          {students.length === 0 && (
            <div className={styles.studentBody_students_list}>
              {filteredStudents.map((item) => (
                <li key={item.id}>
                  {i18next.language === "en"
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
                    <Accordion.Body>
                      {userUX.loading ? (
                        "loading..."
                      ) : (
                        <>
                          {item.formData.map((data) => {
                            return (
                              <FormInput
                                inputData={{ ...data, disabled: true }}
                                handleEditFormChange={handleEditFormChange}
                                valueData={{ studentData }}
                                key={data.id}
                              />
                            );
                          })}
                        </>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
              <button
                type="submit"
                className="form-card-button form-card-button-save"
              >
                {" "}
                {userUX.form.submit ? "Loading..." : `${t(`common.save`)}`}
              </button>
              <button
                type="reset"
                className="form-card-button form-card-button-cancel"
                disabled={userUX.form.submit}
              >
                {t(`common.cancel`)}
              </button>
              {studentId !== "register" && studentId !== undefined && (
                <button
                  className="form-card-button form-card-button-delete"
                  onClick={handleStudentDelete}
                >
                  {userUX.form.delete ? "Loading..." : t(`common.delete`)}
                </button>
              )}
            </Accordion>
          </form>
        </div>
      </div>
    </FormNavbarContainer>
  );
};
