import { useState, useEffect } from "react";
import { Table } from "../../../../components/Table/Table";
import { useTranslation } from "react-i18next";
import { FormCard } from "../../../../components/FormCard";
import { SidebarContainer } from "../../../../components/SidebarContainer";
import { useAuth } from "../../../../hooks/useAuth";

export const LevelHours = () => {
  const [levelHoursData, setLevelHoursData] = useState([]);
  const [levels, setLevels] = useState([]);
  const authContext = useAuth();
  const { t } = useTranslation();

  const [backendData, setBackendData] = useState([
    { id: 1, title: "summer", level: 300, minHours: 30, maxHours: 60 },
    { id: 2, title: "first", level: 400, minHours: 20, maxHours: 90 },
    { id: 3, title: "summer", level: 200, minHours: 10, maxHours: 80 },
    { id: 4, title: "second", level: 500, minHours: 30, maxHours: 70 },
  ]);

  useEffect(() => {
    // // Get request to get all programs to display it in the sidebar
    // axios
    //   .get(BASE_URL + `/programs/${programId}/levels`)
    //   .then((res) => {
    //     console.log(res);
    //     setProrgramData(res);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     console.log(error);
    //   });
    const levelHour = {
      semester: "SEMESTER",
      level: 3,
      levelId: "sstring",
      minHours: 16,
      maxHours: 26,
      maxCourses: 30,
    };

    setLevelHoursData(levelHour);
  }, []);

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const levelHours = { ...levelHoursData };
    levelHours[fieldName] = fieldValue;
    setLevelHoursData(levelHours);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const rows = [...backendData];
    console.log(levelHoursData);
    rows.push(levelHoursData);
    setBackendData(rows);
  };

  const LevelHoursData = [
    {
      id: 0,
      title: "levelHours.term",
      name: "level",
      req: true,
      options: [
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
        rowItems={backendData}
        editableItems={true}
        deletableItems={true}
      />
    </SidebarContainer>
  );
};
