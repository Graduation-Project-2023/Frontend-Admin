import styles from "./AcademicPorgramsPortal.module.scss";
import { useTranslation } from "react-i18next";
import { BiSearchAlt } from "react-icons/bs";

export const AcademicPorgramsPortal = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <div className={styles.portal_body}>
        <h5 className={styles.portal_title}>{t("portal.programs")}</h5>

        <div className={styles.portal_search}>
          <input
            type="text"
            className={styles.portal_search_rec}
            placeholder={t("portal.search")}
          />
        </div>

        <div className={styles.portal_list}>
          <li>
            {t("portal.add")}
            <button className={styles.portal_btn}> + </button>
          </li>
          <li>المستوى الاول</li>
          <li>المستوى الاول لائحة </li>
          <li>الهندسة الكهربية</li>
          <li>الهندسة الكهربية شعبة..</li>
          <li>الهندسة الميكانيكية</li>
          <li>الهندسة الميكانيكية شعية..</li>
          <li>الهندسة المدنية</li>
          <li> الهندسة المدنية شعبة..</li>
          <li>الهندسة المعمارية</li>
        </div>
      </div>
    </div>
  );
};
