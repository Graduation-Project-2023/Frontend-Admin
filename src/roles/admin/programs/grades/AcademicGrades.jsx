import React from "react";
import { useState, useEffect } from "react";
import { Table } from "../../../../components/table/Table";
import { useTranslation } from "react-i18next";
import { FormCard } from "../../../../components/FormCard";
import { SidebarContainer } from "../../../../components/SidebarContainer";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios";
import { BASE_URL } from "../../../../shared/API";
import { useParams } from "react-router-dom";

export const AcademicGrades = () => {
  const [academicGradesData, setAcademicGradesData] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const authContext = useAuth();
  const { t } = useTranslation();
  const { programId } = useParams();

  useEffect(() => {
    // GET request to get all GPA allowed hours to display it in the table
    axios
      .get(BASE_URL + `/programs/${programId}/grades`)
      .then((res) => {
        setGrades(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  });

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    if (event.target.type === "number") {
      fieldValue = +fieldValue;
    }
    const academicGrades = { ...academicGradesData };
    academicGrades[fieldName] = fieldValue;
    setAcademicGradesData(academicGrades);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const rows = [...grades];
    const gpaAllowedHour = { ...academicGradesData };
    gpaAllowedHour["collegeId"] = authContext.college.id;
    rows.push(gpaAllowedHour);

    // POST request to create a new academic grade
    axios
      .post(BASE_URL + `/programs/${programId}/gpa_allowed_hours`, {
        gpaAllowedHour,
      })
      .then((res) => {
        console.log(res);
        setGrades(rows);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const AcademicGradesData = [
    {
      id: 0,
      title: "grades.grade",
      name: "name",
      req: true,
      options: false,
      type: "text",
    },
    {
      id: 1,
      title: "grades.from",
      name: "startsFrom",
      req: true,
      options: false,
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

  return (
    <SidebarContainer>
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
        rowItems={grades}
        editableItems={true}
        deletableItems={true}
      />
    </SidebarContainer>
  );
};
