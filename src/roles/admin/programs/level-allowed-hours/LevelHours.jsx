import { useState, useEffect } from "react";
import { Table } from "../../../../components/table/Table";
import { useTranslation } from "react-i18next";
import { FormCard } from "../../../../components/FormCard";
import { SidebarContainer } from "../../../../components/SidebarContainer";
import axios from "axios";
import { BASE_URL } from "../../../../shared/API";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";

export const LevelHours = () => {
  const [levelHoursData, setLevelHoursData] = useState([]);
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { t } = useTranslation();
  const { programId } = useParams();
  const authContext = useAuth();

  useEffect(() => {
    // GET request to get all level allowed hours to display it in the table
    axios
      .get(BASE_URL + `/programs/${programId}/level_allowed_hours`)
      .then((res) => {
        setLevels(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
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
    const levelHours = { ...levelHoursData };
    levelHours[fieldName] = fieldValue;
    setLevelHoursData(levelHours);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const rows = [...levels];
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
        setLevels(rows);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const LevelHoursData = [
    {
      id: 0,
      title: "levelHours.term",
      name: "level",
      req: true,
      options: [
        { id: 0, title: "common.select", value: null },
        { id: 1, title: "academicMain.first", value: "FIRST" },
        { id: 2, title: "levelHours.second", value: "SECOND" },
        { id: 3, title: "levelHours.summer", value: "SUMMER" },
      ],
    },
    {
      id: 1,
      title: "levelHours.level",
      name: "semester",
      req: true,
      options: [
        { id: 0, title: "common.select", value: null },
        { id: 1, title: "academicMain.degree_bachelor", value: "CREDIT" },
        { id: 2, title: "academicMain.degree_diploma", value: "SCHOOLYEAR" },
      ],
    },
    {
      id: 2,
      title: "levelHours.min",
      name: "minHours",
      req: true,
      options: false,
      type: "number",
    },
    {
      id: 3,
      title: "levelHours.max",
      name: "maxHours",
      req: true,
      options: false,
      type: "number",
    },
    {
      id: 4,
      title: "levelHours.maxCourses",
      name: "maxCourses",
      req: false,
      options: false,
      type: "number",
    },
  ];

  return (
    <SidebarContainer>
      <FormCard cardTitle={"levelHours.formhead"}>
        <form
          onSubmit={(event) => {
            handleFormSubmit(event);
          }}
        >
          {LevelHoursData.map((data) => {
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
                      value={levelHoursData[data.name] || ""}
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
                      value={levelHoursData[data.name] || ""}
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
        tableTitle={"levelHours.tabletitle"}
        headerItems={[
          { id: 1, title: t(`levelHours.term`) },
          { id: 2, title: t(`levelHours.level`) },
          { id: 3, title: t(`levelHours.min`) },
          { id: 4, title: t(`levelHours.max`) },
        ]}
        rowItems={levels}
        editableItems={true}
        deletableItems={true}
      />
    </SidebarContainer>
  );
};
