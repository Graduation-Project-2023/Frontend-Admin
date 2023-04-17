import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { ADMIN_URL } from "../../../shared/API";
import axios from "axios";
import styles from "../../admin/student_data/add/AddStudents.module.scss";

// Reusable Components
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
  const authContext = useAuth();
  const { t } = useTranslation();
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
        <FormCard>
          <div className="table-container">
            <div className="table-container-mainHeader">
              <h1>title</h1>
              <button>print button</button>
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
