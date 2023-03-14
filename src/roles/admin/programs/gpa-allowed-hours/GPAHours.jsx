import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { ADMIN_URL } from "../../../../shared/API";
import axios from "axios";
import { GPAHoursData } from "./GPAHoursData";

// Reusable Components
import { SidebarContainer } from "../../../../components/sidebar/SidebarContainer";
import { FormCard } from "../../../../components/forms/FormCard";
import { FormInput } from "../../../../components/forms/FormInput";
import { Table } from "../../../../components/table/Table";
import { FormButton } from "../../../../components/buttons/Buttons";

export const GPAHours = () => {
  const [gpaHoursData, setGPAHoursData] = useState([]);
  const [allGPAData, setAllGPAData] = useState([]);
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
    // GET request to get all GPA allowed hours to display it in the table
    axios
      .get(ADMIN_URL + `/programs/${programId}/gpa_allowed_hours`, config)
      .then((res) => {
        setUserUX((prev) => ({
          ...prev,
          table: { loading: false, error: false, errorMsg: "" },
        }));
        setAllGPAData(res.data);
        console.log(res);
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
    const gpaHours = { ...gpaHoursData };
    gpaHours[fieldName] = fieldValue;
    setGPAHoursData(gpaHours);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUserUX((prev) => ({
      ...prev,
      form: { loading: true, error: false, errorMsg: "" },
    }));
    const rows = [...allGPAData];
    const gpaAllowedHour = {
      ...gpaHoursData,
      programId: authContext.program.id,
    };

    // POST request to create a new gpa allowed hours
    axios
      .post(
        ADMIN_URL + `/programs/${programId}/gpa_allowed_hours`,
        gpaAllowedHour,
        config
      )
      .then((res) => {
        console.log(res);
        setUserUX((prev) => ({
          ...prev,
          form: { loading: false, error: false, errorMsg: "" },
        }));
        rows.push(gpaAllowedHour);
        setAllGPAData(rows);
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
          { id: 1, title: t(`gpaHours.from`) },
          { id: 2, title: t(`common.gpaTo`) },
          { id: 3, title: t(`levelHours.min`) },
          { id: 4, title: t(`levelHours.max`) },
        ]}
        rowItems={allGPAData}
        editableItems={true}
        deletableItems={true}
        requestPath={`/admin/programs/${authContext.program.id}/gpa_allowed_hours/`}
        userUX={userUX.table}
      />
    </SidebarContainer>
  );
};
