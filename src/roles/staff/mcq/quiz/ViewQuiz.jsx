import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { ADMIN_URL } from "../../../../shared/API";
import axios from "axios";

// Components
import { Accordion } from "react-bootstrap";
import { QuestionCard } from "../components/QuestionCard";

export const ViewQuiz = (props) => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [userUX, setUserUX] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });
  const { t } = useTranslation();
  const { quizId } = props;
  const authContext = useAuth();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };

  useEffect(() => {
    setUserUX({ loading: true, error: false, errorMsg: "" });
    // GET request to get all MCQ questions in a specific quiz
    axios
      .get(ADMIN_URL + `/sheet/${quizId}`, config)
      .then((res) => {
        console.log(res);
        setQuestions(res.data);
        setFilteredQuestions(res.data);
        setUserUX({
          loading: false,
          error: res.data.length === 0 ? true : false,
          errorMsg: res.data.length === 0 ? "The quiz is empty." : "",
        });
      })
      .catch((error) => {
        console.log(error);
        setUserUX({
          loading: false,
          error: true,
          errorMsg: "Error fetching quiz questions...",
        });
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFilteredQuestions(
      questions.filter((item) =>
        item.question?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    // eslint-disable-next-line
  }, [searchValue]);

  return (
    <Accordion.Body>
      <div className="mcq-cont">
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
          <QuestionCard key={item.id} question={item} questionNumber={index} />
        ))}
      </div>
    </Accordion.Body>
  );
};
