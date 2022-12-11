import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks/useAuth";
import { BASE_URL } from "../../../shared/API";
import axios from "axios";
import { CoursesObjData } from "./CoursesObjData";

// Resuable Components
import { Sidebar } from "../../../components/sidebar/Sidebar";
import { SidebarContainer } from "../../../components/sidebar/SidebarContainer";
import { FormCard } from "../../../components/forms/FormCard";
import { FormInput } from "../../../components/forms/FormInput";

export const CoursesData = () => {
  const [courseData, setCourseData] = useState([]);
  const [courses, setCourses] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState();
  const { t } = useTranslation();
  const authContext = useAuth();

  useEffect(() => {
    // GET request to get all college courses to display it in the sidebar
    axios
      .get(BASE_URL + `/courses?college_id=${authContext.college.id}`)
      .then((res) => {
        console.log(res.data);
        setCourses(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    // eslint-disable-next-line
  }, [authContext.college.id]);

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
    const allCourses = [...courses];
    const newCourse = { ...courseData };
    newCourse["collegeId"] = authContext.college.id;
    allCourses.push(newCourse);

    // POST request to create a new level allowed hours
    axios
      .post(BASE_URL + `/courses`, newCourse)
      .then((res) => {
        console.log(res);
        setCourses(allCourses);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <Sidebar
        options={
          <button className="coursesSidebarBtn">{t("portal.add")}</button>
        }
        sideData={courses}
        sidebarTitle={"courses.formhead"}
        searchable={true}
        backendData={true}
        activeNav={true}
      />

      <SidebarContainer>
        <FormCard cardTitle={"courses.formhead"}>
          <form
            onSubmit={(event) => {
              handleFormSubmit(event);
            }}
          >
            {CoursesObjData.map((data) => {
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
              {t(`common.save`)}
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
    </>
  );
};
