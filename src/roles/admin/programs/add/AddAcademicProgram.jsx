import { useState, useEffect, useRef } from "react";
import { Sidebar } from "../../../../components/Sidebar";
import { SidebarContainer } from "../../../../components/SidebarContainer";
import { FormCard } from "../../../../components/FormCard";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { BASE_URL } from "../../../../shared/API";
import { useAuth } from "../../../../hooks/useAuth";
import { Accordion } from "react-bootstrap";

export const AddAcademicProgram = () => {
  const [programsData, setProrgramsData] = useState([]);
  const [newProgram, setNewProgram] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authContext = useAuth();
  const { t } = useTranslation();

  const FormData = [
    {
      id: 0,
      title: "academicMain.section1",
      formData: [
        {
          id: 1,
          title: "academicMain.ar_name",
          name: "arabicName",
          req: true,
          options: false,
          type: "text",
        },
        {
          id: 2,
          title: "academicMain.eng_name",
          name: "englishName",
          req: true,
          options: false,
          type: "text",
        },
        {
          id: 3,
          title: "academicMain.code",
          name: "programCode",
          req: true,
          options: false,
          type: "text",
        },
        {
          id: 4,
          title: "academicMain.edu_degree",
          name: "degree",
          req: true,
          options: [
            { id: 1, title: "academicMain.edu_degree", value: "DEGREE1" },
            { id: 2, title: "academicMain.edu_degree", value: "DEGREE2" },
          ],
        },
        {
          id: 5,
          title: "academicMain.sys_type",
          name: "system",
          req: true,
          options: [
            { id: 1, title: "academicMain.credit", value: "CREDIT" },
            { id: 2, title: "levelHours.term", value: "TERM" },
            { id: 3, title: "levelHours.level", value: "LEVEL" },
          ],
        },
      ],
    },
    {
      id: 1,
      title: "academicMain.section2",
      formData: [
        {
          id: 1,
          title: "academicMain.credit",
          name: "creditHours",
          type: "number",
        },
        {
          id: 2,
          title: "academicMain.mandatory",
          name: "mandatoryHours",
          type: "number",
        },
        {
          id: 3,
          title: "academicMain.option",
          name: "optionalHours",
          type: "number",
        },
        {
          id: 4,
          title: "academicMain.project",
          name: "projectQualifyingHours",
          type: "number",
        },
        {
          id: 5,
          title: "academicMain.compute",
          name: "compute",
          options: [
            { id: 1, title: "academicMain.c_gpa", value: "C_GPA" },
            { id: 2, title: "academicMain.gpa", value: "GPA" },
            { id: 3, title: "academicMain.s_gpa", value: "S_GPA" },
          ],
        },
        {
          id: 6,
          title: "academicMain.prerequest",
          name: "prerequisiteProgramId",
          options: [
            { id: 1, title: "academicMain.prerequest", value: "PRE1" },
            { id: 2, title: "academicMain.prerequest", value: "PRE2" },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "academicMain.section3",
      formData: [
        {
          id: 1,
          title: "academicMain.fees",
          name: "feesType",
          options: [
            { id: 1, title: "academicMain.credit", value: "CREDIT" },
            { id: 2, title: "levelHours.term", value: "TERM" },
            { id: 3, title: "levelHours.level", value: "LEVEL" },
            { id: 4, title: "portal.programs", value: "PROGRAM" },
          ],
        },
        {
          id: 2,
          title: "academicMain.summer_fees",
          name: "summerFeesType",
          options: [
            { id: 1, title: "academicMain.credit", value: "CREDIT" },
            { id: 2, title: "levelHours.term", value: "TERM" },
            { id: 3, title: "levelHours.level", value: "LEVEL" },
            { id: 4, title: "portal.programs", value: "PROGRAM" },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "academicMain.section4",
      formData: [
        {
          id: 1,
          title: "academicMain.rate",
          name: "gradeLowering",
          type: "number",
        },
        {
          id: 2,
          title: "academicMain.trial",
          name: "attemptsToLowerGrade",
          type: "number",
        },
      ],
    },
  ];

  useEffect(() => {
    // // Get all programs to display it in the sidebar
    // axios
    //   .get(BASE_URL + `/programs?college_id=${authContext.college.id}`)
    //   .then((res) => {
    //     console.log(res);
    //     setProrgramsData(res);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     console.log(error);
    //   });

    const programs = [
      { id: 1, arabicName: "المستوى الاول", englishName: "First Level" },
      {
        id: 2,
        arabicName: "المستوى الاول لائحة",
        englishName: "First Level Slate",
      },
      {
        id: 3,
        arabicName: "الهندسة الكهربية",
        englishName: "Electrical Engineering",
      },
      {
        id: 4,
        arabicName: "الهندسة المعمارية ",
        englishName: "Architectural Engineering",
      },
      {
        id: 5,
        arabicName: "الهندسة الميكانيكية",
        englishName: "Mechanical Engineering",
      },
      {
        id: 6,
        arabicName: "الهندسة المدنية",
        englishName: "Civil Engineering",
      },
    ];
    setProrgramsData(programs);
  }, []);

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const program = { ...newProgram };
    program[fieldName] = fieldValue;
    setNewProgram(program);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(newProgram);
  };

  return (
    <>
      <Sidebar
        sideData={programsData.map((obj) => ({
          ...obj,
          path: `/admin_portal/academic_programs/${obj.id}/main`,
        }))}
        backendData={true}
        activeNav={false}
        sidebarTitle={"portal.programs"}
      />
      <SidebarContainer>
        <FormCard cardTitle={"portal.add"}>
          <form
            onSubmit={(event) => {
              handleFormSubmit(event);
            }}
          >
            <Accordion
              defaultActiveKey={["0"]}
              alwaysOpen
              className="collapseSection"
            >
              {FormData.map((item) => {
                return (
                  <Accordion.Item eventKey={item.id} key={item.id}>
                    <Accordion.Header>{t(item.title)}</Accordion.Header>
                    <Accordion.Body>
                      {item.formData.map((data) => {
                        return (
                          <div className="row mb-4" key={data.id}>
                            <label className=" col-sm-2 col-form-label">
                              {t(data.title)}
                            </label>
                            <div className="col-sm-4 ">
                              {data.options ? (
                                <select
                                  className="form-select"
                                  name={data.name}
                                  onChange={handleEditFormChange}
                                >
                                  {data.options.map((option) => {
                                    return (
                                      <option
                                        key={option.id}
                                        value={option.value}
                                      >
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
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
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
      </SidebarContainer>
    </>
  );
};
