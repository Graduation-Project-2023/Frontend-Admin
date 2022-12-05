import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { BASE_URL } from "../../../../shared/API";
import cookies from "js-cookie";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";
import styles from "./AcademicPorgramsPortal.module.scss";

export const AcademicPorgramsPortal = () => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState();
  const authContext = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    console.log(authContext.college);
    if (Object.keys(authContext.college).length === 0) {
      navigate("/admin_portal");
    }
    // Get request to get all programs to display it in the menu
    axios
      .get(BASE_URL + `/programs?college_id=${authContext.college.id}`)
      .then((res) => {
        setPrograms(res.data);
        setFilteredPrograms(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentLanguageCode === "en") {
      setFilteredPrograms(
        programs.filter((item) =>
          item.englishName.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      setFilteredPrograms(
        programs.filter((item) =>
          item.arabicName.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
    // eslint-disable-next-line
  }, [searchValue]);

  return (
    <div className="container">
      <div className={styles.portal_body}>
        <h5 className={styles.portal_title}>{t("portal.programs")}</h5>
        <div className={styles.portal_search}>
          <input
            type="text"
            className={styles.portal_search_rec}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
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
          {filteredPrograms.map((item) => {
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
