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
import { ModalPopup } from "../../../../components/popups/ModalPopup";
import { BsFillPersonCheckFill } from "react-icons/bs";

export const AddToBank = () => {
  const [choices, setChoices] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [modal, setModal] = useState(false);
  const [questType, setQuestType] = useState("mcq");
  const [userUX, setUserUX] = useState({
    addQuestion: { loading: false, error: false, errorMsg: "" },
  });
  const { bankId } = useParams();
  const { t, i18n } = useTranslation();
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
          errorMsg: "mcq.error",
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
          setModal(true);
          deleteQuestion();
        })
        .catch((error) => {
          console.log(error);
          setUserUX((prev) => ({
            ...prev,
            addQuestion: {
              loading: false,
              error: true,
              errorMsg: "error.common",
            },
          }));
        });
    }
  };

  const deleteQuestion = () => {
    setChoices([]);
    questionRef.current.value = "";
  };

  const handleQuestionType = (e) => {
    setQuestType(e.target.value);
    if (e.target.value === "tof") {
      setChoices(["True", "False"]);
    } else {
      setChoices([]);
    }
    setAnswers([]);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <FormNavbarContainer>
      <div className={styles.studentBody}>
        <BanksSidebar bankId={bankId} navRoute={"/staff/mcq/add_questions/"} />
        <div className="mcq-cont">
          {bankId === undefined ? (
            <h1 className="text-center alert alert-info" role="alert">
              {t("mcq.selectBank")}
            </h1>
          ) : (
            <>
              <div className="new-quest-choose mb-3">
                <label className="form-label">{t("mcq.questType")}</label>
                <select
                  className="form-select"
                  onChange={(e) => {
                    handleQuestionType(e);
                  }}
                  value={questType}
                >
                  <option value="mcq">{t("mcq.mcq")}</option>
                  <option value="tof">{t("mcq.trueOrFalse")}</option>
                </select>
              </div>

              <div
                className="new-quest"
                style={
                  i18n.language === "ar"
                    ? {
                        direction: "rtl",
                        textAlign: "right",
                      }
                    : {}
                }
              >
                <div
                  className="new-quest-input"
                  style={
                    i18n.language === "ar"
                      ? {
                          direction: "rtl",
                          textAlign: "right",
                        }
                      : {}
                  }
                >
                  <input
                    type="text"
                    placeholder={t("mcq.questionHolder")}
                    ref={questionRef}
                  />
                </div>

                <div
                  className="new-quest-answers"
                  style={
                    i18n.language === "ar"
                      ? {
                          direction: "rtl",
                          textAlign: "right",
                        }
                      : {}
                  }
                >
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
                                  setAnswers(
                                    answers.filter((el) => el !== item)
                                  );
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
                  {questType === "mcq" && (
                    <div className="input-group mt-1 mb-3">
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
                  )}
                </div>

                <div
                  className="new-quest-footer"
                  style={
                    i18n.language === "ar"
                      ? { flexDirection: "row-reverse" }
                      : {}
                  }
                >
                  <button
                    onClick={addQuestion}
                    disabled={userUX.addQuestion.loading}
                  >
                    {userUX.addQuestion.loading ? (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                          width: "137px",
                          height: "22.5px",
                        }}
                      >
                        <div
                          className="spinner-border text-light"
                          role="status"
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                        ></div>
                      </div>
                    ) : (
                      t("mcq.addToBank")
                    )}
                  </button>

                  <BsTrash
                    style={{ fontSize: "20px", cursor: "pointer" }}
                    onClick={deleteQuestion}
                  />
                </div>
              </div>
            </>
          )}
          {userUX.addQuestion.error && (
            <p
              className="text-danger"
              style={{
                margin: "10px 5%",
              }}
            >
              {t(userUX.addQuestion.errorMsg)}
            </p>
          )}
        </div>
        {modal && (
          <ModalPopup
            message={{
              state: true,
              icon: <BsFillPersonCheckFill />,
              title: "popup.success",
              text: "popup.message_success",
              button: "common.save",
              handleClick: closeModal,
            }}
            closeModal={closeModal}
          />
        )}
      </div>
    </FormNavbarContainer>
  );
};
