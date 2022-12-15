import { useState, useEffect } from "react";
import { BASE_URL } from "../../shared/API";
import axios from "axios";
import { ModalPopup } from "../../components/popups/ModalPopup";
import { useTranslation } from "react-i18next";

export const AdminPortal = () => {
  const [colleges, setColleges] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(BASE_URL + "/colleges")
      .then((res) => {
        setColleges(res.data);
      })
      .catch((error) => {
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
          title={"academicMain.faculty"}
          searchable={true}
          popupList={{ state: true, data: colleges, path: "academic_programs" }}
          closeModal={() => {setShowModal(false)}}
        />
      )}
    </>
  );
};
