import React from "react";
import { useState, useEffect } from "react";
import { Table } from "../../../../components/table/Table";
import { useTranslation } from "react-i18next";
import { FormCard } from "../../../../components/FormCard";
import { SidebarContainer } from "../../../../components/SidebarContainer";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios";
import { BASE_URL } from "../../../../shared/API";
import { useParams } from "react-router-dom";

export const AcademicCourses = () => {
  const [academicCoursesData, setAcademicCoursesData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const authContext = useAuth();
  const { t } = useTranslation();
  const { programId } = useParams();

  useEffect(() => {
    // GET request to get all cousres to display it in the table
    axios
      .get(BASE_URL + `/programs/${programId}/courses`)
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    if (event.target.type === "number") {
      fieldValue = +fieldValue;
    }
    const academicCourses = { ...academicCoursesData };
    academicCourses[fieldName] = fieldValue;
    setAcademicCoursesData(academicCourses);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const rows = [...courses];
    rows.push(academicCoursesData);
    // POST request to add a new program course to the database
    axios
      .get(BASE_URL + `/programs/${programId}/courses`, { academicCoursesData })
      .then((res) => {
        console.log(res);
        setCourses(rows);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        console.log(error);
      });
  };

  const AcademicCoursesData = [
    {
      id: 0,
      title: "courses.code",
      name: "courseId",
      req: false,
      options: false,
      type: "text",
    },
    {
      id: 1,
      title: "levels.level",
      name: "levelId",
      req: false,
      options: false,
      type: "number",
    },
    {
      id: 2,
      title: "courses.pre_code",
      name: "prerequisiteId",
      req: false,
      options: false,
      type: "number",
    },
    {
      id: 3,
      title: "levelHours.term",
      name: "semester",
      req: true,
      options: [
        { id: 0, title: "common.select", value: null },
        { id: 1, title: "academicMain.first", value: "FIRST" },
        { id: 2, title: "levelHours.second", value: "SECOND" },
        { id: 3, title: "levelHours.summer", value: "SUMMER" },
      ],
    },
    {
      id: 4,
      title: "courses.hours",
      name: "creditHours",
      req: true,
      options: false,
      type: "number",
    },
    {
      id: 5,
      title: "courses.min",
      name: "minimumHrsToRegister",
      req: false,
      options: false,
      type: "number",
    },
    {
      id: 6,
      title: "courses.type",
      name: "courseType ",
      req: true,
      options: [
        { id: 0, title: "common.select", value: null },
        { id: 1, title: "courses.mandatory", value: "COMPULSORY" },
        { id: 2, title: "courses.option", value: "ELECTIVE" },
      ],
    },
    {
      id: 7,
      title: "courses.class",
      name: "classWork",
      req: false,
      options: false,
      type: "number",
    },
    {
      id: 8,
      title: "courses.final",
      name: "finalExam",
      req: false,
      options: false,
      type: "number",
    },
    {
      id: 9,
      title: "courses.mid",
      name: "midTerm",
      req: false,
      options: false,
      type: "number",
    },
    {
      id: 10,
      title: "courses.oral",
      name: "oralPractical",
      req: false,
      options: false,
      type: "number",
    },
    {
      id: 11,
      title: "courses.attendance",
      name: "attendance",
      req: false,
      options: false,
      type: "number",
    },
  ];

  return (
    <SidebarContainer>
      <FormCard cardTitle={"academicSidebar.courses"}>
        <form
          onSubmit={(event) => {
            handleFormSubmit(event);
          }}
        >
          {AcademicCoursesData.map((data) => {
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
                      value={academicCoursesData[data.name] || ""}
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
                      value={academicCoursesData[data.name] || ""}
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
      {/* <Table tableTitle={"courses.tabletitle"} /> */}
    </SidebarContainer>
  );
};
