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

  useEffect(() => {
    // GET request to get all level allowed hours to display it in the table
    axios
      .get(ADMIN_URL + `/programs/${programId}/level_allowed_hours`)
      .then((res) => {
        console.log(res.data);
        setLevelHours(res.data);
      })
      .catch((error) => {
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
    setUserUX((prev) => ({ ...prev, loading: true, error: false }));
    e.preventDefault();
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
        levelAllowedHour
      )
      .then((res) => {
        console.log(res);
        setUserUX((prev) => ({ ...prev, loading: false, error: false }));
        rows.push(levelAllowedHour);
        setLevelHours(rows);
      })
      .catch((error) => {
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
          {userUX.loading ? (
            <button className="form-card-button form-card-button-save">
              {t(`common.loading`)} <span className="loader"></span>
            </button>
          ) : (
            <button
              type="submit"
              className="form-card-button form-card-button-save"
            >
              {t(`common.add`)}
            </button>
          )}
          <button
            type="reset"
            className="form-card-button form-card-button-cancel"
          >
            {t(`common.cancel`)}
          </button>
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
