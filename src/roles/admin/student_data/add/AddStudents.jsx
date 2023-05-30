import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios";
import { ADMIN_URL } from "../../../../shared/API";
import styles from "./AddStudents.module.scss";

// Reusable Components and Icons
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { ModalPopup } from "../../../../components/popups/ModalPopup";
import { TbFileUpload } from "react-icons/tb";
import { MdErrorOutline } from "react-icons/md";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { SpinnerLoader } from "../../../../components/loaders/SpinnerLoader";

export const AddStudents = () => {
  const [userUX, setUserUX] = useState({
    loading: false,
    success: false,
    error: false,
    errorMsg: "",
  });
  const { t } = useTranslation();
  const authContext = useAuth();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };
  const handleDragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setUserUX((prev) => ({ ...prev, loading: true }));
    if (event.dataTransfer.files.length > 1) {
      setUserUX((prev) => ({
        ...prev,
        loading: false,
        error: true,
        errorMsg: t("studentsData.error.moreThanOne"),
      }));
    } else {
      if (event.dataTransfer.files[0].type !== "text/csv") {
        setUserUX((prev) => ({
          ...prev,
          loading: false,
          error: true,
          errorMsg: t("studentsData.error.notCSV"),
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
              loading: false,
              success: true,
            }));
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
            setUserUX({
              loading: false,
              success: false,
              error: true,
              errorMsg: "error.common",
            });
          });
      }
    }
  };

  return (
    <FormNavbarContainer>
      <div className={styles.addform}>
        {userUX.loading ? (
          <SpinnerLoader size={"80px"} heigth={"250px"} />
        ) : (
          <div
            className={styles.dashform}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{ width: "80%" }}
          >
            <div className={styles.dashform_icon}>
              <TbFileUpload />
            </div>
            <h4 className={styles.dashform_text}>{t("common.drag")}</h4>
          </div>
        )}
      </div>

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

      {userUX.error && (
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
    </FormNavbarContainer>
  );
};
