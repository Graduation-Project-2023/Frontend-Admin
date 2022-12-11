import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks/useAuth";
import { BASE_URL } from "../../../shared/API";
import axios from "axios";
import { CoursesFormData } from "./CoursesFormData";

// Resuable Components
import { SidebarContainer } from "../../../components/sidebar/SidebarContainer";
import { FormCard } from "../../../components/forms/FormCard";
import { FormInput } from "../../../components/forms/FormInput";

export const CoursesPortal = () => {
  const [courseData, setCourseData] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState();
  const { t } = useTranslation();
  const authContext = useAuth();

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
      collegeId: authContext.college.id,
      id: courseData.id.replace(/\s/g, ""),
    };
    setLoading(true);
    // POST request to create a new level allowed hours
    axios
      .post(BASE_URL + `/courses`, newCourse)
      .then((res) => {
        console.log(res);
        setLoading(false);
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
            return (
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
            {t(`common.add`)}
          </button>
          <button
            type="reset"
            className="form-card-button form-card-button-cancel"
          >
            {t(`common.cancel`)}
          </button>
        </form>
      </FormCard>
    </SidebarContainer>
  );
};
