import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { ADMIN_URL } from "../../../shared/API";
import axios from "axios";
import { CoursesFormData } from "./CoursesFormData";

// Resuable Components
import { SidebarContainer } from "../../../components/sidebar/SidebarContainer";
import { FormCard } from "../../../components/forms/FormCard";
import { FormInput } from "../../../components/forms/FormInput";

export const CoursesPortal = () => {
  const [courseData, setCourseData] = useState([]);
  const [userUX, setUserUX] = useState({
    form: { loading: false, delete: false, error: false, errorMsg: "" },
    formData: { loading: false, error: false, errorMsg: "" },
  });
  const { t } = useTranslation();
  const { courseCode } = useParams();
  const navigate = useNavigate();
  const authContext = useAuth();

  useEffect(() => {
    if (courseCode !== "add" && courseCode !== undefined) {
      // GET request to get college course by it's id
      setUserUX((prev) => ({
        ...prev,
        formData: { loading: true, error: false, errorMsg: "" },
      }));
      axios
        .get(ADMIN_URL + `/courses/${courseCode}`)
        .then((res) => {
          console.log(res);
          setCourseData(res.data);
          setUserUX((prev) => ({
            ...prev,
            formData: { loading: false, error: false, errorMsg: "" },
          }));
        })
        .catch((error) => {
          console.log(error);
          setUserUX((prev) => ({
            ...prev,
            formData: {
              loading: false,
              error: true,
              errorMsg: "error in course",
            },
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
    setUserUX((prev) => ({
      ...prev,
      form: {
        loading: true,
        delete: false,
        error: false,
        errorMsg: "",
      },
    }));
    // Condition to check whether it's adding a new course or updating the current
    courseCode !== "add" && courseCode !== undefined
      ? // PUT request to update the current college course
        axios
          .put(ADMIN_URL + `/courses/${newCourse.id}`, newCourse)
          .then((res) => {
            setCourseData(res.data);
            navigate("/admin/courses");
            setUserUX((prev) => ({
              ...prev,
              form: {
                loading: false,
                delete: false,
                error: false,
                errorMsg: "",
              },
            }));
          })
          .catch((error) => {
            console.log(error);
            setUserUX((prev) => ({
              ...prev,
              form: {
                loading: false,
                delete: false,
                error: true,
                errorMsg: "error in submitting",
              },
            }));
          })
      : // POST request to create a new college course
        axios
          .post(ADMIN_URL + `/courses`, newCourse)
          .then((res) => {
            console.log(res);
            setUserUX((prev) => ({
              ...prev,
              form: {
                loading: false,
                delete: false,
                error: false,
                errorMsg: "",
              },
            }));
          })
          .catch((error) => {
            console.log(error);
            setUserUX((prev) => ({
              ...prev,
              form: {
                loading: false,
                delete: false,
                error: true,
                errorMsg: "error in submitting",
              },
            }));
          });
  };

  const handleCourseDelete = (e) => {
    e.preventDefault();
    // DELETE request to delete the current college course
    setUserUX((prev) => ({
      ...prev,
      form: {
        ...prev.form,
        delete: true,
        error: false,
      },
    }));
    axios
      .delete(ADMIN_URL + `/courses/${courseData.id}`)
      .then((res) => {
        console.log(res);
        navigate("/admin/courses");
        setUserUX((prev) => ({
          ...prev,
          form: {
            ...prev.form,
            delete: false,
          },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          form: {
            ...prev.form,
            delete: false,
            error: true,
            errorMsg: "error in deleting",
          },
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
                      loading={userUX.formData.loading}
                    />
                  );
                } else {
                  return (
                    <FormInput
                      inputData={data}
                      handleEditFormChange={handleEditFormChange}
                      valueData={courseData}
                      key={data.id}
                      loading={userUX.formData.loading}
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
