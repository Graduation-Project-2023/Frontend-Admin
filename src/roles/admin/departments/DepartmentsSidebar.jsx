import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks/useAuth";
import { ADMIN_URL } from "../../../shared/API";
import axios from "axios";
import { Sidebar } from "../../../components/sidebar/Sidebar";

export const DepartmentsSidebar = () => {
  const [departments, setDepartments] = useState([]);
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
    location.pathname.split("/").pop() !== "departments";

  useEffect(() => {
    setUserUX((prev) => ({ ...prev, loading: true }));
    // GET request to get all college departments to display it in the sidebar
    axios
      .get(ADMIN_URL + `/departments?college_id=${authContext.college.id}`)
      .then((res) => {
        setDepartments(res.data);
        setUserUX((prev) => ({ ...prev, loading: false }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX({ loading: false, error: true, errorMsg: "error" });
      });

    // eslint-disable-next-line
  }, [authContext.college.id]);

  return (
    <Sidebar
      options={
        showOptions && (
          <Link to={"/admin/departments/add"}>
            <button className="coursesSidebarBtn">
              {t("departments.add")}
            </button>
          </Link>
        )
      }
      sideData={departments.map((obj) => ({ ...obj, path: obj.id }))}
      sidebarTitle={"departments.sidebar"}
      searchable={true}
      inputPlaceholder={"departments.name"}
      backendData={true}
      activeNav={true}
      userUX={userUX}
    />
  );
};
