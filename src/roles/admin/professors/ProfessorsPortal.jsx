import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { ADMIN_URL } from "../../../shared/API";
import axios from "axios";
import { ProfessorsFormData } from "./ProfessorsFormData";

// Resuable Components
import { SidebarContainer } from "../../../components/sidebar/SidebarContainer";
import { FormCard } from "../../../components/forms/FormCard";
import { FormInput } from "../../../components/forms/FormInput";
import { DropdownSearch } from "../../../components/forms/DropdownSearch";

export const ProfessorsPortal = () => {
  const [professorData, setProfessorData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [profDep, setProfDep] = useState({});
  const [userUX, setUserUX] = useState({
    form: { loading: false, delete: false, error: false, errorMsg: "" },
    formData: { loading: false, error: false, errorMsg: "" },
    departments: { loading: false, error: false, errorMsg: "" },
  });
  const { t } = useTranslation();
  const { professorId } = useParams();
  const navigate = useNavigate();
  const authContext = useAuth();

  useEffect(() => {
    if (professorId !== "add" && professorId !== undefined) {
      // GET request to get college professor by it's id
      setUserUX((prev) => ({
        ...prev,
        formData: { loading: true, error: false, errorMsg: "" },
      }));
      axios
        .get(ADMIN_URL + `/professor?college_id=${authContext.college.id}`)
        .then((res) => {
          console.log(res);
          setProfessorData(res.data);
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
              errorMsg: "error in professor data",
            },
          }));
        });
    } else {
      setProfessorData([]);
    }
    // eslint-disable-next-line
  }, [professorId]);

  useEffect(() => {
    setUserUX((prev) => ({
      ...prev,
      departments: { loading: true, error: false, errorMsg: "" },
    }));
    // GET request to get all college departments to display it in the select menu
    axios
      .get(ADMIN_URL + `/departments?college_id=${authContext.college.id}`)
      .then((res) => {
        setDepartments(res.data);
        setUserUX((prev) => ({
          ...prev,
          departments: { loading: false, error: false, errorMsg: "" },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          departments: {
            loading: false,
            error: true,
            errorMsg: "error in departments data",
          },
        }));
      });
  }, [authContext.college.id]);

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    if (event.target.type === "number") {
      fieldValue = +fieldValue;
    }
    const newProfessorData = { ...professorData };
    newProfessorData[fieldName] = fieldValue;
    setProfessorData(newProfessorData);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newProfessor = {
      ...professorData,
      id: professorData.id.replace(/\s/g, ""),
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
    // Condition to check whether it's adding a new professor or updating the current
    professorId !== "add" && professorId !== undefined
      ? // PUT request to update the current college professor
        axios
          .put(ADMIN_URL + `/professor/${newProfessor.id}`, newProfessor)
          .then((res) => {
            setProfessorData(res.data);
            navigate("/admin/professors");
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
      : // POST request to create a new professor
        axios
          .post(ADMIN_URL + `/professor`, newProfessor)
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

  const handleDepartmentSelection = (item) => {
    setProfDep(item);
  };

  const handleProfessorDelete = (e) => {
    e.preventDefault();
    // DELETE request to delete the current professor
    setUserUX((prev) => ({
      ...prev,
      form: {
        ...prev.form,
        delete: true,
        error: false,
      },
    }));
    axios
      .delete(ADMIN_URL + `/professor/${professorData.id}`)
      .then((res) => {
        console.log(res);
        navigate("/admin/control_system");
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
      <FormCard cardTitle={"professor.formhead"}>
        <form
          onSubmit={(event) => {
            handleFormSubmit(event);
          }}
        >
          {userUX.loading ? (
            "loading..."
          ) : (
            <>
              {ProfessorsFormData.map((data) => {
                if (data.name === "department") {
                  return (
                    <div className="col-lg-12 mb-4">
                      <label className="form-label">{t(data.title)}</label>
                      <DropdownSearch
                        listData={{
                          type: "departmentWithCode",
                          data: departments,
                        }}
                        dropDownTitle={profDep}
                        inputPlaceholder={"professor.department_search"}
                        handleListClick={handleDepartmentSelection}
                        userUX={userUX.departments}
                      />
                    </div>
                  );
                } else if (
                  data.name === "id" &&
                  professorId !== "add" &&
                  professorId !== undefined
                ) {
                  return (
                    <FormInput
                      inputData={{ ...data, disabled: true }}
                      handleEditFormChange={handleEditFormChange}
                      valueData={professorData}
                      key={data.id}
                      loading={userUX.formData.loading}
                    />
                  );
                } else {
                  return (
                    <FormInput
                      inputData={data}
                      handleEditFormChange={handleEditFormChange}
                      valueData={professorData}
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
              : professorId !== "add" && professorId !== undefined
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

          {professorId !== "add" && professorId !== undefined && (
            <button
              className="form-card-button form-card-button-delete"
              onClick={handleProfessorDelete}
            >
              {userUX.delete ? "loading..." : t(`common.delete`)}
            </button>
          )}
        </form>
      </FormCard>
    </SidebarContainer>
  );
};
