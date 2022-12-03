import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table } from "../../../../components/table/Table";
import { useTranslation } from "react-i18next";
import { FormCard } from "../../../../components/FormCard";
import { SidebarContainer } from "../../../../components/SidebarContainer";
import axios from "axios";
import { BASE_URL } from "../../../../shared/API";

export const AcademicLevels = () => {
  const [academicLevelsData, setAcademicLevelsData] = useState([]);
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
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
  });

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

  const AcademicLevelsData = [
    {
      id: 0,
      title: "levels.eng_level",
      name: "englishName",
      req: true,
      options: false,
      type: "text",
    },
    {
      id: 1,
      title: "levels.ar_level",
      name: "arabicName",
      req: true,
      options: false,
      type: "text",
    },
    {
      id: 2,
      title: "levels.level",
      name: "level",
      req: true,
      type: "number",
    },
    {
      id: 3,
      title: "levels.qualify",
      name: "qualifyingHrs",
      req: false,
      options: false,
      type: "number",
    },
  ];
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
                      value={academicLevelsData[data.name] || ""}
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
                      value={academicLevelsData[data.name] || ""}
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
