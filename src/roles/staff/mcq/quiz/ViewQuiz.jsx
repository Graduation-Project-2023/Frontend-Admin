import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { ADMIN_URL } from "../../../../shared/API";
import axios from "axios";
import i18next from "i18next";
import { QuizFormData } from "./QuizFormData";

// Components
import { Accordion } from "react-bootstrap";
import { QuestionCard } from "../components/QuestionCard";
import { FormInput } from "../../../../components/forms/FormInput";
import { SpinnerLoader } from "../../../../components/loaders/SpinnerLoader";
import { Alert } from "react-bootstrap";

export const ViewQuiz = (props) => {
  const [quiz, setQuiz] = useState({});
  const [quizOpened, setQuizOpened] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [userUX, setUserUX] = useState({
    mcq: { loading: false, error: false, errorMsg: "" },
    form: { loading: false, error: false },
  });
  const { t } = useTranslation();
  const authContext = useAuth();
  const navigate = useNavigate();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };

  useEffect(() => {
    setQuiz(props.quiz);
  }, [props.quiz]);

  useEffect(() => {
    if (quizOpened) {
      setUserUX((prev) => ({
        ...prev,
        mcq: { loading: true, error: false },
      }));
      // GET request to get all MCQ questions in a specific quiz
      axios
        .get(ADMIN_URL + `/sheet/${quiz.id}`, config)
        .then((res) => {
          console.log(res);
          setFilteredQuestions(res.data.questions);
          setUserUX((prev) => ({
            ...prev,
            mcq: {
              loading: false,
              error: res.data.questions.length === 0 ? true : false,
              errorMsg:
                res.data.questions.length === 0 ? "mcq.noQuestions" : "",
            },
          }));
        })
        .catch((error) => {
          console.log(error);
          setUserUX((prev) => ({
            ...prev,
            mcq: {
              loading: false,
              error: true,
              errorMsg: "common.error",
            },
          }));
        });
    }
    // eslint-disable-next-line
  }, [quizOpened]);

  useEffect(() => {
    setFilteredQuestions(
      quiz?.questions?.filter((item) =>
        item.question?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    // eslint-disable-next-line
  }, [searchValue]);

  const handleQuizEdit = () => {
    navigate(`${quiz.id}`);
  };

  const handleQuizDelete = () => {
    setUserUX((prev) => ({
      ...prev,
      form: { loading: true, error: false },
    }));
    axios
      .delete(ADMIN_URL + `/sheet/${quiz.id}`, config)
      .then((res) => {
        console.log(res);
        window.location.reload();
        setUserUX((prev) => ({
          ...prev,
          form: { loading: false, error: false },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          form: { loading: false, error: true },
        }));
      });
  };

  return (
    <>
      <Accordion.Header
        onClick={() => {
          setQuizOpened(true);
        }}
      >
        {i18next.language === "en" ? quiz?.englishName : quiz?.arabicName}
      </Accordion.Header>
      <Accordion.Body>
        <div>
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ margin: "2rem", gap: "15px" }}
          >
            <button
              className="btn btn-outline-primary"
              style={{ width: "100%" }}
              onClick={handleQuizEdit}
              disabled={userUX.form.loading}
            >
              {t("mcq.editQuiz")}
            </button>

            <button
              className="btn btn-outline-danger"
              style={{ width: "100%" }}
              onClick={handleQuizDelete}
              disabled={userUX.form.loading}
            >
              {userUX.form.loading ? (
                <span className="loader"></span>
              ) : (
                t("mcq.deleteQuiz")
              )}
            </button>
          </div>

          <form>
            {QuizFormData.map((data) => {
              return (
                <FormInput
                  inputData={{ ...data, disabled: true }}
                  handleEditFormChange={() => {}}
                  valueData={quiz}
                  key={data.id}
                />
              );
            })}
          </form>
        </div>
        <div className="mcq-cont">
          {userUX.mcq.loading ? (
            <SpinnerLoader size={"60px"} heigth={"250px"} />
          ) : userUX.mcq.error ? (
            <Alert variant="danger" style={{ margin: "2rem" }}>
              {t(userUX.mcq.errorMsg)}
            </Alert>
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
              {filteredQuestions?.map((item, index) => (
                <QuestionCard
                  key={item.id}
                  question={item}
                  questionNumber={index}
                />
              ))}
            </>
          )}
        </div>
      </Accordion.Body>
    </>
  );
};
