import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Navbar } from "../common/Navbar";
import styles from './styles/Admission.module.scss'

export const Admission = () => {
  const { t } = useTranslation();
  const arabicNameRef = useRef();
  const englishNameRef = useRef();
  const birthdayRef = useRef();
  const birthplaceRef = useRef();
  const nationalityRef = useRef();
  const nationalIdRef = useRef();
  const religionRef = useRef();
  const genderRef = useRef();

  const handleAdmissionSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar />
      <div className={`container ${styles.admissionPage}`}>
        <div className={`row ${styles.admissionPage_header}`}>
          <h1 className={`row ${styles.admissionPage_header_eng}`}>
            {t(`admission.header`)}
          </h1>
        </div>
        <div className={`row ${styles.admissionPage_subheader}`}>
          {t(`admission.sub-header`)}
        </div>
        <div className={styles.admissionPage_line}></div>
        <form
          className={styles.admissionPage_form}
          onSubmit={(event) => {
            handleAdmissionSubmit(event);
          }}
        >
          <div className={`row ${styles.admissionPage_form_rows}`}>
            <div className={`col-12 col-md-5 ${styles.admissionPage_form_rows_cols}`}>
              <label className={`form-label ${styles.admissionPage_form_rows_cols_label}`}>
                {t(`admission.arabic-name`)}
              </label>
              <input
                type="text"
                ref={arabicNameRef}
                name="ausername"
                className="form-control form-control-lg"
              />
            </div>
            <div className={`col-12 col-md-5 ${styles.admissionPage_form_rows_cols}`}>
              <label className={`form-label ${styles.admissionPage_form_rows_cols_label}`}>
                {t(`admission.english-name`)}
              </label>
              <input
                type="text"
                ref={englishNameRef}
                name="eusername"
                className="form-control form-control-lg"
              />
            </div>
          </div>
          <div className={`row ${styles.admissionPage_form_rows}`}>
            <div className={`col-12 col-md-5 ${styles.admissionPage_form_rows_cols}`}>
              <label className={`form-label ${styles.admissionPage_form_rows_cols_label}`}>
                {t(`admission.birthdate`)}
              </label>
              <input
                type="date"
                ref={birthdayRef}
                name="birthdate"
                className="form-control form-control-lg"
              />
            </div>
            <div className={`col-12 col-md-5 ${styles.admissionPage_form_rows_cols}`}>
              <label className={`form-label ${styles.admissionPage_form_rows_cols_label}`}>
                {t(`admission.birthplace`)}
              </label>
              <input
                type="text"
                ref={birthplaceRef}
                name="birthplace"
                className="form-control form-control-lg"
                placeholder={t(`admission.birthplace_placeholder`)}
              />
            </div>
          </div>
          <div className={`row ${styles.admissionPage_form_rows}`}>
            <div className={`col-12 col-md-5 ${styles.admissionPage_form_rows_cols}`}>
              <label className={`form-label ${styles.admissionPage_form_rows_cols_label}`}>
                {t(`admission.nationality`)}
              </label>
              <input
                type="text"
                ref={nationalityRef}
                placeholder={t(`admission.nationality_placeholder`)}
                name="nationality"
                className="form-control form-control-lg"
              />
            </div>
            <div className={`col-12 col-md-5 ${styles.admissionPage_form_rows_cols}`}>
              <label className={`form-label ${styles.admissionPage_form_rows_cols_label}`}>
                {t(`admission.nationalId`)}
              </label>
              <input
                type="text"
                ref={nationalIdRef}
                placeholder="30002000500440000"
                name="passport"
                className="form-control form-control-lg"
              />
            </div>
          </div>
          <div className={`row ${styles.admissionPage_form_rows}`}>
            <div className={`col-12 col-md-5 ${styles.admissionPage_form_rows_cols}`}>
              <label className={`form-label ${styles.admissionPage_form_rows_cols_label}`}>
                {t(`common.religion`)}
              </label>
              <select className="form-select form-select-lg" ref={religionRef}>
                <option value="muslim">{t(`common.religion_muslim`)}</option>
                <option value="christian">
                  {t(`common.religion_christian`)}
                </option>
              </select>
            </div>
            <div className={`col-12 col-md-5 ${styles.admissionPage_form_rows_cols}`}>
              <label className={`form-label ${styles.admissionPage_form_rows_cols_label}`}>
                {t(`admission.gender`)}
              </label>
              <select className="form-select form-select-lg" ref={genderRef}>
                <option value="male">{t(`admission.gender_male`)}</option>
                <option value="female">{t(`admission.gender_female`)}</option>
              </select>
            </div>
          </div>
          <div className={`row ${styles.admissionPage_form_rows}`}>
            <div className={`col-12 col-md-5 d-grid gap-2 col-6 mx-auto ${styles.admissionPage_form_rows_cols}`}>
              <button className={styles.admissionPage_form_rows_cols_btn}>
                {t(`admission.button`)}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
