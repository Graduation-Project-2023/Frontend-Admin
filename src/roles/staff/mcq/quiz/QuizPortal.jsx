import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ADMIN_URL } from "../../../../shared/API";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios";
import styles from "../../../admin/student_data/portal/StudentDataPortal.module.scss";

// Reusable Components
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { BanksSidebar } from "../components/BanksSidebar";
import { ViewQuiz } from "./ViewQuiz";
import { Accordion } from "react-bootstrap";
import { SpinnerLoader } from "../../../../components/loaders/SpinnerLoader";
import { Alert } from "react-bootstrap";

export const QuizPortal = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [userUX, setUserUX] = useState({
    quizzes: { loading: false, error: false, errorMsg: "" },
  });
  const { bankId } = useParams();
  const { t } = useTranslation();
  const authContext = useAuth();
  const navigate = useNavigate();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };

  useEffect(() => {
    if (bankId === undefined) {
      return;
    } else {
      setUserUX((prev) => ({
        ...prev,
        quizzes: { loading: true, error: false, errorMsg: "" },
      }));
      // GET request to get all quizzes in a specific bank
      axios
        .get(ADMIN_URL + `/sheet/${bankId}/all`, config)
        .then((res) => {
          console.log(res);
          setQuizzes(res.data);
          setFilteredQuizzes(res.data);
          setUserUX((prev) => ({
            ...prev,
            quizzes: {
              loading: false,
              error: res.data.length === 0 ? true : false,
              errorMsg: res.data.length === 0 ? "mcq.noQuizzes" : "",
            },
          }));
        })
        .catch((error) => {
          console.log(error);
          setUserUX((prev) => ({
            ...prev,
            quizzes: {
              loading: false,
              error: true,
              errorMsg: "error.common",
            },
          }));
        });
    }

    // eslint-disable-next-line
  }, [bankId]);

  useEffect(() => {
    setFilteredQuizzes(
      quizzes.filter(
        (item) =>
          item.englishName?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.arabicName?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    // eslint-disable-next-line
  }, [searchValue]);

  return (
    <FormNavbarContainer>
      <div className={styles.studentBody}>
        <BanksSidebar bankId={bankId} navRoute={"/staff/mcq/quiz/"} />
        <div className="mcq-cont">
          {bankId === undefined ? (
            <h1 className="text-center alert alert-info" role="alert">
              {t("mcq.selectBank")}
            </h1>
          ) : (
            <>
              <div className="mcq-cont-search search-add">
                <input
                  type="text"
                  placeholder={t("mcq.quizSearch")}
                  value={searchValue}
                  className="form-control"
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    navigate("add");
                  }}
                  className="btn btn-outline-primary"
                >
                  {t("mcq.addQuiz")}
                </button>
              </div>
              {userUX.quizzes.loading ? (
                <SpinnerLoader size={"60px"} heigth={"250px"} />
              ) : userUX.quizzes.error ? (
                <Alert variant="danger">{t(userUX.quizzes.errorMsg)}</Alert>
              ) : (
                filteredQuizzes.map((item) => (
                  <Accordion
                    defaultActiveKey="0"
                    alwaysOpen
                    className="collapseSection"
                    key={item.id}
                  >
                    <Accordion.Item
                      eventKey={quizzes?.length === 1 ? "0" : `${item.id}`}
                      key={item.id}
                    >
                      <ViewQuiz quiz={item} />
                    </Accordion.Item>
                  </Accordion>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </FormNavbarContainer>
  );
};
