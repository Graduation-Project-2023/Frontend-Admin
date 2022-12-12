import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../../shared/API";
import axios from "axios";
import { CoursesFormData } from "./CoursesFormData";

// Resuable Components
import { SidebarContainer } from "../../../components/sidebar/SidebarContainer";
import { FormCard } from "../../../components/forms/FormCard";
import { FormInput } from "../../../components/forms/FormInput";

export const CourseData = () => {
  const [courseData, setCourseData] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState();
  const { t } = useTranslation();
  const { courseCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // GET request to get college course by it's id
    axios
      .get(BASE_URL + `/courses/${courseCode}`)
      .then((res) => {
        setCourseData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    // eslint-disable-next-line
  }, [courseCode]);

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    if (event.target.type === "number") {
      fieldValue = +fieldValue;
    }
    const newCourseData = { ...courseData };
    newCourseData[fieldName] = fieldValue;
    setCourseData(newCourseData);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      ...courseData,
      id: courseData.id.replace(/\s/g, ""),
    };
    setLoading(true);
    // PUT request to update the current college course
    axios
      .put(BASE_URL + `/courses/${newCourse.id}`, newCourse)
      .then((res) => {
        setCourseData(res.data);
        setLoading(false);
        navigate("/admin_portal/courses");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleCourseDelete = (e) => {
    e.preventDefault();
    setLoading(true);
    // DELETE request to delete the current college course
    axios
      .delete(BASE_URL + `/courses/CCE 302`)
      .then((res) => {
        console.log(res);
        setLoading(false);
        navigate("/admin_portal/courses");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <SidebarContainer>
      <FormCard cardTitle={"courses.formhead"}>
        <form
          onSubmit={(event) => {
            handleFormSubmit(event);
          }}
        >
          {CoursesFormData.map((data) => {
            return data.name === "id" ? (
              <FormInput
                inputData={{ ...data, disabled: true }}
                handleEditFormChange={handleEditFormChange}
                valueData={courseData}
                key={data.id}
              />
            ) : (
              <FormInput
                inputData={data}
                handleEditFormChange={handleEditFormChange}
                valueData={courseData}
                key={data.id}
              />
            );
          })}
          <button
            type="submit"
            className="form-card-button form-card-button-save"
          >
            {t(`common.save`)}
          </button>
          <button
            type="reset"
            className="form-card-button form-card-button-cancel"
          >
            {t(`common.cancel`)}
          </button>
          <button
            className="form-card-button form-card-button-delete"
            onClick={handleCourseDelete}
          >
            {t(`common.7azf el mokarar`)}
          </button>
        </form>
      </FormCard>
    </SidebarContainer>
  );
};
