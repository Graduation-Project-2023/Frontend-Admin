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
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState();
  const authContext = useAuth();
  const { courseId } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(BASE_URL + `/programs/${authContext.program.id}/program_courses`)
      .then((res) => {
        setLoading(false);
        setCourses(res.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
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
          loading={loading}
        />
      ) : (
        <CourseRegister
          programCourses={courses}
          levels={levels}
          loading={loading}
        />
      )}
    </FormNavbarContainer>
  );
};
