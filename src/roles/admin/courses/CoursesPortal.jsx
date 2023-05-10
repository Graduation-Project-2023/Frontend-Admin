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
import { ModalPopup } from "../../../components/popups/ModalPopup";
import { BsFillPersonCheckFill } from "react-icons/bs";

export const CoursesPortal = () => {
  const [courseData, setCourseData] = useState([]);
  const [userUX, setUserUX] = useState({
    form: { loading: false, delete: false, error: false },
    formData: { loading: false, error: false },
  });
  const [modal, setModal] = useState(false);
  const { t } = useTranslation();
  const { courseCode } = useParams();
  const navigate = useNavigate();
  const authContext = useAuth();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };

  useEffect(() => {
    if (courseCode !== "add" && courseCode !== undefined) {
      // GET request to get college course by it's id
      setUserUX((prev) => ({
        ...prev,
        formData: { loading: true, error: false },
      }));
      axios
        .get(ADMIN_URL + `/courses/${courseCode}`, config)
        .then((res) => {
          console.log(res);
          setCourseData(res.data);
          setUserUX((prev) => ({
            ...prev,
            formData: { loading: false, error: false },
          }));
        })
        .catch((error) => {
          console.log(error);
          setUserUX((prev) => ({
            ...prev,
            formData: {
              loading: false,
              error: true,
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
      },
    }));
    // Condition to check whether it's adding a new course or updating the current
    courseCode !== "add" && courseCode !== undefined
      ? // PUT request to update the current college course
        axios
          .put(ADMIN_URL + `/courses/${newCourse.id}`, newCourse, config)
          .then((res) => {
            setCourseData(res.data);
            setModal(true);
            setUserUX((prev) => ({
              ...prev,
              form: {
                loading: false,
                delete: false,
                error: false,
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
              },
            }));
          })
      : // POST request to create a new college course
        axios
          .post(ADMIN_URL + `/courses`, newCourse, config)
          .then((res) => {
            console.log(res);
            setUserUX((prev) => ({
              ...prev,
              form: {
                loading: false,
                delete: false,
                error: false,
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
      .delete(ADMIN_URL + `/courses/${courseData.id}`, config)
      .then((res) => {
        console.log(res);
        setModal(true);
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
          },
        }));
      });
  };

  const closeModal = () => {
    navigate("/admin/courses");
    setModal(false);
  };

  return (
    <SidebarContainer>
      <FormCard
        cardTitle={
          courseCode === undefined || courseCode === "add"
            ? "courses.add"
            : "courses.formheadSingular"
        }
      >
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
            {userUX.form.loading ? (
              <span className="loader"></span>
            ) : courseCode !== "add" && courseCode !== undefined ? (
              t(`common.save`)
            ) : (
              t(`common.add`)
            )}
          </button>
          <button
            type="reset"
            className="form-card-button form-card-button-cancel"
            disabled={userUX.form.loading || userUX.form.delete}
          >
            {t(`common.cancel`)}
          </button>

          {courseCode !== "add" && courseCode !== undefined && (
            <button
              className="form-card-button form-card-button-delete"
              onClick={handleCourseDelete}
              disabled={userUX.form.loading || userUX.form.delete}
            >
              {userUX.form.delete ? (
                <span className="loader"></span>
              ) : (
                t(`common.delete`)
              )}
            </button>
          )}
          {(userUX.form.error || userUX.formData.error) && (
            <div className="alert alert-danger" role="alert">
              {t("error.common")}
            </div>
          )}
        </form>
        {modal && (
          <ModalPopup
            message={{
              state: true,
              icon: <BsFillPersonCheckFill />,
              title: "popup.success",
              text: "popup.message_success",
              button: "common.save",
              handleClick: closeModal,
            }}
            closeModal={closeModal}
          />
        )}
      </FormCard>
    </SidebarContainer>
  );
};
