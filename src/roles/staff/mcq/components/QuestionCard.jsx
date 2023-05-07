import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const QuestionCard = (props) => {
  const question = props.question;
  const [answers, setAnswers] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    let answers = [];

    for (let i = 0; i < question.answer.length; i++) {
      let answerValue = question.answer[i];
      for (let key in question.choices) {
        if (question.choices[key] === answerValue) {
          answers.push(key);
          break;
        }
      }
    }

    setAnswers(answers);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="quest-card">
      <span className="quest-ans">
        {t("mcq.answer")}: {answers.join(", ")}
      </span>
      <span className="quest-num">{props.questionNumber + 1}</span>
      <h4>{question.question}</h4>
      <ul>
        {Object.entries(question.choices).map((item, index) => {
          return (
            <li key={index}>
              {item[0]}
              {"- "}
              {item[1]}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
