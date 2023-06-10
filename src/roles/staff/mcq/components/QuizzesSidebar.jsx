import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { ADMIN_URL } from "../../../../shared/API";
import axios from "axios";
import i18next from "i18next";
import styles from "../../../admin/student_data/portal/StudentDataPortal.module.scss";

// Reusable Components
import { NoData } from "../../../../components/UX/NoData";
import { SpinnerLoader } from "../../../../components/loaders/SpinnerLoader";
import { NoSearch } from "../../../../components/UX/NoSearch";

export const QuizzesSidebar = (props) => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [userUX, setUserUX] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });
  const { t } = useTranslation();
  const authContext = useAuth();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };
  const { bankId, quizId, navRoute } = props;

  useEffect(() => {
    setUserUX({ loading: true, error: false, errorMsg: "" });
    // GET request to get all bank quizzes to view it in the sidebar
    axios
      .get(ADMIN_URL + `/sheet/${bankId}/all`, config)
      .then((res) => {
        console.log(res);
        setQuizzes(res.data);
        setFilteredQuizzes(res.data);
        setUserUX({
          loading: false,
          error: res.data.length === 0 ? true : false,
          errorMsg: res.data.length === 0 ? "No quizzes are found." : "",
        });
      })
      .catch((error) => {
        console.log(error);
        setUserUX({
          loading: false,
          error: true,
          errorMsg: "Error fetching quizzes...",
        });
      });

    // eslint-disable-next-line
  }, [bankId]);

  useEffect(() => {
    setFilteredQuizzes(
      quizzes.filter(
        (item) =>
          item.arabicName?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.englishName?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    // eslint-disable-next-line
  }, [searchValue]);

  return (
    <div className={styles.studentBody_students}>
      <h3>{t(`mcq.quizzes`)}</h3>
      <div className={styles.studentBody_students_search}>
        <input
          type="text"
          placeholder={t("mcq.quizSearch")}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </div>
      {filteredQuizzes.length === 0 ? (
        userUX.loading ? (
          <SpinnerLoader size={"60px"} heigth={"250px"} />
        ) : userUX.error ? (
          userUX.errorMsg
        ) : quizzes.length === 0 ? (
          <NoData />
        ) : (
          <NoSearch />
        )
      ) : (
        <div className={styles.studentBody_students_list}>
          {filteredQuizzes.map((item) => (
            <li key={item.id}>
              <NavLink
                to={navRoute + item.id}
                className={({ isActive }) =>
                  isActive ? "sidebar-list-active" : ""
                }
              >
                {i18next.language === "en" ? item.englishName : item.arabicName}
              </NavLink>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};
