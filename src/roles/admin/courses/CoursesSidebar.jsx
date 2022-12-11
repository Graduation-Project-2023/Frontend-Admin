import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks/useAuth";
import { BASE_URL } from "../../../shared/API";
import axios from "axios";
import { Sidebar } from "../../../components/sidebar/Sidebar";

export const CoursesSidebar = () => {
  const [courses, setCourses] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState();
  const { t } = useTranslation();
  const authContext = useAuth();
  const location = useLocation();

  useEffect(() => {
    // GET request to get all college courses to display it in the sidebar
    axios
      .get(BASE_URL + `/courses?college_id=${authContext.college.id}`)
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });

    // eslint-disable-next-line
  }, [authContext.college.id]);

  return (
    <Sidebar
      options={
        location.pathname.split("/").pop() !== "courses" && (
          <Link to={"/admin_portal/courses"}>
            <button className="coursesSidebarBtn">{t("portal.add")}</button>
          </Link>
        )
      }
      sideData={courses.map((obj) => ({ ...obj, path: obj.id }))}
      sidebarTitle={"courses.formhead"}
      searchable={true}
      backendData={true}
      activeNav={true}
    />
  );
};