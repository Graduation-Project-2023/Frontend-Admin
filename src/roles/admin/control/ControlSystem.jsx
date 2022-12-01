import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from "react-i18next";
import styles from "./ControlSysytem.module.scss";
import {RiCloseCircleFill} from "react-icons/ri"

export const ControlSystem = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <button  onClick={handleShow}>
    click meee
    </button>

    <Modal show={show} onHide={handleClose} className={styles.popup}>
    <Modal.Header className={styles.popup_header}>
      
      <Modal.Title className={styles.popup_title}>{t(`academicMain.faculty`)}</Modal.Title> 
      <button onClick={handleClose}>X</button>
          <input
            type="text"
            placeholder={t("academicMain.search")}
          />


      
    </Modal.Header>
    <Modal.Body>
    

        <div className={styles.popup_list}>
          <li>كلية الهندسة</li>
          <li>كلية الهندسة</li>
          <li>كلية الهندسة</li>
          <li>كلية الهندسة</li>
          <li>كلية الهندسة</li>
          <li>كلية الهندسة</li>
          <li>كلية الهندسة</li>
          <li>كلية الهندسة</li>
          <li>كلية الهندسة</li>
        </div>
    </Modal.Body>
    </Modal>
    </>
  





  )
};
