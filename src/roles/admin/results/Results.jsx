import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ADMIN_URL, STAFF_URL } from "../../../shared/API";
import axios from "axios";
import i18next from "i18next";
import styles from "../../admin/student_data/add/AddStudents.module.scss";

// Reusable Components
import { SearchContainer } from "../../../components/other/SearchContainer";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import { SidebarContainer } from "../../../components/sidebar/SidebarContainer";
import { FormCard } from "../../../components/forms/FormCard";
import { TbFileUpload } from "react-icons/tb";
import { MdErrorOutline } from "react-icons/md";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { ModalPopup } from "../../../components/popups/ModalPopup";
import { CourseworkHeaderItems } from "../../staff/coursework/CourseworkData";
import { CourseworkRow } from "../../staff/coursework/CourseworkRow";
import { Alert } from "react-bootstrap";
import { SpinnerLoader } from "../../../components/loaders/SpinnerLoader";

export const Results = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [userUX, setUserUX] = useState({
    list: { loading: false, error: false, errorMsg: "" },
    add: { loading: false, success: false, error: false, errorMsg: "" },
    form: { loading: false, success: false, error: false, errorMsg: "" },
    students: { loading: false, error: false, errorMsg: "" },
  });
  const [currCourse, setCurrCourse] = useState({
    arabicName: "",
    englishName: "",
  });
  const authContext = useAuth();
  const { t } = useTranslation();
  const { courseId } = useParams();
  const printAreaRef = useRef(null);
  const navigate = useNavigate();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };

  useEffect(() => {
    if (courseId) {
      setUserUX((prev) => ({
        ...prev,
        students: { ...prev.students, loading: true },
      }));
      // GET request to get all students registered in courses to display it
      axios
        .get(STAFF_URL + `/courses/${courseId}/students`, config)
        .then((res) => {
          console.log(res);
          setStudents(
            res.data.map((item) => {
              const studentData = item.student;
              return {
                ...studentData,
                classworkScore: item.classworkScore,
                midtermScore: item.midtermScore,
                finalScore: item.finalScore,
              };
            })
          );
          setUserUX((prev) => ({
            ...prev,
            students: { ...prev.students, loading: false },
          }));
        })
        .catch((error) => {
          console.log(error);
          setUserUX((prev) => ({
            ...prev,
            students: { loading: false, error: true, errorMsg: "error.common" },
          }));
        });
    }
    // eslint-disable-next-line
  }, [courseId]);

  const handleDragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setUserUX((prev) => ({ ...prev, add: { ...prev.add, loading: true } }));
    if (event.dataTransfer.files.length > 1) {
      setUserUX((prev) => ({
        ...prev,
        add: {
          loading: false,
          error: true,
          errorMsg: t("studentsData.error.moreThanOne"),
        },
      }));
    } else {
      if (event.dataTransfer.files[0].type !== "text/csv") {
        setUserUX((prev) => ({
          ...prev,
          add: {
            loading: false,
            error: true,
            errorMsg: t("studentsData.error.notCSV"),
          },
        }));
      } else {
        const csvData = new FormData();
        csvData.append("csv", event.dataTransfer.files[0]);
        axios
          .post(
            ADMIN_URL + `/student/many?collegeId=${authContext.college.id}`,
            csvData,
            config
          )
          .then((res) => {
            setUserUX((prev) => ({
              ...prev,
              add: { ...prev.add, loading: false, success: true },
            }));
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
            setUserUX((prev) => ({
              ...prev,
              add: {
                loading: false,
                error: true,
                errorMsg: "uploadingerror",
              },
            }));
          });
      }
    }
  };

  useEffect(() => {
    setUserUX((prev) => ({ ...prev, list: { ...prev.list, loading: true } }));
    // GET request to get all courses to display it in the sidebar
    axios
      .get(
        STAFF_URL +
          `/courses/semester/decc46ba-7d4b-11ed-a1eb-0242ac120002/professor/cf5cf8d0-828d-4c9d-944d-f3facc3ce26e`,
        config
      )
      .then((res) => {
        console.log(res);
        setCourses(res.data);
        setUserUX((prev) => ({
          ...prev,
          list: { ...prev.list, loading: false },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          list: { loading: false, error: true, errorMsg: "error.common" },
        }));
      });

    // eslint-disable-next-line
  }, [authContext.id]);

  useEffect(() => {
    if (courseId && courses.length !== 0) {
      const course = courses.filter((course) => course.id === courseId);
      setCurrCourse({
        englishName: course[0].englishName,
        arabicName: course[0].arabicName,
      });
    }
    // eslint-disable-next-line
  }, [courseId, courses]);

  const handleCourseSelect = (item) => {
    console.log(item);
    navigate(`${item.id}`);
  };

  const handlePrint = () => {
    const printArea = printAreaRef.current;
    if (printArea) {
      const printContents = printArea.innerHTML;
      const originalContents = document.body.innerHTML;
      const stylesheets = Array.from(document.styleSheets);

      const printWindow = window.open("", "_blank", "width=1000,height=800");
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            ${stylesheets
              .map((sheet) => `<link rel="stylesheet" href="${sheet.href}" />`)
              .join("")}
            <style>
              ${Array.from(document.getElementsByTagName("style"))
                .map((style) => style.innerHTML)
                .join("")}
            </style>
          </head>
          <body>${printContents}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      printWindow.onafterprint = () => {
        printWindow.close();
        document.body.innerHTML = originalContents;
      };
    }
  };

  const handleStudentsSave = () => {
    setUserUX((prev) => ({
      ...prev,
      form: { loading: true, error: false, success: false, errorMsg: "" },
    }));
    const studentsData = students.map((student) => ({
      studentId: student.id,
      classworkScore: +student.classworkScore,
      midtermScore: +student.midtermScore,
      finalScore: +student.finalScore,
    }));
    axios
      .put(STAFF_URL + `/assign/${courseId}`, studentsData, config)
      .then((res) => {
        console.log(res);
        setUserUX((prev) => ({
          ...prev,
          form: { ...prev.form, loading: false, success: true },
        }));
      })
      .catch((err) => {
        console.log(err);
        setUserUX((prev) => ({
          ...prev,
          form: {
            ...prev.form,
            loading: false,
            error: true,
            errorMsg: "error.common",
          },
        }));
      });
  };

  if (courseId === undefined) {
    return (
      <div className="container">
        <SearchContainer
          title={"grades.mark"}
          inputPlaceholder={"common.search"}
          listData={courses}
          handleListClick={handleCourseSelect}
          userUX={userUX.list}
        />
      </div>
    );
  } else {
    return (
      <>
        <Sidebar
          sideData={courses.map((obj) => ({
            ...obj,
            path: `/admin/results/${obj.id}`,
          }))}
          sidebarTitle={"grades.mark"}
          searchable={true}
          inputPlaceholder={"common.search"}
          backendData={true}
          activeNav={true}
          userUX={userUX.list}
        />
        <SidebarContainer>
          <div ref={printAreaRef}>
            <FormCard>
              {userUX.students.loading ? (
                <SpinnerLoader size={100} />
              ) : userUX.students.error || students.length === 0 ? (
                <Alert variant="danger">
                  {students.length === 0
                    ? t("error.noStudents")
                    : t("error.common")}
                </Alert>
              ) : (
                <div className="table-container">
                  <div className="table-container-mainHeader">
                    <h1>
                      {t("professor.grades")}
                      {i18next.language === "en"
                        ? ` - ${currCourse.englishName || ""}`
                        : ` - ${currCourse.arabicName || ""}`}
                    </h1>
                    <button onClick={handlePrint}>{t("common.print")}</button>
                  </div>
                  <table className="table table-bordered">
                    <thead className="thead-light">
                      <tr>
                        {CourseworkHeaderItems.map((item) => {
                          return (
                            <th
                              key={item.id}
                              className="table-container-header"
                            >
                              {t(item.title)}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((item, index) => {
                        return (
                          <CourseworkRow
                            student={item}
                            key={index}
                            order={index + 1}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                  <button
                    className="form-card-button form-card-button-save m-0"
                    onClick={handleStudentsSave}
                    disabled={userUX.form.loading}
                  >
                    {userUX.form.loading ? (
                      <span className="loader"></span>
                    ) : (
                      t(`common.save`)
                    )}
                  </button>
                  {userUX.form.error && (
                    <Alert variant="danger mt-3">{t("error.common")}</Alert>
                  )}
                </div>
              )}
            </FormCard>
          </div>
          {!(
            students.length === 0 ||
            userUX.students.loading ||
            userUX.students.error
          ) && (
            <FormCard>
              <div
                className={styles.dashform}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className={styles.dashform_icon}>
                  <TbFileUpload />
                </div>
                <div className={styles.dashform_square}>
                  <h4 className={styles.dashform_square_text}>
                    {t("common.drag")}
                  </h4>
                  <label className={styles.dashform_square_customFileInput}>
                    <input type="file" />
                    {t("common.click")}
                  </label>
                </div>
              </div>
            </FormCard>
          )}

          {userUX.add.error && (
            <ModalPopup
              message={{
                state: true,
                icon: <MdErrorOutline />,
                title: "popup.error",
                text: userUX.errorMsg,
                button: "common.continue",
                handleClick: () => {
                  setUserUX((prev) => {
                    return { ...prev, error: false, errorMsg: "" };
                  });
                },
              }}
              error={true}
              closeModal={() => {
                setUserUX((prev) => {
                  return { ...prev, error: false, errorMsg: "" };
                });
              }}
            />
          )}
          {(userUX.add.success || userUX.form.success) && (
            <ModalPopup
              message={{
                state: true,
                icon: <BsFillPersonCheckFill />,
                title: "popup.success",
                text: "popup.message_success",
                button: "common.save",
                handleClick: () => {
                  setUserUX((prev) => ({
                    ...prev,
                    form: { ...prev.form, success: false },
                  }));
                },
              }}
              closeModal={() => {
                setUserUX((prev) => ({
                  ...prev,
                  form: { ...prev.form, success: false },
                }));
              }}
            />
          )}
        </SidebarContainer>
      </>
    );
  }
};
