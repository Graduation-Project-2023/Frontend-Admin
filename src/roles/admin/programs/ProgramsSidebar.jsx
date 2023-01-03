import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import { ADMIN_URL } from "../../../shared/API";
import i18next from "i18next";
import axios from "axios";
import { ProgramsSidebarData } from "./ProgramsSidebarData";

import { Sidebar } from "../../../components/sidebar/Sidebar";
import { Dropdown } from "react-bootstrap";

export const ProgramsSidebar = () => {
  const [programs, setPrograms] = useState([]);
  const [userUX, setUserUX] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });
  const authContext = useAuth();

  useEffect(() => {
    setUserUX({ loading: true, error: false, errorMsg: "" });
    axios
      .get(ADMIN_URL + `/programs?college_id=${authContext.college.id}`)
      .then((res) => {
        setPrograms(res.data);
        setUserUX((prev) => ({ ...prev, loading: false }));
      })
      .catch((error) => {
        setUserUX({ loading: false, error: true, errorMsg: "errrr" });
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <Sidebar
      activeNav={true}
      backendData={false}
      sideData={
        authContext.program.system === "CREDIT"
          ? authContext.program.allowedHrs === "CUMULATIVE" ||
            authContext.program.allowedHrs === "INCLUDESUMMER"
            ? ProgramsSidebarData
            : ProgramsSidebarData.filter(
                (object) => object.path !== "gpa-hours"
              )
          : ProgramsSidebarData.filter(
              (object) =>
                object.path !== "gpa-hours" && object.path !== "level-hours"
            )
      }
      sidebarTitle={"portal.programs"}
      options={
        <Dropdown className="sidebarBtn">
          <Dropdown.Toggle>
            {i18next.language === "en"
              ? authContext.program.englishName
              : authContext.program.arabicName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {userUX.loading && <Dropdown.Item>Loading...</Dropdown.Item>}
            {programs.map((item) => {
              if (authContext.program.id === item.id) {
                return null;
              }
              return (
                <Link
                  to={`/portal/admin/academic_programs/${item.id}/main`}
                  onClick={() => {
                    authContext.changeProgram(item);
                  }}
                  key={item.id}
                >
                  {i18next.language === "en"
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
