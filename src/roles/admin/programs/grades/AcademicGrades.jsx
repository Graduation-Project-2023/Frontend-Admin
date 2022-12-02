import React from "react";
import { useState, useEffect } from "react";
import { Table } from "../../../../components/Table/Table";
import { useTranslation } from "react-i18next";
import { FormCard } from "../../../../components/FormCard";
import { SidebarContainer } from "../../../../components/SidebarContainer";
import { useAuth } from "../../../../hooks/useAuth";


export const AcademicGrades = () => {
  const [academicGradesData, setAcademicGradesData] = useState([]);
  const [grades, setGrades] = useState([]);
  const authContext = useAuth();
  const { t } = useTranslation();
  const [backendData, setBackendData] = useState([
    { id: 1, name: "very good", startsFrom: 80 ,endsAt: 90, equivalent: "b", gpa: 70 },
    { id: 2, name: "good",  startsFrom: 70 ,endsAt: 80, equivalent: "c", gpa: 60 },
    { id: 3, name: "weak", startsFrom: 60 ,endsAt: 70, equivalent: "d", gpa: 60 },
    { id: 4, name: "failed", startsFrom: 60 ,endsAt: 50, equivalent: "f", gpa: 60 },
    
    
  ]);

  useEffect(() => {
    // // Get request to get all programs to display it in the sidebar
    // axios
    //   .get(BASE_URL + `/programs/${programId}/levels`)
    //   .then((res) => {
    //     console.log(res);
    //     setProrgramData(res);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     console.log(error);
    //   });
    const academicGrade = {
      name: "excellent",
      startsFrom: 90,
      endsAt: 100,
      equivalent: "A+",
      gpa: 4,
    
    };

    setAcademicGradesData(academicGrade);
  }, []);
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const academicGrades = { ...academicGradesData };
    academicGrades[fieldName] = fieldValue;
    setAcademicGradesData(academicGrades);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const rows = [...backendData];
    console.log(academicGradesData);
    rows.push(academicGradesData);
    setBackendData(rows);
  };
  const AcademicGradesData = [
    {
      id: 0,
      title: "grades.grade",
      name: "name",
      req: true,
      options:false,
      type: "text",
    },
    {
      id: 1,
      title: "grades.from",
      name: "startsFrom",
      req: true,
      options:false,
      type: "number",
    },
    {
      id: 2,
      title: "grades.to",
      name: "endsAt",
      req: true,
      options: false,
      type: "number",
    },
    {
      id: 3,
      title: "grades.equivalent",
      name: "equivalent",
      req: true,
      options: false,
      type: "text",
    },
    {
      id: 4,
      title: "grades.gpa",
      name: "gpa",
      req: true,
      options: false,
      type: "number",
    },
  ];


  return (<SidebarContainer>
    <FormCard cardTitle={"grades.formhead"}>
      <form
        onSubmit={(event) => {
          handleFormSubmit(event);
        }}
      >
        {AcademicGradesData.map((data) => {
          return (
            <div className="row mb-4" key={data.id}>
              <label className="col-sm-2 col-form-label">
                {t(data.title)}
              </label>
              <div className="col-sm-5">
                {data.options ? (
                  <select
                    className="form-select"
                    name={data.name}
                    onChange={handleEditFormChange}
                    value={academicGradesData[data.name] || ""}
                  >
                    {data.options.map((option) => {
                      return (
                        <option key={option.id} value={option.value}>
                          {t(option.title)}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <input
                    name={data.name}
                    type={data.type}
                    required={data.req}
                    className="form-control"
                    onChange={handleEditFormChange}
                    value={academicGradesData[data.name] || ""}
                  />
                )}
              </div>
            </div>
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
    <Table
      tableTitle={"grades.tablehead"}
      headerItems={[
        { id: 1, title: t(`grades.grade`) },
        { id: 2, title: t(`grades.from`) },
        { id: 3, title: t(`grades.to`) },
        { id: 4, title: t(`grades.equivalent`) },
        { id: 5, title: t(`grades.gpa`) },
      ]}
      rowItems={backendData}
      editableItems={true}
      deletableItems={true}
    />
  </SidebarContainer>);
};
