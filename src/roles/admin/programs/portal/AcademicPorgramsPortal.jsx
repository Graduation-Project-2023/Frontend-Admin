import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { BASE_URL } from "../../../../shared/API";
import axios from "axios";

// Reusable Components
import { SearchContainer } from "../../../../components/other/SearchContainer";
import { FaPlusCircle } from "react-icons/fa";

export const AcademicPorgramsPortal = () => {
  const [programs, setPrograms] = useState([]);
  const [userUX, setUserUX] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });
  const authContext = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext.college === undefined) {
      navigate("/admin_portal");
    } else {
      setUserUX((prev) => ({ ...prev, loading: true }));
      // Get request to get all programs to display it in the menu
      axios
        .get(BASE_URL + `/programs?college_id=${authContext.college.id}`)
        .then((res) => {
          setUserUX((prev) => ({ ...prev, loading: false }));
          setPrograms(res.data);
        })
        .catch((error) => {
          setUserUX({
            loading: false,
            error: true,
            errorMsg: "thgere is an error",
          });
          console.log(error);
        });
    }
    // eslint-disable-next-line
  }, []);

  const handleProgramSelect = (event, item) => {
    event.preventDefault();
    authContext.changeProgram(item);
    navigate(`${item.id}/main`);
  };

  return (
    <div className="container">
      <SearchContainer
        title={"portal.programs"}
        inputPlaceholder={"portal.search"}
        emptyPlaceholder={"la yoogd programs"}
        listData={programs}
        handleListClick={handleProgramSelect}
        userUX={userUX}
        fixedFirstList={{
          state: true,
          children: (
            <li
              onClick={() => {
                navigate("add");
              }}
            >
              {t("portal.add")}
              <FaPlusCircle style={{ margin: "10px" }} />
            </li>
          ),
        }}
      />
    </div>
  );
};
