import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ADMIN_URL } from "../../../shared/API";
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
import { CourseworkHeaderItems, CourseworkStudents } from "./CourseworkData";
import { CourseworkRow } from "./CourseworkRow";

export const Coursework = () => {
  const [courses, setCourses] = useState([]);
  const [userUX, setUserUX] = useState({
    list: { loading: false, error: false, errorMsg: "" },
    add: { loading: false, success: false, error: false, errorMsg: "" },
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
    // GET request to get all college courses to display it in the sidebar
    axios
      .get(ADMIN_URL + `/courses?college_id=${authContext.college.id}`, config)
      .then((res) => {
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
          list: { loading: false, error: true, errorMsg: "erorrr" },
        }));
      });

    // eslint-disable-next-line
  }, [authContext.college.id]);

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

      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
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
            path: `/staff/coursework/${obj.id}`,
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
                          <th key={item.id} className="table-container-header">
                            {t(item.title)}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {CourseworkStudents.map((item, index) => {
                      return (
                        <CourseworkRow
                          student={item}
                          key={item.id}
                          order={index + 1}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </FormCard>
          </div>
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
          {userUX.add.success && (
            <ModalPopup
              message={{
                state: true,
                icon: <BsFillPersonCheckFill />,
                title: "popup.success",
                text: "popup.message_success",
                button: "common.save",
                handleClick: () => {
                  setUserUX((prev) => {
                    return { ...prev, success: false };
                  });
                },
              }}
              closeModal={() => {
                setUserUX((prev) => {
                  return { ...prev, success: false };
                });
              }}
            />
          )}
        </SidebarContainer>
      </>
    );
  }
};
