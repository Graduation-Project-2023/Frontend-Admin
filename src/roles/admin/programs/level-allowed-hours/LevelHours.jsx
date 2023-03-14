import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { ADMIN_URL } from "../../../../shared/API";
import axios from "axios";
import { LevelHoursData } from "./LevelHoursData";

// Reusable Components
import { SidebarContainer } from "../../../../components/sidebar/SidebarContainer";
import { FormCard } from "../../../../components/forms/FormCard";
import { FormInput } from "../../../../components/forms/FormInput";
import { Table } from "../../../../components/table/Table";
import { FormButton } from "../../../../components/buttons/Buttons";

export const LevelHours = () => {
  const [levelHoursData, setLevelHoursData] = useState([]);
  const [levelHours, setLevelHours] = useState([]);
  const [userUX, setUserUX] = useState({
    table: { loading: false, error: false, errorMsg: "" },
    form: { loading: false, error: false, errorMsg: "" },
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
    // GET request to get all level allowed hours to display it in the table
    axios
      .get(ADMIN_URL + `/programs/${programId}/level_allowed_hours`, config)
      .then((res) => {
        setUserUX((prev) => ({
          ...prev,
          table: { loading: false, error: false, errorMsg: "" },
        }));
        console.log(res.data);
        setLevelHours(res.data);
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
    const levelHours = { ...levelHoursData };
    levelHours[fieldName] = fieldValue;
    setLevelHoursData(levelHours);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUserUX((prev) => ({
      ...prev,
      form: { loading: true, error: false, errorMsg: "" },
    }));
    const rows = [...levelHours];
    const levelAllowedHour = {
      ...levelHoursData,
      level: +levelHoursData.level,
      programId: authContext.program.id,
    };

    // POST request to create a new level allowed hours
    axios
      .post(
        ADMIN_URL + `/programs/${programId}/level_allowed_hours`,
        levelAllowedHour,
        config
      )
      .then((res) => {
        console.log(res);
        setUserUX((prev) => ({
          ...prev,
          form: { loading: false, error: false, errorMsg: "" },
        }));
        rows.push(levelAllowedHour);
        setLevelHours(rows);
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
      <FormCard cardTitle={"levelHours.formhead"}>
        <form
          onSubmit={(event) => {
            handleFormSubmit(event);
          }}
        >
          {LevelHoursData.map((data) => {
            if (data.levels === true) {
              const levels = authContext.program?.levels.map((item) => ({
                id: item.id,
                value: item.level,
                title: item.arabicName,
              }));
              levels.unshift(data.options[0]);

              return (
                <FormInput
                  inputData={{ ...data, options: levels }}
                  handleEditFormChange={handleEditFormChange}
                  valueData={levelHoursData}
                  key={data.id}
                />
              );
            }
            return (
              <FormInput
                inputData={data}
                handleEditFormChange={handleEditFormChange}
                valueData={levelHoursData}
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
        tableTitle={"levelHours.tabletitle"}
        headerItems={[
          { id: 1, title: t(`levelHours.term`) },
          { id: 2, title: t(`levelHours.level`) },
          { id: 3, title: t(`levelHours.min`) },
          { id: 4, title: t(`levelHours.max`) },
          { id: 5, title: t(`levelHours.maxCourses`) },
        ]}
        rowItems={levelHours}
        editableItems={true}
        deletableItems={true}
        requestPath={`/admin/programs/${authContext.program.id}/level_allowed_hours/`}
        userUX={userUX.table}
      />
    </SidebarContainer>
  );
};
