import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";

export const CourseRegister = () => {
  const [courseData, setCourseData] = useState([]);
  const { courseId } = useParams();

  useEffect(() => {
    setCourseData([]);
  }, []);

  return <FormNavbarContainer>CourseRegister</FormNavbarContainer>;
};
