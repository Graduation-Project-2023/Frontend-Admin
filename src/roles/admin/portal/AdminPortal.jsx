import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import useAuth from "../../../hooks/useAuth";
import styles from "./AdminPortal.module.scss";

export const AdminPortal = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const authContext = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext.college.id !== null) {
      navigate("academic_programs");
    }
    // eslint-disable-next-line
  }, []);

  //Mocking data
  const colleges = [
    { id: 1, englishName: "Engineering", arabicName: "الهندسة" },
    { id: 2, englishName: "Arts", arabicName: "الفنون" },
    { id: 3, englishName: "Pharmacy", arabicName: "الصيدلة" },
    { id: 4, englishName: "Business", arabicName: "التجارة" },
  ];

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
                  {item.englishName}
                </Link>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
