import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { ADMIN_URL } from "../../../../shared/API";
import axios from "axios";
import i18next from "i18next";

// Reusable Components
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { Alert } from "react-bootstrap";
import { SpinnerLoader } from "../../../../components/loaders/SpinnerLoader";

export const StudySchedules = () => {
  const [levels, setLevels] = useState([]);
  const [filteredLevels, setFilteredLevels] = useState([]);
  const [userUX, setUserUX] = useState({
    list: { loading: false, error: false, errorMsg: "" },
    level: { loading: false, error: false, errorMsg: "" },
  });
  const navigate = useNavigate();
  const { t } = useTranslation();
  const authContext = useAuth();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };

  useEffect(() => {
    setUserUX((prev) => ({
      ...prev,
      list: { loading: true, error: false, errorMsg: "" },
    }));
    // GET request to get all levels that have a table created
    axios
      .get(
        ADMIN_URL +
          `/classes_tables/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}`,
        config
      )
      .then((res) => {
        setFilteredLevels(
          authContext.program.levels.filter(
            (level) => !res.data.map((item) => item.level.id).includes(level.id)
          )
        );
        setUserUX((prev) => ({
          ...prev,
          list: { ...prev.list, loading: false },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          list: { loading: true, error: true, errorMsg: t("error.common") },
        }));
      });

    setLevels(authContext.program.levels);
    // eslint-disable-next-line
  }, [authContext.program.id]);

  const handleLevelClick = (event, id) => {
    event.preventDefault();

    if (filteredLevels.map((item) => item.id).includes(id)) {
      setUserUX((prev) => ({
        ...prev,
        level: { loading: true, error: false, errorMsg: "" },
      }));
      const levelTableData = {
        academicSemesterId: "decc46ba-7d4b-11ed-a1eb-0242ac120002",
        programId: authContext.program.id,
        levelId: id,
        classes: [],
      };
      axios
        .post(
          ADMIN_URL +
            `/classes_tables/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}`,
          levelTableData,
          config
        )
        .then((res) => {
          console.log(res);
          setUserUX((prev) => ({
            ...prev,
            level: { ...prev.level, loading: false },
          }));
          navigate(`/admin/study_schedules/tables/${id}`);
        })
        .catch((error) => {
          console.log(error);
          setUserUX((prev) => ({
            ...prev,
            level: {
              loading: false,
              error: true,
              errorMsg: t("error.common"),
            },
          }));
        });
    } else {
      navigate(`/admin/study_schedules/tables/${id}`);
    }
  };

  return (
    <FormNavbarContainer>
      {userUX.list.error ? (
        <Alert variant="danger" className="m-5">
          <Alert.Heading>{t("error.programLevels")}</Alert.Heading>
          <p>{t("error.programLevelsMsg")}</p>
        </Alert>
      ) : (
        <>
          <div className="portal-body">
            <h5 className="portal-title">{t("levels.table")}</h5>
            {userUX.list.loading ? (
              <SpinnerLoader size={"80px"} heigth={"200px"} />
            ) : (
              <div className="portal-list">
                {levels.map((item) => {
                  return (
                    <li
                      key={item.id}
                      onClick={(event) => {
                        handleLevelClick(event, item.id);
                      }}
                    >
                      {i18next.language === "en"
                        ? item.englishName
                        : item.arabicName}
                    </li>
                  );
                })}
              </div>
            )}
          </div>
          {userUX.level.error && (
            <Alert variant="danger" className="m-5">
              <Alert.Heading>{t("error.programLevels")}</Alert.Heading>
              <p>{t("error.programLevelsMsg")}</p>
            </Alert>
          )}
        </>
      )}
    </FormNavbarContainer>
  );
};
