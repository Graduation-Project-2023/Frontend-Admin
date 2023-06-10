import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ADMIN_URL } from "../../../../shared/API";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios";
import styles from "../../../admin/student_data/portal/StudentDataPortal.module.scss";

// Reusable Components
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { FormInput } from "../../../../components/forms/FormInput";
import { ModalPopup } from "../../../../components/popups/ModalPopup";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { QuizFormData } from "./QuizFormData";
import { QuestionCard } from "../components/QuestionCard";
import { SpinnerLoader } from "../../../../components/loaders/SpinnerLoader";
import { Alert } from "react-bootstrap";
import { QuizzesSidebar } from "../components/QuizzesSidebar";
import { Accordion } from "react-bootstrap";

export const CreateQuiz = () => {
  const [modal, setModal] = useState(false);
  const [quizInfo, setQuizInfo] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [updates, setUpdates] = useState({ data: false, questions: false });
  const [searchValue, setSearchValue] = useState("");
  const [userUX, setUserUX] = useState({
    info: { loading: false, error: false, errorMsg: "" },
    form: { loading: false, delete: false, error: false },
    mcq: { loading: false, error: false, errorMsg: "" },
  });
  const { quizId, bankId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
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
    if (quizId !== "add" && quizId !== undefined) {
      setUserUX((prev) => ({
        ...prev,
        info: { loading: true, error: false, errorMsg: "" },
      }));
      // GET request to get quiz info
      axios
        .get(ADMIN_URL + `/sheet/${quizId}`, config)
        .then((res) => {
          console.log(res);
          setQuizInfo(res.data);
          setSelectedQuestions(res.data.questions.map((item) => item.id));
          setUserUX((prev) => ({
            ...prev,
            info: { loading: false, error: false, errorMsg: "" },
          }));
        })
        .catch((error) => {
          console.log(error);
          setUserUX((prev) => ({
            ...prev,
            info: {
              loading: true,
              error: true,
              errorMsg: "Error fetching quiz info...",
            },
          }));
        });
    } else {
      setQuizInfo({});
    }
    // eslint-disable-next-line
  }, [quizId, bankId]);

  const handleEditFormChange = (event) => {
    event.preventDefault();
    if (quizId !== "add" && quizId !== undefined) {
      setUpdates((prev) => ({ ...prev, data: true }));
    }
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    if (event.target.type === "number") {
      fieldValue = parseInt(fieldValue);
    }
    const newQuizData = { ...quizInfo };
    newQuizData[fieldName] = fieldValue;
    setQuizInfo(newQuizData);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUserUX((prev) => ({
      ...prev,
      form: {
        loading: true,
        delete: false,
        error: false,
      },
    }));
    const newQuizInfo = {
      ...quizInfo,
      questions: selectedQuestions,
    };
    console.log(newQuizInfo);
    // Condition to check whether it's adding a new quiz or updating the current
    if (quizId !== "add" && quizId !== undefined) {
      // PUT request to update the current quiz
      if (updates.data) {
        axios
          .put(ADMIN_URL + `/sheet/${quizId}`, newQuizInfo, config)
          .then((res) => {
            setQuizInfo(res.data);
            if (!updates.questions) {
              setModal(true);
              setUserUX((prev) => ({
                ...prev,
                form: {
                  loading: false,
                  delete: false,
                  error: false,
                },
              }));
            }
          })
          .catch((error) => {
            console.log(error);
            setUserUX((prev) => ({
              ...prev,
              form: {
                loading: false,
                delete: false,
                error: true,
              },
            }));
          });
      }
      if (updates.questions && !userUX.form.error) {
        axios
          .put(
            ADMIN_URL + `/sheet/add`,
            { questionId: selectedQuestions, sheetId: quizId },
            config
          )
          .then((res) => {
            setQuizInfo(res.data);
            setModal(true);
            setUserUX((prev) => ({
              ...prev,
              form: {
                loading: false,
                delete: false,
                error: false,
              },
            }));
          })
          .catch((error) => {
            console.log(error);
            setUserUX((prev) => ({
              ...prev,
              form: {
                loading: false,
                delete: false,
                error: true,
              },
            }));
          });
      }
    } else {
      // POST request to create a new quiz
      axios
        .post(ADMIN_URL + `/sheet`, newQuizInfo, config)
        .then((res) => {
          console.log(res);
          axios
            .post(
              ADMIN_URL + `/sheet/add`,
              { questionId: selectedQuestions, sheetId: res.data.id },
              config
            )
            .then((res) => {
              console.log(res);
              setModal(true);
              setUserUX((prev) => ({
                ...prev,
                form: {
                  loading: false,
                  delete: false,
                  error: false,
                },
              }));
            })
            .catch((error) => {
              console.log(error);
              setUserUX((prev) => ({
                ...prev,
                form: {
                  loading: false,
                  delete: false,
                  error: true,
                },
              }));
            });
        })
        .catch((error) => {
          console.log(error);
          setUserUX((prev) => ({
            ...prev,
            form: {
              loading: false,
              delete: false,
              error: true,
            },
          }));
        });
    }
  };

  useEffect(() => {
    setFilteredQuestions(
      questions.filter((item) =>
        item.question?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    // eslint-disable-next-line
  }, [searchValue]);

  const handleQuizDelete = (e) => {
    e.preventDefault();
    // DELETE request to delete the current MCQ bank
    setUserUX((prev) => ({
      ...prev,
      form: {
        ...prev.form,
        delete: true,
        error: false,
      },
    }));
    axios
      .delete(ADMIN_URL + `/bank/${quizInfo.id}`, config)
      .then((res) => {
        console.log(res);
        setModal(true);
        setUserUX((prev) => ({
          ...prev,
          form: {
            ...prev.form,
            delete: false,
          },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          form: {
            ...prev.form,
            delete: false,
            error: true,
          },
        }));
      });
  };

  const closeModal = () => {
    navigate(`/staff/mcq/quiz/${bankId}`);
    setModal(false);
  };

  return (
    <FormNavbarContainer>
      <div className={styles.studentBody}>
        <QuizzesSidebar
          bankId={bankId}
          navRoute={`/staff/mcq/quiz/${bankId}/`}
        />
        <div className="mcq-cont">
          <div className="mcq-cont-header">
            {quizId === undefined || quizId === "add"
              ? t("mcq.addQuiz")
              : t("mcq.editQuiz")}
          </div>
          <form
            onSubmit={(event) => {
              handleFormSubmit(event);
            }}
          >
            {(userUX.form.error || userUX.info.error) && (
              <div className="alert alert-danger" role="alert">
                {t("error.common")}
              </div>
            )}
            {QuizFormData.map((data) => (
              <FormInput
                inputData={data}
                handleEditFormChange={handleEditFormChange}
                valueData={quizInfo}
                key={data.id}
                loading={userUX.info.loading}
              />
            ))}

            <div className="mcq-cont">
              {userUX.mcq.loading ? (
                <SpinnerLoader size={"60px"} heigth={"250px"} />
              ) : userUX.mcq.error ? (
                <Alert variant="danger" style={{ margin: "2rem" }}>
                  {t(userUX.mcq.errorMsg)}
                </Alert>
              ) : (
                <Accordion
                  defaultActiveKey="0"
                  alwaysOpen
                  className="collapseSection"
                >
                  <Accordion.Item>
                    <Accordion.Header>
                      {t("mcq.quizQuestions")}
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="mcq-cont-search">
                        <input
                          type="text"
                          placeholder={t("mcq.questionSearch")}
                          value={searchValue}
                          className="form-control mb-4"
                          onChange={(e) => {
                            setSearchValue(e.target.value);
                          }}
                        />
                      </div>
                      <div style={{ maxHeight: "1000px", overflow: "scroll" }}>
                        {filteredQuestions?.map((item, index) => (
                          <QuestionCard
                            key={item.id}
                            question={item}
                            questionNumber={index}
                            quizSelection={true}
                            questionSelected={selectedQuestions.includes(
                              item.id
                            )}
                            handleQuestionSelection={() => {
                              if (selectedQuestions.includes(item.id)) {
                                setSelectedQuestions((prev) =>
                                  prev.filter((id) => id !== item.id)
                                );
                                setUpdates((prev) => ({
                                  ...prev,
                                  questions: true,
                                }));
                              } else {
                                setSelectedQuestions((prev) => [
                                  ...prev,
                                  item.id,
                                ]);
                                setUpdates((prev) => ({
                                  ...prev,
                                  questions: true,
                                }));
                              }
                            }}
                          />
                        ))}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              )}
            </div>
            <button
              type="submit"
              className="form-card-button form-card-button-save"
            >
              {userUX.form.loading ? (
                <span className="loader"></span>
              ) : quizId !== "add" && quizId !== undefined ? (
                t(`common.save`)
              ) : (
                t(`common.add`)
              )}
            </button>

            {quizId !== "add" && quizId !== undefined && (
              <button
                className="form-card-button form-card-button-delete"
                onClick={handleQuizDelete}
                disabled={userUX.form.loading || userUX.form.delete}
              >
                {userUX.form.delete ? (
                  <span className="loader"></span>
                ) : (
                  t(`common.delete`)
                )}
              </button>
            )}
          </form>
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
