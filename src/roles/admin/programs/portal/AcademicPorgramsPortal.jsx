import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { BASE_URL } from "../../../../shared/API";
import cookies from "js-cookie";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";

export const AcademicPorgramsPortal = () => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState();
  const authContext = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    if (authContext.college === undefined) {
      navigate("/admin_portal");
    } else {
      // Get request to get all programs to display it in the menu
      axios
        .get(BASE_URL + `/programs?college_id=${authContext.college.id}`)
        .then((res) => {
          setPrograms(res.data);
          setFilteredPrograms(res.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
          console.log(error);
        });
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFilteredPrograms(
      programs.filter(
        (item) =>
          item.englishName.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.arabicName.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    // eslint-disable-next-line
  }, [searchValue]);

  return (
    <div className="container">
      <div className="portal-body">
        <h5 className="portal-title">{t("portal.programs")}</h5>
        <div className="portal-search">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder={t("portal.search")}
          />
        </div>
        <div className="portal-fixed">
          <li
            onClick={() => {
              navigate("add");
            }}
          >
            {t("portal.add")}
            <FaPlusCircle style={{ margin: "10px" }} />
          </li>
          <div className="portal-list">
            {filteredPrograms.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => {
                    console.log(item);
                    authContext.changeProgram(item);
                    navigate(`${item.id}/main`);
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
      </div>
    </div>
  );
};
