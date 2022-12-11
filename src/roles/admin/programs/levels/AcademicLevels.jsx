import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../../../shared/API";
import axios from "axios";
import { AcademicLevelsData } from "./AcademicLevelsData";

// Reusable Components
import { SidebarContainer } from "../../../../components/sidebar/SidebarContainer";
import { FormCard } from "../../../../components/forms/FormCard";
import { FormInput } from "../../../../components/forms/FormInput";
import { Table } from "../../../../components/table/Table";

export const AcademicLevels = () => {
  const [academicLevelsData, setAcademicLevelsData] = useState([]);
  const [levels, setLevels] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState();
  const { t } = useTranslation();
  const { programId } = useParams();

  useEffect(() => {
    // GET request to get all levels of a specific program
    axios
      .get(BASE_URL + `/programs/${programId}/levels`)
      .then((res) => {
        setLevels(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
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
    const rows = [...levels];
    rows.push(academicLevelsData);

    // POST request to add a new academic level to the database
    axios
      .get(BASE_URL + `/programs/${programId}/levels`, { academicLevelsData })
      .then((res) => {
        console.log(res);
        setLevels(rows);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        console.log(error);
      });
  };

  return (
    <SidebarContainer>
      <FormCard cardTitle={"levels.level"}>
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
        tableTitle={"levels.tabletitle"}
        headerItems={[
          { id: 1, title: t(`levels.eng_level`) },
          { id: 2, title: t(`levels.ar_level`) },
          { id: 3, title: t(`levels.level`) },
          { id: 4, title: t(`levels.qualify`) },
        ]}
        rowItems={levels}
        editableItems={true}
        deletableItems={true}
      />
    </SidebarContainer>
  );
};
