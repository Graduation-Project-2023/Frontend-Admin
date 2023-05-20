import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ADMIN_URL } from "../../../../shared/API";
import { useAuth } from "../../../../hooks/useAuth";
import i18next from "i18next";
import axios from "axios";
import styles from "../../../admin/student_data/portal/StudentDataPortal.module.scss";

// Reusable Components
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { BanksSidebar } from "../components/BanksSidebar";
import { ViewQuiz } from "./ViewQuiz";
import { NoData } from "../../../../components/UX/NoData";
import { Accordion } from "react-bootstrap";

export const QuizPortal = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  // eslint-disable-next-line
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
      // GET request to get all MCQ quizzes in a specific bank
      axios
        .get(ADMIN_URL + `/question/${bankId}/all`, config)
        .then((res) => {
          console.log(res);
          setQuizzes(res.data);
          setFilteredQuizzes(res.data);
          setUserUX((prev) => ({
            ...prev,
            quizzes: {
              loading: false,
              error: res.data.length === 0 ? true : false,
              errorMsg: res.data.length === 0 ? "The bank is empty." : "",
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
              errorMsg: "Error fetching bank MCQ...",
            },
          }));
        });
    }

    // eslint-disable-next-line
  }, [bankId]);

  useEffect(() => {
    setFilteredQuizzes(
      quizzes.filter((item) =>
        item.question?.toLowerCase().includes(searchValue.toLowerCase())
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
            <h1 className="text-center alert alert-info m-5" role="alert">
              {t("mcq.selectBank")}
            </h1>
          ) : (
            <>
              <div className="mcq-cont-search">
                <input
                  type="text"
                  placeholder={t("mcq.questionSearch")}
                  value={searchValue}
                  className="form-control"
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                />
              </div>
              <button
                onClick={() => {
                  navigate("create");
                }}
              >
                create a new quiz
              </button>
              {filteredQuizzes.map((item, index) => (
                <Accordion
                  defaultActiveKey="0"
                  alwaysOpen
                  className="collapseSection"
                  key={item.id}
                >
                  {quizzes?.length === 0 && <NoData />}
                  {quizzes?.map((item) => {
                    return (
                      <Accordion.Item
                        eventKey={quizzes?.length === 1 ? "0" : `${item.id}`}
                        key={item.id}
                      >
                        <Accordion.Header>
                          {item.level}&nbsp;-&nbsp;
                          {i18next.language === "en"
                            ? item.englishName
                            : item.arabicName}
                        </Accordion.Header>
                        {/* <ViewQuiz quizId={whatever}/> */}
                      </Accordion.Item>
                    );
                  })}
                </Accordion>
              ))}
            </>
          )}
        </div>
      </div>
    </FormNavbarContainer>
  );
};
