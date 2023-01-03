import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks/useAuth";
import { ADMIN_URL } from "../../../shared/API";
import axios from "axios";
import { Sidebar } from "../../../components/sidebar/Sidebar";

export const CoursesSidebar = () => {
  const [courses, setCourses] = useState([]);
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
    location.pathname.split("/").pop() !== "courses";

  useEffect(() => {
    setUserUX((prev) => ({ ...prev, loading: true }));
    // GET request to get all college courses to display it in the sidebar
    axios
      .get(ADMIN_URL + `/courses?college_id=${authContext.college.id}`)
      .then((res) => {
        setCourses(res.data);
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
          <Link to={"/portal/admin/courses/add"}>
            <button className="coursesSidebarBtn">{t("courses.add")}</button>
          </Link>
        )
      }
      sideData={courses.map((obj) => ({ ...obj, path: obj.id }))}
      sidebarTitle={"courses.sidebar"}
      searchable={true}
      inputPlaceholder={"courses.name"}
      backendData={true}
      activeNav={true}
      userUX={userUX}
    />
  );
};
