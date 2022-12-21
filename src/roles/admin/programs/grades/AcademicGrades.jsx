import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { BASE_URL } from "../../../../shared/API";
import axios from "axios";
import { AcademicGradesData } from "./AcademicGradesData";

// Reusable Components
import { SidebarContainer } from "../../../../components/sidebar/SidebarContainer";
import { FormCard } from "../../../../components/forms/FormCard";
import { FormInput } from "../../../../components/forms/FormInput";
import { Table } from "../../../../components/table/Table";

export const AcademicGrades = () => {
  const [academicGradesData, setAcademicGradesData] = useState([]);
  const [grades, setGrades] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [programId]);

  const handleEditFormChange = (event) => {
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
    const grade = { ...academicGradesData, programId: authContext.program.id };

    // POST request to create a new academic grade
    axios
      .post(BASE_URL + `/programs/${programId}/grades`, grade)
      .then((res) => {
        console.log(res);
        rows.push(grade);
        setGrades(rows);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

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
              <FormInput
                inputData={data}
                handleEditFormChange={handleEditFormChange}
                valueData={academicGradesData}
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
        requestPath={`/programs/${authContext.program.id}/grades/`}
      />
    </SidebarContainer>
  );
};
