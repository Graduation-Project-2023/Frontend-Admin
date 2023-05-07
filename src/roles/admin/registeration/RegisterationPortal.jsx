import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks/useAuth";
import { ADMIN_URL } from "../../../shared/API";
import axios from "axios";

// Reusable Components
import { Accordion } from "react-bootstrap";
import { RegisterationAccordion } from "./RegisterationAccordion";
import { NoData } from "../../../components/UX/NoData";

// TO DELETE AFTER TESTING
import { STUDENTS } from "./TestingStudents";

export const RegisterationPortal = () => {
  const [students, setStudents] = useState([]);
  const [levels, setLevels] = useState([]);
  const [userUX, setUserUX] = useState({
    students: { loading: false, error: false, errorMsg: "" },
    levels: { loading: false, error: false, errorMsg: "" },
  });
  const { t } = useTranslation();
  const authContext = useAuth();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };

  useEffect(() => {
    setUserUX((prev) => ({
      ...prev,
      levels: { ...prev.levels, loading: true },
    }));
    // GET request to get levels by program id
    axios
      .get(ADMIN_URL + `/programs/${authContext.program.id}/levels`, config)
      .then((res) => {
        console.log(res);
        setLevels(res.data);
        setUserUX((prev) => ({
          ...prev,
          levels: { ...prev.levels, loading: false },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          levels: {
            loading: false,
            error: true,
            errorMsg: "error getting levels",
          },
        }));
      });
    // eslint-disable-next-line
  }, [authContext.program.id, authContext.college.id]);

  useEffect(() => {
    setUserUX((prev) => ({
      ...prev,
      students: { ...prev.students, loading: true },
    }));
    // GET request to get students by program id
    axios
      .get(ADMIN_URL + `/student/program/${authContext.program.id}`, config)
      .then((res) => {
        console.log(res);
        setStudents(STUDENTS);
        setUserUX((prev) => ({
          ...prev,
          students: { ...prev.students, loading: false },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          students: {
            loading: false,
            error: true,
            errorMsg: "error getting students",
          },
        }));
      });
    // eslint-disable-next-line
  }, [authContext.program.id, authContext.college.id]);

  return (
    <div className="container">
      <div className="registerationContainer">
        <h1>{t(`registeration.formhead`)}</h1>
        <div className="collapseSectionCard">
          <Accordion
            defaultActiveKey={["0"]}
            alwaysOpen
            className="collapseSection"
          >
            {levels.length > 0 &&
            !userUX.levels.error &&
            !userUX.students.error ? (
              levels.map((level) => {
                return (
                  <RegisterationAccordion
                    students={students.filter(
                      (stud) => stud.levelId === level.id
                    )}
                    level={level}
                    key={level.id}
                  />
                );
              })
            ) : (
              <NoData />
            )}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
