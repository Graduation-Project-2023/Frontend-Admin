import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios";
import { BASE_URL } from "../../../../shared/API";
import { useTranslation } from "react-i18next";
import { FaPlusCircle } from "react-icons/fa";
import styles from "./AcademicPorgramsPortal.module.scss";

export const AcademicPorgramsPortal = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const authContext = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    // Get request to get all programs to display it in the menu
    axios
      .get(BASE_URL + `/programs?college_id=${authContext.college.id}`)
      .then((res) => {
        setPrograms(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        console.log(error);
      });
  }, []);

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
          <li
            onClick={() => {
              navigate("add");
            }}
          >
            {t("portal.add")}
            <FaPlusCircle style={{ margin: "10px" }} />
          </li>
          {programs.map((item) => {
            return (
              <li
                key={item.id}
                onClick={() => {
                  navigate(`${item.id}/main`);
                }}
              >
                {currentLanguageCode === "en"
                  ? item.englishName
                  : item.arabicName}
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};
