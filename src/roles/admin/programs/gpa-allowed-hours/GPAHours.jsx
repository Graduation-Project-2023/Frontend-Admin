import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { BASE_URL } from "../../../../shared/API";
import axios from "axios";

// Reusable Components
import { SidebarContainer } from "../../../../components/sidebar/SidebarContainer";
import { FormCard } from "../../../../components/forms/FormCard";
import { FormInput } from "../../../../components/forms/FormInput";
import { Table } from "../../../../components/table/Table";

export const GPAHours = () => {
  const [gpaHoursData, setGPAHoursData] = useState([]);
  const [allGPAData, setAllGPAData] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState();
  const { t } = useTranslation();
  const { programId } = useParams();
  const authContext = useAuth();

  useEffect(() => {
    // GET request to get all GPA allowed hours to display it in the table
    axios
      .get(BASE_URL + `/programs/${programId}/gpa_allowed_hours`)
      .then((res) => {
        console.log(res);
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
    const gpaHours = { ...gpaHoursData };
    gpaHours[fieldName] = fieldValue;
    setGPAHoursData(gpaHours);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const rows = [...allGPAData];
    const gpaAllowedHour = { ...gpaHoursData };
    gpaAllowedHour["collegeId"] = authContext.college.id;
    rows.push(gpaAllowedHour);

    // POST request to create a new level allowed hours
    axios
      .post(BASE_URL + `/programs/${programId}/gpa_allowed_hours`, {
        gpaAllowedHour,
      })
      .then((res) => {
        console.log(res.data);
        setAllGPAData(rows);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <SidebarContainer>
      <FormCard cardTitle={"gpaHours.formhead"}>
        <form
          onSubmit={(event) => {
            handleFormSubmit(event);
          }}
        >
          {GPAHoursData.map((data) => {
            return (
              <FormInput
                inputData={data}
                handleEditFormChange={handleEditFormChange}
                valueData={gpaHoursData}
                key={data.id}
              />
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
        tableTitle={"levelHours.tabletitle"}
        headerItems={[
          { id: 1, title: t(`gpaHours.from`) },
          { id: 2, title: t(`common.gpaTo`) },
          { id: 3, title: t(`levelHours.min`) },
          { id: 4, title: t(`levelHours.max`) },
        ]}
        rowItems={allGPAData}
        editableItems={true}
        deletableItems={true}
      />
    </SidebarContainer>
  );
};
