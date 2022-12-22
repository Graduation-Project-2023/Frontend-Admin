import { useState, useEffect } from "react";
import { BASE_URL } from "../../shared/API";
import axios from "axios";
import { ModalPopup } from "../../components/popups/ModalPopup";
import { useTranslation } from "react-i18next";

export const AdminPortal = () => {
  const [colleges, setColleges] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userUX, setUserUX] = useState({ error: false, errorMsg: "" });
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(BASE_URL + "/colleges")
      .then((res) => {
        setUserUX({ error: false, errorMsg: "" });
        setColleges(res.data);
      })
      .catch((error) => {
        setUserUX({ error: true, errorMsg: error.message });
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        onClick={() => {
          setShowModal(true);
        }}
      >
        {t("اظهار قائمة الكليات")}
      </div>
      {showModal && (
        <ModalPopup
          error={{ state: userUX.error, message: userUX.errorMsg }}
          title={"academicMain.faculty"}
          searchable={true}
          list={{ state: true, data: colleges, path: "academic_programs" }}
          closeModal={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  );
};
