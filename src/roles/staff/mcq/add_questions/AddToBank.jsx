import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ADMIN_URL } from "../../../../shared/API";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios";
import i18next from "i18next";
import styles from "../../../admin/student_data/portal/StudentDataPortal.module.scss";

// Reusable Components
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { NoData } from "../../../../components/UX/NoData";
import { SpinnerLoader } from "../../../../components/loaders/SpinnerLoader";
import { NoSearch } from "../../../../components/UX/NoSearch";
import { BsTrash } from "react-icons/bs";

export const AddToBank = () => {
  const [banks, setBanks] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [bankSearchValue, setBankSearchValue] = useState("");
  const [choices, setChoices] = useState([]);
  const [answers, setAnswers] = useState([]);
  // eslint-disable-next-line
  const [selectBank, setSelectBank] = useState(false);
  const [userUX, setUserUX] = useState({
    banks: { loading: false, error: false, errorMsg: "" },
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

  useEffect(() => {
    setUserUX((prev) => ({
      ...prev,
      banks: { loading: true, error: false, errorMsg: "" },
    }));
    // GET request to get all MCQ banks to view it in the sidebar
    axios
      .get(ADMIN_URL + `/bank`, config)
      .then((res) => {
        console.log(res);
        setBanks(res.data);
        setFilteredBanks(res.data);
        setUserUX((prev) => ({
          ...prev,
          banks: {
            loading: false,
            error: res.data.length === 0 ? true : false,
            errorMsg: res.data.length === 0 ? "No banks are found." : "",
          },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          banks: {
            loading: false,
            error: true,
            errorMsg: "Error fetching banks...",
          },
        }));
      });

    // eslint-disable-next-line
  }, [bankId]);

  useEffect(() => {
    setFilteredBanks(
      banks.filter(
        (item) =>
          item.arabicName
            ?.toLowerCase()
            .includes(bankSearchValue.toLowerCase()) ||
          item.englishName
            ?.toLowerCase()
            .includes(bankSearchValue.toLowerCase())
      )
    );
    // eslint-disable-next-line
  }, [bankSearchValue]);

  const addChoice = () => {
    if (newOptionRef.current.value !== "") {
      setChoices([...choices, newOptionRef.current.value]);
      newOptionRef.current.value = "";
    }
  };

  const addQuestion = () => {
    if (questionRef === "" || choices.length === 0 || answers.length === 0) {
      console.log("wrong");
    } else {
      const choicesConverted = {};
      for (let i = 0; i < choices.length; i++) {
        const key = String.fromCharCode(97 + i);
        choicesConverted[key] = choices[i];
      }

      setUserUX((prev) => ({
        ...prev,
        addQuestion: { loading: true, error: false, errorMsg: "" },
      }));
      axios
        .post(
          ADMIN_URL + `/question`,
          {
            bankId: bankId,
            question: questionRef.current.value,
            choices: choicesConverted,
            answer: answers,
            addedBy: authContext.user.id,
          },
          config
        )
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
        <div className={styles.studentBody_students}>
          <h3>{t(`mcq.banks`)}</h3>
          <div className={styles.studentBody_students_search}>
            <input
              type="text"
              placeholder={t("mcq.bankSearch")}
              value={bankSearchValue}
              onChange={(e) => {
                setBankSearchValue(e.target.value);
              }}
            />
          </div>
          {filteredBanks.length === 0 ? (
            userUX.banks.loading ? (
              <SpinnerLoader size={"60px"} heigth={"250px"} />
            ) : userUX.banks.error ? (
              userUX.banks.errorMsg
            ) : banks.length === 0 ? (
              <NoData />
            ) : (
              <NoSearch />
            )
          ) : (
            <div className={styles.studentBody_students_list}>
              {filteredBanks.map((item) => (
                <li key={item.id}>
                  <Link to={`/staff/mcq/add_questions/${item.id}`}>
                    {i18next.language === "en"
                      ? item.englishName
                      : item.arabicName}
                  </Link>
                </li>
              ))}
            </div>
          )}
        </div>
        <div className="mcq-cont">
          {bankId === undefined ? (
            <h2>Please select a bank from the sidebar..</h2>
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
                      <input
                        type="checkbox"
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
                      <br />
                    </div>
                  ))}
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("mcq.writeOption")}
                    ref={newOptionRef}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={addChoice}
                    >
                      {t("mcq.addOption")}
                    </button>
                  </div>
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
        </div>
        <button
          onClick={() => {
            console.log(choices);
          }}
        >
          log
        </button>
      </div>
    </FormNavbarContainer>
  );
};
