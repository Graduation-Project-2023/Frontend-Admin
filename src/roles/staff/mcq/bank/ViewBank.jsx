import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ADMIN_URL } from "../../../../shared/API";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios";
import styles from "../../../admin/student_data/portal/StudentDataPortal.module.scss";

// Reusable Components
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { QuestionCard } from "../components/QuestionCard";
import { BanksSidebar } from "../components/BanksSidebar";

export const ViewBank = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  // eslint-disable-next-line
  const [userUX, setUserUX] = useState({
    questions: { loading: false, error: false, errorMsg: "" },
  });
  const { bankId } = useParams();
  const { t } = useTranslation();
  const authContext = useAuth();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };

  useEffect(() => {
    if (bankId === undefined) {
      return;
    } else {
      setUserUX((prev) => ({
        ...prev,
        questions: { loading: true, error: false, errorMsg: "" },
      }));
      // GET request to get all MCQ questions in a specific bank
      axios
        .get(ADMIN_URL + `/question/${bankId}/all`, config)
        .then((res) => {
          console.log(res);
          setQuestions(res.data);
          setFilteredQuestions(res.data);
          setUserUX((prev) => ({
            ...prev,
            questions: {
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
            questions: {
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
    setFilteredQuestions(
      questions.filter((item) =>
        item.question?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    // eslint-disable-next-line
  }, [searchValue]);

  return (
    <FormNavbarContainer>
      <div className={styles.studentBody}>
        <BanksSidebar bankId={bankId} navRoute={"/staff/mcq/bank/"} />

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
              {filteredQuestions.map((item, index) => (
                <QuestionCard
                  key={item.id}
                  question={item}
                  questionNumber={index}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </FormNavbarContainer>
  );
};
