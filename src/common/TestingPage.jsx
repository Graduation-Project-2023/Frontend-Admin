import { Sidebar } from "../components/sidebar/Sidebar";
import { useState, useEffect, useRef } from "react";
import { ADMIN_URL } from "../shared/API";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { SidebarContainer } from "../components/sidebar/SidebarContainer";
import { FormCard } from "../components/forms/FormCard";
import styles from "../roles/admin/student_data/add/AddStudents.module.scss";
import { TbFileUpload } from "react-icons/tb";
import { MdErrorOutline } from "react-icons/md";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { ModalPopup } from "../components/popups/ModalPopup";

export const TestingPage = () => {
  const authContext = useAuth();
  const { t } = useTranslation();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };
  const [userUX, setUserUX] = useState({
    list: { loading: false, error: false, errorMsg: "" },
    add: { loading: false, success: false, error: false, errorMsg: "" },
  });
  const [courses, setCourses] = useState([]);
  const classWorkRef = useRef();

  const finalExamRef = useRef();
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
  // const handleEditFormChange = (event) => {
  //   event.preventDefault();
  //   let fieldValue = event.target.value;
  //   if (event.target.type === "number") {
  //     fieldValue = +fieldValue;
  //   }
  //     +classWorkRef.current.value +
  //     +finalExamRef.current.value =
  //     maxGrade }

  const headerItems = [
    { id: 1, title: t(`studentsData.code`) },
    { id: 2, title: t(`studentsData.name`) },
    { id: 3, title: t(`courses.class`) },
    { id: 4, title: t(`courses.final`) },

    { id: 5, title: t(`common.total`) },
    { id: 6, title: t(`grades.grade`) },
    { id: 7, title: t(`academicSidebar.gpa`) },
  ];
  const students = [
    { id: 1, code: 1, name: "ahmed", grade: "A", gpa: 3.5 },
    { id: 2, code: 2, name: "mohamed", grade: "A", gpa: 3.5 },
    { id: 3, code: 3, name: "ali", grade: "A", gpa: 3.5 },
    { id: 4, code: 4, name: "khaled", grade: "A", gpa: 3.5 },
    { id: 5, code: 5, name: "mohamed", grade: "A", gpa: 3.5 },
  ];
  return (
    <>
      <Sidebar
        sideData={courses.map((obj) => ({ ...obj, path: obj.id }))}
        sidebarTitle={"grades.mark"}
        searchable={true}
        inputPlaceholder={"common.search"}
        backendData={true}
        activeNav={true}
        userUX={userUX.list}
      />
      <SidebarContainer>
        <FormCard cardTitle={"physics"} button={"print"}>
          <div className="table-container">
            <table className="table table-bordered">
              <thead className="thead-light">
                {headerItems.map((item) => {
                  return (
                    <th key={item.id} className="table-container-header">
                      {item.title}
                    </th>
                  );
                })}
              </thead>
              <tbody>
                {students.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td className="table-container-items">{item.code}</td>
                      <td className="table-container-items">{item.name}</td>
                      <td>
                        <input
                          className="form-control"
                          type="number"
                          name="classWork"
                          ref={classWorkRef}
                          // onChange={handleEditFormChange}
                        />
                      </td>
                      <td>
                        <input
                          className="form-control"
                          type="number"
                          name="finalExam"
                          ref={finalExamRef}
                          required
                          // onChange={handleEditFormChange}
                        />
                      </td>
                      <td className="table-container-items">
                        {" "}
                        <input
                          className="form-control"
                          type="number"
                          name="maxGrade"
                          readOnly
                          disabled
                        />
                      </td>
                      <td className="table-container-items">{item.grade}</td>
                      <td className="table-container-items">{item.gpa}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </FormCard>
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
};
