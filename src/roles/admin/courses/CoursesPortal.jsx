import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../../shared/API";
import axios from "axios";
import { CoursesFormData } from "./CoursesFormData";

// Resuable Components
import { SidebarContainer } from "../../../components/sidebar/SidebarContainer";
import { FormCard } from "../../../components/forms/FormCard";
import { FormInput } from "../../../components/forms/FormInput";

export const CoursesPortal = () => {
  const [courseData, setCourseData] = useState([]);
  const [userUX, setUserUX] = useState({
    loading: false,
    delete: false,
    error: false,
    error_msg: "",
  });
  const { t } = useTranslation();
  const { courseCode } = useParams();
  const navigate = useNavigate();
  const authContext = useAuth();

  useEffect(() => {
    if (courseCode !== "add" && courseCode !== undefined) {
      // GET request to get college course by it's id
      setUserUX((prev) => ({ ...prev, loading: true }));
      axios
        .get(BASE_URL + `/courses/${courseCode}`)
        .then((res) => {
          console.log(res);
          setCourseData(res.data);
          setUserUX((prev) => ({ ...prev, loading: false }));
        })
        .catch((error) => {
          console.log(error);
          setUserUX((prev) => ({
            ...prev,
            loading: false,
            error: true,
            error_msg: error,
          }));
        });
    } else {
      setCourseData([]);
    }
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
      collegeId: authContext.college.id,
    };
    setUserUX((prev) => ({ ...prev, loading: true }));
    // Condition to check whether it's adding a new course or updating the current
    courseCode !== "add" && courseCode !== undefined
      ? // PUT request to update the current college course
        axios
          .put(BASE_URL + `/courses/${newCourse.id}`, newCourse)
          .then((res) => {
            setCourseData(res.data);
            navigate("/admin_portal/courses");
            setUserUX((prev) => ({ ...prev, loading: false }));
          })
          .catch((error) => {
            console.log(error);
            setUserUX((prev) => ({
              ...prev,
              loading: false,
              error: true,
              error_msg: error,
            }));
          })
      : // POST request to create a new college course
        axios
          .post(BASE_URL + `/courses`, newCourse)
          .then((res) => {
            console.log(res);
            setUserUX((prev) => ({ ...prev, loading: false }));
          })
          .catch((error) => {
            console.log(error);
            setUserUX((prev) => ({
              ...prev,
              loading: false,
              error: true,
              error_msg: error,
            }));
          });
  };

  const handleCourseDelete = (e) => {
    e.preventDefault();
    // DELETE request to delete the current college course
    setUserUX((prev) => ({ ...prev, delete: true }));
    axios
      .delete(BASE_URL + `/courses/${courseData.id}`)
      .then((res) => {
        console.log(res);
        navigate("/admin_portal/courses");
        setUserUX((prev) => ({ ...prev, delete: false }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          delete: false,
          error: true,
          error_msg: error,
        }));
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
          {userUX.loading ? (
            "loading..."
          ) : (
            <>
              {CoursesFormData.map((data) => {
                if (
                  data.name === "id" &&
                  courseCode !== "add" &&
                  courseCode !== undefined
                ) {
                  return (
                    <FormInput
                      inputData={{ ...data, disabled: true }}
                      handleEditFormChange={handleEditFormChange}
                      valueData={courseData}
                      key={data.id}
                    />
                  );
                } else {
                  return (
                    <FormInput
                      inputData={data}
                      handleEditFormChange={handleEditFormChange}
                      valueData={courseData}
                      key={data.id}
                    />
                  );
                }
              })}
            </>
          )}

          <button
            type="submit"
            className="form-card-button form-card-button-save"
          >
            {userUX.loading
              ? "loading..."
              : courseCode !== "add" && courseCode !== undefined
              ? t(`common.save`)
              : t(`common.add`)}
          </button>
          <button
            type="reset"
            className="form-card-button form-card-button-cancel"
            disabled={userUX.loading}
          >
            {t(`common.cancel`)}
          </button>

          {courseCode !== "add" && courseCode !== undefined && (
            <button
              className="form-card-button form-card-button-delete"
              onClick={handleCourseDelete}
            >
              {userUX.delete ? "loading..." : t(`common.delete`)}
            </button>
          )}
        </form>
      </FormCard>
    </SidebarContainer>
  );
};
