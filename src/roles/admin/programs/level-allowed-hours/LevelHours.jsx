import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { BASE_URL } from "../../../../shared/API";
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
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState();
  const { t } = useTranslation();
  const { programId } = useParams();
  const authContext = useAuth();

  useEffect(() => {
    // GET request to get all level allowed hours to display it in the table
    axios
      .get(BASE_URL + `/programs/${programId}/level_allowed_hours`)
      .then((res) => {
        console.log(res.data);
        setLevelHours(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
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
    const rows = [...levelHours];
    const levelAllowedHour = { ...levelHoursData };
    levelAllowedHour["collegeId"] = authContext.college.id;
    rows.push(levelAllowedHour);

    // POST request to create a new level allowed hours
    axios
      .post(BASE_URL + `/programs/${programId}/level_allowed_hours`, {
        levelAllowedHour,
      })
      .then((res) => {
        console.log(res);
        setLevelHours(rows);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
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
              return (
                <FormInput
                  inputData={data}
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
        tableTitle={"levelHours.tabletitle"}
        headerItems={[
          { id: 1, title: t(`levelHours.term`) },
          { id: 2, title: t(`levelHours.level`) },
          { id: 3, title: t(`levelHours.min`) },
          { id: 4, title: t(`levelHours.max`) },
        ]}
        rowItems={levelHours}
        editableItems={true}
        deletableItems={true}
      />
    </SidebarContainer>
  );
};