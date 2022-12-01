import styles from "./AcademicPorgramsPortal.module.scss";
import { useTranslation } from "react-i18next";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie";

export const AcademicPorgramsPortal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentLanguageCode = cookies.get("i18next") || "en";

  //Mocking backend data
  const programs = [
    { id: 1, arabicName: "المستوى الاول", englishName: "First Level" },
    {
      id: 2,
      arabicName: "المستوى الاول لائحة",
      englishName: "First Level Slate",
    },
    {
      id: 3,
      arabicName: "الهندسة الكهربية",
      englishName: "Electrical Engineering",
    },
    {
      id: 4,
      arabicName: "الهندسة المعمارية ",
      englishName: "Architectural Engineering",
    },
    {
      id: 5,
      arabicName: "الهندسة الميكانيكية",
      englishName: "Mechanical Engineering",
    },
    { id: 6, arabicName: "الهندسة المدنية", englishName: "Civil Engineering" },
  ];
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
