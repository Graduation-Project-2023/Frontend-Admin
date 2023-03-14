import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks/useAuth";
import { ADMIN_URL } from "../../../shared/API";
import axios from "axios";
import { Sidebar } from "../../../components/sidebar/Sidebar";

export const ProfessorsSidebar = () => {
  const [professors, setProfessors] = useState([]);
  const [userUX, setUserUX] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });
  const { t } = useTranslation();
  const authContext = useAuth();
  const location = useLocation();
  const showOptions =
    location.pathname.split("/").pop() !== "add" &&
    location.pathname.split("/").pop() !== "control_system";
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };
  useEffect(() => {
    setUserUX((prev) => ({ ...prev, loading: true }));
    // GET request to get all college professors to display it in the sidebar
    axios
      .get(
        ADMIN_URL + `/professor?college_id=${authContext.college.id}`,
        config
      )
      .then((res) => {
        setProfessors(res.data);
        setUserUX((prev) => ({ ...prev, loading: false }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX({ loading: false, error: true, errorMsg: "erirrr" });
      });

    // eslint-disable-next-line
  }, [authContext.college.id]);

  return (
    <Sidebar
      options={
        showOptions && (
          <Link to={"/admin/control_system/add"}>
            <button className="coursesSidebarBtn">{t("professor.add")}</button>
          </Link>
        )
      }
      sideData={professors.map((obj) => ({ ...obj, path: obj.id }))}
      sidebarTitle={"professor.employees"}
      searchable={true}
      inputPlaceholder={"professor.search"}
      backendData={true}
      activeNav={true}
      userUX={userUX}
    />
  );
};
