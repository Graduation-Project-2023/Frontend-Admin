import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../../../shared/API";
import { useAuth } from "../../../../hooks/useAuth";
import { useState, useEffect } from "react";
import axios from "axios";
import cookies from "js-cookie";

export const StudySchedules = () => {
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get("i18next") || "en";
  const navigate = useNavigate();
  const authContext = useAuth();
  const [levels, setLevels] = useState([]);
  useEffect(() => {
    axios
      .get(BASE_URL + `/programs/${authContext.program.id}/levels`)
      .then((res) => {
        setLevels(res.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <FormNavbarContainer>
      <div className="portal-body">
        <h5 className="portal-title">{t("levels.table")}</h5>
        <div className="portal-list">
          {levels.map((item) => {
            return (
              <li
                key={item.id}
                onClick={() => {
                  navigate(item.id);
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
