import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./AddStudents.module.scss";
import { StudentsWrongData } from "./StudentsWrongData";
import { useAuth } from "../../../../hooks/useAuth";

// Reusable Components and Icons
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { ModalPopup } from "../../../../components/popups/ModalPopup";
import { TbFileUpload } from "react-icons/tb";
import { MdErrorOutline } from "react-icons/md";
import { BsFillPersonCheckFill } from "react-icons/bs";
import axios from "axios";
import { BASE_URL } from "../../../../shared/API";

export const AddStudents = () => {
  const authContext = useAuth();
  const [files, setFiles] = useState();
  const [userUX, setUserUX] = useState({
    CSV: { loading: false, success: false, error: false, error_msg: "" },
    table: true,
  });
  const { t } = useTranslation();

  const handleDragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
    console.log("hello drag");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
    console.log(files);
    setUserUX((prev) => ({ ...prev, CSV: { ...prev.CSV, loading: true } }));
    if (event.dataTransfer.files.length > 1) {
      console.log("more than one file");
      setUserUX((prev) => ({ ...prev, csvLoading: false }));
    } else {
      if (event.dataTransfer.files[0].type !== "text/csv") {
        console.log("not csv");
        setUserUX((prev) => ({
          ...prev,
          CSV: {
            ...prev.CSV,
            loading: false,
            error: true,
            error_msg: "not csv",
          },
        }));
      } else {
        console.log("everything ok");
        console.log(event.dataTransfer.files[0]);
        setUserUX((prev) => ({
          ...prev,
          CSV: { ...prev.CSV, loading: false },
        }));
        axios
          .post(
            BASE_URL + `student/bulk?collegeId=${authContext.college.id}`,
            files
          )
          .then((res) => {
            setUserUX((prev) => ({
              ...prev,
              CSV: { ...prev.CSV, loading: false, success: true },
            }));
            console.log(res.data);
          })
          .catch((err) => {
            setUserUX((prev) => ({
              ...prev,
              CSV: {
                ...prev.CSV,
                loading: false,
                success: false,
                error: true,
                error_msg: "uploadingerror",
              },
            }));
          });
      }
    }
  };

  return (
    <FormNavbarContainer>
      <div className={styles.addform}>
        {userUX.CSV.error && <h1>{userUX.CSV.error_msg}</h1>}
        {userUX.CSV.loading ? (
          <h1>loading</h1>
        ) : (
          <div
            className={styles.dashform}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className={styles.dashform_icon}>
              <TbFileUpload />
            </div>
            <h4 className={styles.dashform_text}>{t("common.drag")}</h4>
          </div>
        )}
      </div>

      {/* Table */}
      {userUX.table && (
        <table
          className={styles.tableHead}
          child={true}
          closeModal={() => {
            setUserUX({ table: false });
          }}
        >
          <thead>
            <tr>
              <th className={styles.tableHead_title}>الاسم</th>
              <th className={styles.tableHead_title}>الرقم القومى</th>
            </tr>
          </thead>
          <tbody>
            {StudentsWrongData.map((value, key) => {
              return (
                <tr key={key}>
                  <td className={styles.tableHead_data}>{value.name}</td>
                  <td className={styles.tableHead_error}>{value.nationalId}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Success Modal */}
      {userUX.CSV.success && (
        <ModalPopup
          message={{
            state: true,
            icon: <BsFillPersonCheckFill />,
            title: "popup.success",
            text: "popup.message_success",
            button: "common.save",
            handleClick: () => {
              setUserUX((prev) => {
                return { ...prev, CSV: { ...prev.CSV, success: false } };
              });
            },
          }}
          closeModal={() => {
            setUserUX((prev) => {
              return { ...prev, CSV: { ...prev.CSV, success: false } };
            });
          }}
        />
      )}

      {/* Error Modal */}
      {userUX.CSV.error && (
        <ModalPopup
          message={{
            state: true,
            icon: <MdErrorOutline />,
            title: "popup.error",
            text: "popup.message_error",
            button: "common.continue",
            handleClick: () => {
              setUserUX((prev) => {
                return { ...prev, CSV: { ...prev.CSV, error: false } };
              });
            },
          }}
          error={true}
          closeModal={() => {
            setUserUX((prev) => {
              return { ...prev, CSV: { ...prev.CSV, error: false } };
            });
          }}
        />
      )}
    </FormNavbarContainer>
  );
};
