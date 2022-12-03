import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks/useAuth";
import { BASE_URL } from "../../../shared/API";
import axios from "axios";
import cookies from "js-cookie";
import styles from "./AdminPortal.module.scss";
import Modal from "react-bootstrap/Modal";

export const AdminPortal = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [colleges, setColleges] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState();
  const authContext = useAuth();
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    setLoading(true);
    axios
      .get(BASE_URL + "/colleges")
      .then((res) => {
        setColleges(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setShow(true);
        }}
      >
        Show Colleges Menu
      </button>

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        className={styles.popup}
      >
        <Modal.Header className={styles.popup_header}>
          <Modal.Title className={styles.popup_title}>
            {t(`academicMain.faculty`)}
          </Modal.Title>
          <button
            onClick={() => {
              setShow(false);
            }}
          >
            X
          </button>
          <input type="text" placeholder={t("academicMain.search")} />
        </Modal.Header>
        <Modal.Body>
          <div className={styles.popup_list}>
            {colleges.map((item) => {
              return (
                <Link
                  key={item.id}
                  onClick={() => {
                    authContext.changeCollege(item);
                  }}
                  to="academic_programs"
                >
                  {t(`header.college`)}
                  {currentLanguageCode === "en"
                    ? item.englishName
                    : item.arabicName}
                </Link>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
