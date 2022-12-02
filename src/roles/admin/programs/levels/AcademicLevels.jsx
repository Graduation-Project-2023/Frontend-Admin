import React from 'react';
import { useState, useEffect } from "react";
import { Table } from "../../../../components/Table/Table";
import { useTranslation } from "react-i18next";
import { FormCard } from "../../../../components/FormCard";
import { SidebarContainer } from "../../../../components/SidebarContainer";
import { useAuth } from "../../../../hooks/useAuth";


export const AcademicLevels = () => {
  const [academicLevelsData, setAcademicLevelsData] = useState([]);
  const [grades, setGrades] = useState([]);
  const authContext = useAuth();
  const { t } = useTranslation();

  const [backendData, setBackendData] = useState([
    { id: 1, englishName: "one", arabicName:"اول" ,level: 100, qualifyingHrs: 2 },
    { id: 2, englishName: "two", arabicName:"ثاني" ,level: 200, qualifyingHrs: 50 },
    { id: 3, englishName: "three", arabicName:"ثالث" ,level: 300, qualifyingHrs: 100 },
    { id: 4, englishName: "four", arabicName:"رابع" ,level: 400, qualifyingHrs: 150 },
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
    const academicLevel = {
      englishName: "four",
      arabicName:" رابع",
      level: 300,
      qualifyingHrs: 135,
      
    
    };

    setAcademicLevelsData(academicLevel);
  }, []);
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const academicLevels = { ...academicLevelsData };
    academicLevels[fieldName] = fieldValue;
    setAcademicLevelsData(academicLevels);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const rows = [...backendData];
    console.log(academicLevelsData);
    rows.push(academicLevelsData);
    setBackendData(rows);
  };
  const AcademicLevelsData = [
    {
      id: 0,
      title: "levels.eng_level",
      name: "englishName",
      req: true,
      options:false,
      type: "text",
    },
    {
      id: 1,
      title: "levels.ar_level",
      name: "arabicName",
      req: true,
      options:false,
      type: "text",
    },
    {
      id: 2,
      title: "levels.level",
      name: "level",
      req: true,
      options: false,
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
      rowItems={backendData}
      editableItems={true}
      deletableItems={true}
    />
  </SidebarContainer>);
}
