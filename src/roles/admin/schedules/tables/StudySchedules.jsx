import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../../../shared/API";
import { useAuth } from "../../../../hooks/useAuth";
import { useState, useEffect } from "react";
import axios from "axios";
import cookies from "js-cookie";

export const StudySchedules = () => {
  const [levels, setLevels] = useState([]);
  const [filteredLevels, setFilteredLevels] = useState([]);
  const [userUX, setUserUX] = useState({
    levelClick: false,
    levelError: false,
    levelErrorMsg: "",
    listLoading: false,
    listError: false,
    listErrorMsg: "",
  });
  const navigate = useNavigate();
  const { t } = useTranslation();
  const authContext = useAuth();
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    setUserUX((prev) => ({
      ...prev,
      listLoading: true,
      listError: false,
      listErrorMsg: "",
    }));
    // GET request to get all levels that have a table created
    axios
      .get(
        BASE_URL +
          `/classes_tables/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}`
      )
      .then((res) => {
        setFilteredLevels(
          authContext.program.levels.filter(
            (level) => !res.data.map((item) => item.level.id).includes(level.id)
          )
        );
        setUserUX((prev) => ({
          ...prev,
          listLoading: false,
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          listLoading: false,
          listError: true,
          listErrorMsg: "level tables error",
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
        levelClick: true,
        levelError: false,
        levelErrorMsg: "",
      }));
      const levelTableData = {
        academicSemesterId: "decc46ba-7d4b-11ed-a1eb-0242ac120002",
        programId: authContext.program.id,
        levelId: id,
        classes: [],
      };
      axios
        .post(
          BASE_URL +
            `/classes_tables/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}`,
          levelTableData
        )
        .then((res) => {
          console.log(res);
          setUserUX((prev) => ({
            ...prev,
            levelClick: false,
            levelError: false,
            levelErrorMsg: "",
          }));
          navigate(`/admin_portal/study_schedules/tables/${id}`);
        })
        .catch((error) => {
          console.log(error);
          setUserUX((prev) => ({
            ...prev,
            levelClick: false,
            levelError: true,
            levelErrorMsg: "level table error",
          }));
        });
    } else {
      navigate(`/admin_portal/study_schedules/tables/${id}`);
    }
  };

  return (
    <FormNavbarContainer>
      <div className="portal-body">
        <h5 className="portal-title">{t("levels.table")}</h5>
        <div className="portal-list">
          {!userUX.listLoading &&
            levels.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={(event) => {
                    handleLevelClick(event, item.id);
                  }}
                >
                  {currentLanguageCode === "en"
                    ? item.englishName
                    : item.arabicName}
                </li>
              );
            })}
        </div>
      </div>
    </FormNavbarContainer>
  );
};
