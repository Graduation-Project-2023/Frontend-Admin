import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { ADMIN_URL } from "../../../../shared/API";
import axios from "axios";
import { AcademicGradesData } from "./AcademicGradesData";

// Reusable Components
import { SidebarContainer } from "../../../../components/sidebar/SidebarContainer";
import { FormCard } from "../../../../components/forms/FormCard";
import { FormInput } from "../../../../components/forms/FormInput";
import { FormButton } from "../../../../components/buttons/Buttons";
import { Table } from "../../../../components/table/Table";

export const AcademicGrades = () => {
  const [academicGradesData, setAcademicGradesData] = useState([]);
  const [grades, setGrades] = useState([]);
  const [userUX, setUserUX] = useState({
    table: { loading: false, error: false, errorMsg: "" },
    form: { loading: false, error: false, errorMsg: "" },
  });
  const authContext = useAuth();
  const { t } = useTranslation();
  const { programId } = useParams();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };

  useEffect(() => {
    setUserUX((prev) => ({
      ...prev,
      table: { loading: true, error: false, errorMsg: "" },
    }));
    // GET request to get all GPA allowed hours to display it in the table
    axios
      .get(ADMIN_URL + `/programs/${programId}/grades`, config)
      .then((res) => {
        console.log(res);
        setUserUX((prev) => ({
          ...prev,
          table: { loading: false, error: false, errorMsg: "" },
        }));
        setGrades(res.data);
      })
      .catch((error) => {
        setUserUX((prev) => ({
          ...prev,
          table: { loading: false, error: true, errorMsg: "error" },
        }));
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
    setUserUX((prev) => ({
      ...prev,
      form: { loading: true, error: false, errorMsg: "" },
    }));
    const rows = [...grades];
    const grade = { ...academicGradesData, programId: authContext.program.id };

    // POST request to create a new academic grade
    axios
      .post(ADMIN_URL + `/programs/${programId}/grades`, grade, config)
      .then((res) => {
        console.log(res);
        setUserUX((prev) => ({
          ...prev,
          form: { loading: false, error: false, errorMsg: "" },
        }));
        rows.push(grade);
        setGrades(rows);
      })
      .catch((error) => {
        setUserUX((prev) => ({
          ...prev,
          form: { loading: false, error: true, errorMsg: "error" },
        }));
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
          {userUX.form.loading ? (
            <FormButton type="loading" label="common.loading" />
          ) : (
            <FormButton type="submit" styles="save" label="common.add" />
          )}
          <FormButton type="reset" styles="cancel" label="common.cancel" />
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
        requestPath={`/admin/programs/${authContext.program.id}/grades/`}
        userUX={userUX.table}
      />
    </SidebarContainer>
  );
};
