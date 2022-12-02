import { Link } from "react-router-dom";
import { Sidebar } from "../../../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../shared/API";
import { useAuth } from "../../../hooks/useAuth";
import cookies from "js-cookie";
import { Dropdown } from "react-bootstrap";

const ProgramsSidebarData = [
  {
    id: "1",
    title: "academicSidebar.main",
    path: "main",
  },
  {
    id: "2",
    title: "academicSidebar.level",
    path: "levels",
  },
  {
    id: "3",
    title: "academicSidebar.grades",
    path: "grades",
  },
  {
    id: "4",
    title: "academicSidebar.levelHours",
    path: "level-hours",
  },
  {
    id: "5",
    title: "academicSidebar.gpaHours",
    path: "gpa-hours",
  },
  {
    id: "6",
    title: "academicSidebar.courses",
    path: "courses",
  },
  {
    id: "7",
    title: "academicSidebar.gpa",
    path: "gpa",
  },
  {
    id: "8",
    title: "academicSidebar.control",
    path: "control",
  },
  {
    id: "9",
    title: "academicSidebar.graduation",
    path: "graduation",
  },
];

export const ProgramsSidebar = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const authContext = useAuth();
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    axios
      .get(BASE_URL + `/programs?college_id=${authContext.college.id}`)
      .then((res) => {
        setPrograms(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        console.log(error);
      });
  }, []);

  return (
    <Sidebar
      activeNav={true}
      backendData={false}
      sideData={ProgramsSidebarData}
      sidebarTitle={"portal.programs"}
      options={
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Select Program
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {programs.map((item) => {
              return (
                <Link
                  to={`/admin_portal/academic_programs/${item.id}/main`}
                  key={item.id}
                >
                  {currentLanguageCode === "en"
                    ? item.englishName
                    : item.arabicName}
                </Link>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      }
    />
  );
};
