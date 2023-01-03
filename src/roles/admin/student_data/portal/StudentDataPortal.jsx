import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { StudentFormData } from "./StudentFormData";
import { ADMIN_URL } from "../../../../shared/API";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios";
import i18next from "i18next";
import styles from "./StudentDataPortal.module.scss";

// Reusable Components
import { Accordion } from "react-bootstrap";
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { FormInput } from "../../../../components/forms/FormInput";

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
  });
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const studentDataSetter = (data) => {
    let dates = {
      birthDate: data.birthDate,
      enrollmentYear: data.enrollmentYear,
      enrollmentYearEndDate: data.enrollmentYearEndDate,
      recruitmentDate: data.recruitmentDate,
    };
    Object.keys(dates).forEach(function (key, index) {
      if (dates[key] !== null) {
        dates[key] = dates[key].split("T")[0];
      }
    });
    Object.assign(data, dates);
    setStudentData(data);
    if (data.gender === "MALE") {
      setGenderMale(true);
    }
  };

  useEffect(() => {
    setUserUX((prev) => ({
      ...prev,
      list: { loading: true, error: false, errorMsg: "" },
    }));
    // GET request to get all students data
    axios
      .get(ADMIN_URL + `/student?college_id=${authContext.college}`)
      .then((res) => {
        setStudentData(res.data);
        setStudents(res.data);
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
      });

    // eslint-disable-next-line
  }, [authContext.college.id]);

  // GET request to get student data by it's id
  useEffect(() => {
    if (studentId !== undefined) {
      setUserUX((prev) => ({
        ...prev,
        form: { ...prev.form, submit: true },
      }));
      axios
        .get(ADMIN_URL + `/student/${studentId}`)
        .then((res) => {
          console.log(res.data);
          studentDataSetter(res.data);
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
    // eslint-disable-next-line
  }, [studentId]);

  useEffect(() => {
    setFilteredStudents(
      students.filter(
        (item) =>
          item.englishName?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.arabicName?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.nationalId?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    // eslint-disable-next-line
  }, [searchValue]);

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    if (event.target.type === "number" && fieldName !== "nationalId") {
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
    let dates = {
      birthDate: studentData.birthDate,
      enrollmentYear: studentData.enrollmentYear,
      enrollmentYearEndDate: studentData.enrollmentYearEndDate,
      recruitmentDate: studentData.recruitmentDate,
    };
    Object.keys(dates).forEach(function (key, index) {
      if (dates[key] !== null && dates[key] !== undefined) {
        dates[key] = dates[key].split("-").reverse().join("-");
      }
    });
    setUserUX((prev) => ({
      ...prev,
      form: { ...prev.form, submit: true },
    }));
    // Condition to check whether it's adding a new student or updating the current
    if (studentId !== undefined) {
      const newUpdatedData = {
        ...updatedData,
        ...dates,
      };
      if (Object.keys(updatedData).length === 0) {
        setUserUX((prev) => ({
          ...prev,
          form: {
            ...prev.form,
            submit: false,
            error: true,
            errorMsg: "No updated data",
          },
        }));
        return;
      }
      // PUT request to update the current student data
      axios
        .put(ADMIN_URL + `/student/${studentId}`, newUpdatedData)
        .then((res) => {
          console.log(res.data);
          studentDataSetter(res.data);
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
    } else {
      const newStudent = {
        ...studentData,
        ...dates,
        collegeId: authContext.college.id,
      };
      // POST request to create a new student
      axios
        .post(ADMIN_URL + `/student`, newStudent)
        .then((res) => {
          console.log(res);
          setUpdatedData({});
          setUserUX((prev) => ({
            ...prev,
            form: {
              ...prev.form,
              submit: false,
            },
          }));
          navigate(`/admin_portal/student_data/${studentId}`);
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
      console.log(newStudent);
    }
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
      .delete(ADMIN_URL + `/student/${studentId}`)
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
              <span>
                {t(`studentsData.number`)}:{filteredStudents.length}
              </span>
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
          </div>
          {userUX.list.error && userUX.list.errorMsg}
          {userUX.list.loading && "LOADING"}

          <div className={styles.studentBody_students_list}>
            {filteredStudents.map((item) => (
              <li key={item.id}>
                <Link to={`/admin_portal/student_data/info/${item.id}`}>
                  {i18next.language === "en"
                    ? item.englishName
                    : item.arabicName}
                </Link>
              </li>
            ))}
          </div>
        </div>
        <div className={styles.studentBody_data}>
          <form onSubmit={handleFormSubmit}>
            <Accordion
              defaultActiveKey={["0"]}
              alwaysOpen
              className="collapseSection"
            >
              {StudentFormData.map((item) => {
                if (studentId === undefined && item.addStudent) {
                  return null;
                }
                if (item.male && !genderMale) {
                  return null;
                }
                return (
                  <Accordion.Item eventKey={item.id} key={item.id}>
                    <Accordion.Header>{t(item.title)}</Accordion.Header>
                    <Accordion.Body>
                      {userUX.loading
                        ? "loading..."
                        : item.formData.map((data) => {
                            if (
                              studentId !== undefined &&
                              data.name === "password"
                            ) {
                              return null;
                            } else {
                              if (
                                studentId !== undefined &&
                                data.name === "email"
                              ) {
                                return (
                                  <FormInput
                                    inputData={{ ...data, disabled: true }}
                                    handleEditFormChange={handleEditFormChange}
                                    valueData={studentData}
                                    key={data.id}
                                  />
                                );
                              } else {
                                return (
                                  <FormInput
                                    inputData={data}
                                    handleEditFormChange={handleEditFormChange}
                                    valueData={studentData}
                                    key={data.id}
                                  />
                                );
                              }
                            }
                          })}
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
              {studentId !== undefined && (
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
