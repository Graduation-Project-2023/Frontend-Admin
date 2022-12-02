import React from "react";
import { useState, useEffect } from "react";
import { Table } from "../../../../components/Table/Table";
import { useTranslation } from "react-i18next";
import { FormCard } from "../../../../components/FormCard";
import { SidebarContainer } from "../../../../components/SidebarContainer";
import { useAuth } from "../../../../hooks/useAuth";

export const GPAHours = () => {
  const [gpaHoursData, setGPAHoursData] = useState([]);
  const [gpa, setGPA] = useState([]);
  const authContext = useAuth();
  const { t } = useTranslation();

  const [backendData, setBackendData] = useState([
    {
      id: 1,
      fromGpa: 1.7,
      toGpa: 4,
      minHours: 15,
      maxHours: 21,
      maxCourses: 6,
    },
    {
      id: 2,
      fromGpa: 2.3,
      toGpa: 4,
      minHours: 12,
      maxHours: 25,
      maxCourses: 2,
    },
    {
      id: 3,
      fromGpa: 2,
      toGpa: 4,
      minHours: 16,
      maxHours: 18,
    },
    {
      id: 4,
      fromGpa: 1.2,
      toGpa: 4,
      minHours: 18,
      maxHours: 21,
    },
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
    const gpaHour = {
      fromGpa: 1.7,
      toGpa: 4,
      minHours: 12,
      maxHours: 21,
      maxCourses: 6,
    };

    setGPAHoursData(gpaHour);
  }, []);

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const gpaHours = { ...gpaHoursData };
    gpaHours[fieldName] = fieldValue;
    setGPAHoursData(gpaHours);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const rows = [...backendData];
    console.log(gpaHoursData);
    rows.push(gpaHoursData);
    setBackendData(rows);
  };
  const GPAHoursData = [
    {
      id: 0,
      title: "gpaHours.from",
      name: "fromGpa",
      req: true,
      options: false,
      type: "number",
    },
    {
      id: 1,
      title: "gpaHours.to",
      name: "toGpa",
      req: true,
      options: false,
      type: "number",
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
      <FormCard cardTitle={"gpaHours.formhead"}>
        <form
          onSubmit={(event) => {
            handleFormSubmit(event);
          }}
        >
          {GPAHoursData.map((data) => {
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
                      value={gpaHoursData[data.name] || ""}
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
                      value={gpaHoursData[data.name] || ""}
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
          { id: 1, title: t(`gpaHours.from`) },
          { id: 2, title: t(`gpaHours.to`) },
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
