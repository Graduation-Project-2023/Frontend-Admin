import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios";
import { ADMIN_URL } from "../../../../shared/API";

// Reusable Components
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { CoursesRegisteration } from "./CoursesRegisteration";
import { CourseRegister } from "./CourseRegister";
import { NoData } from "../../../../components/UX/NoData";

export const CoursesRegPortal = () => {
  const [courses, setCourses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [userUX, setUserUX] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });
  const authContext = useAuth();
  const { courseId } = useParams();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };

  useEffect(() => {
    setUserUX((prev) => ({ ...prev, loading: true }));
    // Get request to get all program courses to display it in the menu
    axios
      .get(
        ADMIN_URL + `/programs/${authContext.program.id}/program_courses`,
        config
      )
      .then((res) => {
        setCourses(res.data);
        setUserUX((prev) => ({ ...prev, loading: false }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX({
          loading: false,
          error: true,
          errorMsg: "there is an error getting prog courses",
        });
      });

    // Get request to get all program professors to display it in the menu
    axios
      .get(ADMIN_URL + `/professor/all/${authContext.college.id}`, config)
      .then((res) => {
        setProfessors(res.data);
        setUserUX((prev) => ({ ...prev, loading: false }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX({
          loading: false,
          error: true,
          errorMsg: "error.common",
        });
      });

    setLevels(authContext.program.levels);
    // eslint-disable-next-line
  }, [authContext.program.id, authContext.college.id]);

  return (
    <FormNavbarContainer>
      {levels?.length === 0 && <NoData />}
      {courseId === undefined ? (
        <CoursesRegisteration
          programCourses={courses}
          levels={levels}
          userUX={userUX}
        />
      ) : (
        <CourseRegister
          programCourses={courses}
          professors={professors}
          levels={levels}
          userUX={userUX}
        />
      )}
    </FormNavbarContainer>
  );
};
