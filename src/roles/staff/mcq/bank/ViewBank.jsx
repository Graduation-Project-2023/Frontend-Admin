import { useEffect, useState } from "react";
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
import { QuestionCard } from "../components/QuestionCard";

export const ViewBank = () => {
  const [banks, setBanks] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [bankSearchValue, setBankSearchValue] = useState("");
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [userUX, setUserUX] = useState({
    questions: { loading: false, error: false, errorMsg: "" },
    banks: { loading: false, error: false, errorMsg: "" },
  });
  const { bankId } = useParams();
  const { t } = useTranslation();
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
                  <Link to={`/staff/mcq/bank/${item.id}`}>
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
            <>
              {" "}
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
