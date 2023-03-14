import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { ADMIN_URL } from "../../../shared/API";
import axios from "axios";
import { DepartmentsFormData } from "./DepartmentsFormData";

// Resuable Components
import { SidebarContainer } from "../../../components/sidebar/SidebarContainer";
import { FormCard } from "../../../components/forms/FormCard";
import { FormInput } from "../../../components/forms/FormInput";
import { DropdownSearch } from "../../../components/forms/DropdownSearch";
import { PrerequisiteTable } from "../../../components/table/PrerequisiteTable";

export const DepartmentsPortal = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [depPrograms, setDepPrograms] = useState([]);
  const [userUX, setUserUX] = useState({
    programs: { loading: false, error: false, errorMsg: "" },
    form: { loading: false, delete: false, error: false, errorMsg: "" },
    formData: { loading: false, error: false, errorMsg: "" },
  });
  const { t } = useTranslation();
  const { departmentCode } = useParams();
  const navigate = useNavigate();
  const authContext = useAuth();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };

  useEffect(() => {
    // GET request to get all programs
    setUserUX((prev) => ({
      ...prev,
      programs: { loading: true, error: false, errorMsg: "" },
    }));
    axios
      .get(ADMIN_URL + `/programs?college_id=${authContext.college.id}`, config)
      .then((res) => {
        console.log(res);
        setPrograms(res.data);
        setUserUX((prev) => ({
          ...prev,
          programs: { loading: false, error: false, errorMsg: "" },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          programs: { loading: false, error: true, errorMsg: "error" },
        }));
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (departmentCode !== "add" && departmentCode !== undefined) {
      // GET request to get college department by it's id
      setUserUX((prev) => ({
        ...prev,
        formData: { loading: true, error: false, errorMsg: "" },
      }));
      axios
        .get(ADMIN_URL + `/departments/${departmentCode}`, config)
        .then((res) => {
          console.log(res);
          setDepartmentData(res.data);
          setUserUX((prev) => ({
            ...prev,
            formData: { loading: false, error: false, errorMsg: "" },
          }));
        })
        .catch((error) => {
          console.log(error);
          setUserUX((prev) => ({
            ...prev,
            formData: { loading: false, error: true, errorMsg: "error" },
          }));
        });
    } else {
      setDepartmentData([]);
    }
    // eslint-disable-next-line
  }, [departmentCode]);

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    if (event.target.type === "number") {
      fieldValue = +fieldValue;
    }
    const newDepartmentData = { ...departmentData };
    newDepartmentData[fieldName] = fieldValue;
    setDepartmentData(newDepartmentData);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newDepartment = {
      ...departmentData,
      collegeId: authContext.college.id,
      programs: depPrograms?.map((item) => item.id),
    };

    setUserUX((prev) => ({
      ...prev,
      form: { loading: true, error: false, errorMsg: "" },
    }));

    // Condition to check whether it's adding a new department or updating the current
    departmentCode !== "add" && departmentCode !== undefined
      ? // PUT request to update the current college department
        axios
          .put(ADMIN_URL + `/departments`, newDepartment, config)
          .then((res) => {
            console.log(res);
            setDepartmentData(res.data);
            navigate("/admin/departments");
            setUserUX((prev) => ({
              ...prev,
              form: { loading: false, error: false, errorMsg: "" },
            }));
          })
          .catch((error) => {
            console.log(error);
            setUserUX((prev) => ({
              ...prev,
              form: { loading: false, error: true, errorMsg: "error" },
            }));
          })
      : // POST request to create a new college department
        axios
          .post(ADMIN_URL + `/departments`, newDepartment, config)
          .then((res) => {
            console.log(res);
            setUserUX((prev) => ({
              ...prev,
              form: { loading: false, error: false, errorMsg: "" },
            }));
          })
          .catch((error) => {
            console.log(error);
            setUserUX((prev) => ({
              ...prev,
              form: { loading: false, error: true, errorMsg: "error" },
            }));
          });
  };

  const handleDepartmentDelete = (e) => {
    e.preventDefault();
    // DELETE request to delete the current college department
    setUserUX((prev) => ({
      ...prev,
      form: { loading: false, delete: true, error: false, errorMsg: "" },
    }));
    axios
      .delete(ADMIN_URL + `/departments/${departmentData.id}`, config)
      .then((res) => {
        console.log(res);
        navigate("/admin/departments");
        setUserUX((prev) => ({
          ...prev,
          form: { loading: false, delete: false, error: false, errorMsg: "" },
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
            errorMsg: "error",
          },
        }));
      });
  };

  const addProgToDep = (item) => {
    if (depPrograms.find((obj) => obj.id === item.id) === undefined) {
      setDepPrograms((current) => [...current, item]);
    }
  };

  const removeProgFromDep = (item) => {
    setDepPrograms((current) => current.filter((obj) => obj.id !== item.id));
  };

  return (
    <SidebarContainer>
      <FormCard cardTitle={"departments.formhead"}>
        <form
          onSubmit={(event) => {
            handleFormSubmit(event);
          }}
        >
          {userUX.loading ? (
            "loading..."
          ) : (
            <>
              {DepartmentsFormData.map((data) => {
                if (
                  data.name === "id" &&
                  departmentCode !== "add" &&
                  departmentCode !== undefined
                ) {
                  return (
                    <FormInput
                      inputData={{ ...data, disabled: true }}
                      handleEditFormChange={handleEditFormChange}
                      valueData={departmentData}
                      key={data.id}
                      loading={userUX.formData.loading}
                    />
                  );
                } else {
                  return (
                    <FormInput
                      inputData={data}
                      handleEditFormChange={handleEditFormChange}
                      valueData={departmentData}
                      key={data.id}
                      loading={userUX.formData.loading}
                    />
                  );
                }
              })}
            </>
          )}
          <div className="col-lg-12 mb-4">
            <label className="form-label">{t("departments.programs")}</label>
            <DropdownSearch
              listData={{ type: "selectCourse", data: programs }}
              inputPlaceholder={"departments.name"}
              handleListClick={addProgToDep}
              userUX={userUX.programs}
            />
          </div>
          {depPrograms.length !== 0 && (
            <PrerequisiteTable
              tableTitle={"departments.tabletitle"}
              headerItems={[
                { id: 1, title: t(`common.eng_name`) },
                { id: 2, title: t(`common.ar_name`) },
                { id: 3, title: t(`common.eng_name`) },
              ]}
              rowItems={depPrograms}
              deletableItems={true}
              handleDelete={removeProgFromDep}
            />
          )}

          <button
            type="submit"
            className="form-card-button form-card-button-save"
          >
            {userUX.loading
              ? "loading..."
              : departmentCode !== "add" && departmentCode !== undefined
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

          {departmentCode !== "add" && departmentCode !== undefined && (
            <button
              className="form-card-button form-card-button-delete"
              onClick={handleDepartmentDelete}
            >
              {userUX.delete ? "loading..." : t(`common.delete`)}
            </button>
          )}
        </form>
      </FormCard>
    </SidebarContainer>
  );
};
