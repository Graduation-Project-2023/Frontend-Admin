import { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ADMIN_URL } from "../../../../shared/API";
import axios from "axios";
import { AcademicLevelsData } from "./AcademicLevelsData";

// Reusable Components
import { SidebarContainer } from "../../../../components/sidebar/SidebarContainer";
import { FormCard } from "../../../../components/forms/FormCard";
import { FormInput } from "../../../../components/forms/FormInput";
import { FormButton } from "../../../../components/buttons/Buttons";
import { Table } from "../../../../components/table/Table";

export const AcademicLevels = () => {
  const [academicLevelsData, setAcademicLevelsData] = useState([]);
  const [levels, setLevels] = useState([]);
  const [userUX, setUserUX] = useState({
    form: { loading: false, error: false, errorMsg: "" },
    table: { loading: false, error: false, errorMsg: "" },
  });
  const { t } = useTranslation();
  const { programId } = useParams();
  const authContext = useAuth();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };

  useEffect(() => {
    setUserUX((prev) => ({
      ...prev,
      table: { loading: true, error: false, errorMsg: "" },
    }));
    // GET request to get all levels of a specific program and display in the table
    axios
      .get(ADMIN_URL + `/programs/${programId}/levels`, config)
      .then((res) => {
        setUserUX((prev) => ({
          ...prev,
          table: { loading: false, error: false, errorMsg: "" },
        }));
        setLevels(res.data);
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
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    if (event.target.type === "number") {
      fieldValue = +fieldValue;
    }
    const academicLevels = { ...academicLevelsData };
    academicLevels[fieldName] = fieldValue;
    setAcademicLevelsData(academicLevels);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUserUX((prev) => ({
      ...prev,
      form: { loading: true, error: false, errorMsg: "" },
    }));
    const rows = [...levels];
    const acadmicLevel = {
      ...academicLevelsData,
      programId: authContext.program.id,
    };
    // POST request to add a new academic level to the database
    axios
      .post(ADMIN_URL + `/programs/${programId}/levels`, acadmicLevel, config)
      .then((res) => {
        console.log(res.data);
        setUserUX((prev) => ({
          ...prev,
          form: { loading: false, error: false, errorMsg: "" },
        }));
        rows.push(res.data);
        setLevels(rows);
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
      <FormCard cardTitle={"academicSidebar.level"}>
        <form
          onSubmit={(event) => {
            handleFormSubmit(event);
          }}
        >
          {AcademicLevelsData.map((data) => {
            return (
              <FormInput
                inputData={data}
                handleEditFormChange={handleEditFormChange}
                valueData={academicLevelsData}
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
        tableTitle={"levels.tabletitle"}
        headerItems={[
          { id: 1, title: t(`common.eng_name`) },
          { id: 2, title: t(`common.ar_name`) },
          { id: 3, title: t(`levels.level`) },
          { id: 4, title: t(`levels.qualify`) },
        ]}
        rowItems={levels}
        editableItems={true}
        deletableItems={true}
        requestPath={`/admin/programs/${authContext.program.id}/levels/`}
        userUX={userUX.table}
      />
    </SidebarContainer>
  );
};
