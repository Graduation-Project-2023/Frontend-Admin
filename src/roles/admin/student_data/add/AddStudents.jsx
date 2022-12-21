import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./AddStudents.module.scss";
import { StudentsWrongData } from "./StudentsWrongData";

// Reusable Components and Icons
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { ModalPopup } from "../../../../components/popups/ModalPopup";
import { TbFileUpload } from "react-icons/tb";
import { MdErrorOutline } from "react-icons/md";
import { BsFillPersonCheckFill } from "react-icons/bs";

export const AddStudents = () => {
  const [userUX, setUserUX] = useState({
    error: true,
    success: false,
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
    if (event.dataTransfer.files.length > 1) {
      console.log("more than one file");
    } else {
      if (event.dataTransfer.files[0].type !== "text/csv") {
        console.log("not csv");
      } else {
        console.log("everything ok");
        console.log(event.dataTransfer.files[0]);
        // backend logic
      }
    }
  };

  return (
    <FormNavbarContainer>
      <div className={styles.addform}>
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
      {userUX.success && (
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

      {/* Error Modal */}
      {userUX.error && (
        <ModalPopup
          message={{
            state: true,
            icon: <MdErrorOutline />,
            title: "popup.error",
            text: "popup.message_error",
            button: "common.continue",
            handleClick: () => {
              setUserUX((prev) => {
                return { ...prev, error: false };
              });
            },
          }}
          error={true}
          closeModal={() => {
            setUserUX((prev) => {
              return { ...prev, error: false };
            });
          }}
        />
      )}
    </FormNavbarContainer>
  );
};
