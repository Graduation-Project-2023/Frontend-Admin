import { useRef, useState } from "react";
import { Table } from "../../../../components/table/Table";
import { useTranslation } from "react-i18next";
import { FormCard } from "../../../../components/FormCard";
import { SidebarContainer } from "../../../../components/SidebarContainer";

export const LevelHours = () => {
  const { t } = useTranslation();
  const [backendData, setBackendData] = useState([
    { id: 1, title: "summer", level: 300, minHours: 30, maxHours: 60 },
    { id: 2, title: "first", level: 400, minHours: 20, maxHours: 90 },
    { id: 3, title: "summer", level: 200, minHours: 10, maxHours: 80 },
    { id: 4, title: "second", level: 500, minHours: 30, maxHours: 70 },
  ]);
  const semesterRef = useRef();
  const academicYearRef = useRef();
  const minHoursRef = useRef();
  const maxHoursRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const rows = [...backendData];
    const newRow = {
      id: 5,
      title: semesterRef.current.value,
      level: academicYearRef.current.value,
      minHours: minHoursRef.current.value,
      maxHours: maxHoursRef.current.value,
    };
    console.log(newRow);
    rows.push(newRow);
    setBackendData(rows);
  };

  return (
    <SidebarContainer>
      <FormCard cardTitle={"levelHours.formhead"}>
        <form
          onSubmit={(event) => {
            handleFormSubmit(event);
          }}
        >
          <div className="row mb-4">
            <label className=" col-sm-2 col-form-label">
              {t(`levelHours.term`)}
            </label>
            <div className="col-sm-4 ">
              <select className="form-select" ref={semesterRef}>
                <option>{t(`levelHours.term`)}</option>
                <option>One</option>
                <option>two</option>
                <option>three</option>
              </select>
            </div>
          </div>
          <div className="row mb-4">
            <label className="col-sm-2 col-form-label">
              {t(`levelHours.level`)}
            </label>
            <div className="col-sm-4 ">
              <select className="form-select" ref={academicYearRef}>
                <option>{t(`levelHours.level`)}</option>
                <option>2020</option>
                <option>2021</option>
              </select>
            </div>
          </div>
          <div className="row mb-4">
            <label className="col-sm-2 col-form-label">
              {t(`levelHours.min`)}
            </label>
            <div className="col-sm-4">
              <input
                ref={minHoursRef}
                type="number"
                placeholder={t(`levelHours.min`)}
              />
            </div>
          </div>
          <div className="row mb-4">
            <label className="col-sm-2 col-form-label">
              {t(`levelHours.max`)}
            </label>
            <div className="col-sm-4">
              <input
                ref={maxHoursRef}
                type="number"
                placeholder={t(`levelHours.max`)}
                className="form-control"
              />
            </div>
          </div>
          <button>press me</button>
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
