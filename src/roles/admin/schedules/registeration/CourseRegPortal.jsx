import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios";
import { BASE_URL } from "../../../../shared/API";

// Reusable Components
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { CoursesRegisteration } from "./CoursesRegisteration";
import { CourseRegister } from "./CourseRegister";

export const CoursesRegPortal = () => {
  const [courses, setCourses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [userUX, setUserUX] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });
  const authContext = useAuth();
  const { courseId } = useParams();

  useEffect(() => {
    setUserUX((prev) => ({ ...prev, loading: true }));
    // Get request to get all program courses to display it in the menu
    axios
      .get(BASE_URL + `/programs/${authContext.program.id}/program_courses`)
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

    setLevels(authContext.program.levels);
    // eslint-disable-next-line
  }, [authContext.program.id]);

  return (
    <FormNavbarContainer>
      {courseId === undefined ? (
        <CoursesRegisteration
          programCourses={courses}
          levels={levels}
          userUX={userUX}
        />
      ) : (
        <CourseRegister
          programCourses={courses}
          levels={levels}
          userUX={userUX}
        />
      )}
    </FormNavbarContainer>
  );
};
