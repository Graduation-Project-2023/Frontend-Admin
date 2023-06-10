import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ADMIN_URL } from "../../../../shared/API";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios";
import styles from "../../../admin/student_data/portal/StudentDataPortal.module.scss";

// Reusable Components
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { BsTrash } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { BanksSidebar } from "../components/BanksSidebar";
import { set } from "react-hook-form";

export const AddToBank = () => {
  const [choices, setChoices] = useState([]);
  const [answers, setAnswers] = useState([]);
  // eslint-disable-next-line
  const [userUX, setUserUX] = useState({
    addQuestion: { loading: false, error: false, errorMsg: "" },
  });
  const { bankId } = useParams();
  const { t } = useTranslation();
  const newOptionRef = useRef();
  const questionRef = useRef();
  const authContext = useAuth();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };

  const addChoice = () => {
    if (newOptionRef.current.value.trim().length !== 0) {
      setChoices([...choices, newOptionRef.current.value]);
      newOptionRef.current.value = "";
    }
  };

  const addQuestion = () => {
    if (
      questionRef.current.value.trim().length === 0 ||
      choices.length === 0 ||
      answers.length === 0
    ) {
      setUserUX((prev) => ({
        ...prev,
        addQuestion: {
          loading: false,
          error: true,
          errorMsg: "Empty Question or Choices or No Answers Selected",
        },
      }));
    } else {
      const choicesConverted = {};
      for (let i = 0; i < choices.length; i++) {
        const key = String.fromCharCode(97 + i);
        choicesConverted[key] = choices[i];
      }

      const backendData = {
        bankId: bankId,
        question: questionRef.current.value,
        choices: choicesConverted,
        answer: answers,
        addedBy: authContext.id,
      };

      console.log(backendData);
      setUserUX((prev) => ({
        ...prev,
        addQuestion: { loading: true, error: false, errorMsg: "" },
      }));
      axios
        .post(ADMIN_URL + `/question`, backendData, config)
        .then((res) => {
          console.log(res);
          setUserUX((prev) => ({
            ...prev,
            addQuestion: { loading: false, error: false, errorMsg: "" },
          }));
          deleteQuestion();
        })
        .catch((error) => {
          console.log(error);
          setUserUX((prev) => ({
            ...prev,
            addQuestion: {
              loading: false,
              error: true,
              errorMsg: "Error submitting question",
            },
          }));
        });
    }
  };

  const deleteQuestion = () => {
    setChoices([]);
    questionRef.current.value = "";
  };

  return (
    <FormNavbarContainer>
      <div className={styles.studentBody}>
        <BanksSidebar bankId={bankId} navRoute={"/staff/mcq/add_questions/"} />
        <div className="mcq-cont">
          {bankId === undefined ? (
            <h1 className="text-center alert alert-info m-5" role="alert">
              {t("mcq.selectBank")}
            </h1>
          ) : (
            <div className="new-quest">
              <div className="new-quest-input">
                <input
                  type="text"
                  placeholder={t("mcq.questionHolder")}
                  ref={questionRef}
                />
              </div>
              <div className="new-quest-answers">
                {choices.length !== 0 &&
                  choices.map((item, index) => (
                    <div key={index}>
                      <div className="new-quest-answers-choice">
                        <div>
                          <input
                            type="radio"
                            value={item}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setAnswers([...answers, e.target.value]);
                              } else {
                                setAnswers(answers.filter((el) => el !== item));
                              }
                            }}
                          />

                          <label htmlFor="track">{item}</label>
                        </div>
                        <div>
                          <TiDelete
                            style={{
                              fontSize: "20px",
                              cursor: "pointer",
                              color: "red",
                            }}
                            onClick={(e) => {
                              setChoices(choices.filter((el) => el !== item));
                            }}
                          />
                        </div>
                      </div>
                      <br />
                    </div>
                  ))}
                <div className="input-group mt-1 mb-3 ">
                  <button
                    className="btn btn-outline-secondary  "
                    type="button"
                    onClick={addChoice}
                  >
                    {t("mcq.addOption")}
                  </button>

                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("mcq.writeOption")}
                    ref={newOptionRef}
                  />
                </div>
              </div>
              <div className="new-quest-footer">
                <button onClick={addQuestion}>{t("mcq.addToBank")}</button>
                <BsTrash
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  onClick={deleteQuestion}
                />
              </div>
            </div>
          )}
          {userUX.addQuestion.error && (
            <p className="text-danger">{userUX.addQuestion.errorMsg}</p>
          )}
        </div>
      </div>
    </FormNavbarContainer>
  );
};
