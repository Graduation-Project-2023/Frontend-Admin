import { useParams, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./ProgramsSidebar.module.scss";

const ProgramsSidebarData = [
  {
    id: "1",
    title: "main",
    path: "",
  },
  {
    id: "2",
    title: "levels",
    path: "/levels",
  },
  {
    id: "3",
    title: "grades",
    path: "/grades",
  },
  {
    id: "4",
    title: "courses",
    path: "/courses",
  },
  {
    id: "5",
    title: "control",
    path: "/control",
  },
  {
    id: "6",
    title: "graduation",
    path: "/graduation",
  },
];

export const ProgramsSidebar = () => {
  const { programId } = useParams();
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.sidebar_data}>
          <div>
            <h5>اسم الطالب كامل</h5>
            <h6>الشعبة</h6>
          </div>
        </div>
        <div className={styles.sidebar_list}>
          {ProgramsSidebarData.map((item) => {
            return (
              <li>
                <NavLink to={`${programId}${item.path}`}>
                  {t(`${item.title}`)}
                </NavLink>
              </li>
            );
          })}
        </div>
      </div>
    </>
  );
};
