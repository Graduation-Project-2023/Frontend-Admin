import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { STAFF_URL } from "../../../shared/API";
import axios from "axios";
import i18next from "i18next";

// Reusable Components
import { SearchContainer } from "../../../components/other/SearchContainer";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import { SidebarContainer } from "../../../components/sidebar/SidebarContainer";
import { FormCard } from "../../../components/forms/FormCard";
import { SpinnerLoader } from "../../../components/loaders/SpinnerLoader";
import { Alert } from "react-bootstrap";

export const StaffStudents = () => {
  const [courses, setCourses] = useState([]);
  const [currCourse, setCurrCourse] = useState({
    englishName: "",
    arabicName: "",
  });
  const [students, setStudents] = useState([]);
  const [userUX, setUserUX] = useState({
    list: { loading: false, error: false, errorMsg: "" },
    students: { loading: false, success: false, error: false, errorMsg: "" },
  });
  const authContext = useAuth();
  const { t } = useTranslation();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const printAreaRef = useRef(null);
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };
  const HeaderItems = [
    { id: 0, title: "" },
    { id: 1, title: "studentsData.code" },
    { id: 2, title: "studentsData.name" },
    { id: 4, title: "studentsData.attendance" },
    { id: 3, title: "common.notes" },
  ];

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
                notes: "",
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

  useEffect(() => {
    setUserUX((prev) => ({ ...prev, list: { ...prev.list, loading: true } }));
    // GET request to get all professor courses to display it in the sidebar
    axios
      .get(
        STAFF_URL +
          `/courses/semester/decc46ba-7d4b-11ed-a1eb-0242ac120002/professor/${authContext.id}`,
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

  if (courseId === undefined) {
    return (
      <div className="container">
        <SearchContainer
          title={"professor.studentList"}
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
            path: `/staff/students_info/${obj.id}`,
          }))}
          sidebarTitle={"professor.studentList"}
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
                      {t("professor.course")}
                      {i18next.language === "en"
                        ? ` - ${currCourse.englishName || ""}`
                        : ` - ${currCourse.arabicName || ""}`}
                    </h1>
                    <button onClick={handlePrint}>{t("common.print")}</button>
                  </div>
                  <table className="table table-bordered">
                    <thead className="thead-light">
                      <tr>
                        {HeaderItems.map((item) => {
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
                          <tr key={index}>
                            <td className="table-container-items">
                              {index + 1}
                            </td>
                            <td className="table-container-items">
                              {item.nationalId}
                            </td>
                            <td className="table-container-items">
                              {i18next.language === "en"
                                ? item.englishName
                                : item.arabicName}
                            </td>
                            <td className="table-container-items">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                style={{
                                  cursor: "pointer",
                                }}
                              />
                            </td>
                            <td className="table-container-items">
                              {item.notes}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </FormCard>
          </div>
        </SidebarContainer>
      </>
    );
  }
};
