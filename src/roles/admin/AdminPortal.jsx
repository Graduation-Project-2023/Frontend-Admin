import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { BASE_URL } from "../../shared/API";
import axios from "axios";
import cookies from "js-cookie";
import { Popup } from "../../components/popups/Popup";

export const AdminPortal = () => {
  const { t } = useTranslation();
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState();
  const authContext = useAuth();
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    setLoading(true);
    axios
      .get(BASE_URL + "/colleges")
      .then((res) => {
        setColleges(res.data);
        setFilteredColleges(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentLanguageCode === "en") {
      setFilteredColleges(
        colleges.filter((item) =>
          item.englishName.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      setFilteredColleges(
        colleges.filter((item) =>
          item.arabicName.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
    // eslint-disable-next-line
  }, [searchValue]);

  return (
    <Popup
      button={"اظهار قائمة الكليات"}
      className={"btn"}
      title={"academicMain.faculty"}
      searchItem={true}
    >
      <div className="popup_list">
        {filteredColleges.map((item) => {
          return (
            <Link
              key={item.id}
              onClick={() => {
                authContext.changeCollege(item);
              }}
              to="academic_programs"
            >
              {currentLanguageCode === "en"
                ? item.englishName
                : item.arabicName}
            </Link>
          );
        })}
      </div>
    </Popup>
  );
};
