import { useState, useEffect } from "react";
import { Sidebar } from "../../../../components/Sidebar";
import { SidebarContainer } from "../../../../components/SidebarContainer";
import { FormCard } from "../../../../components/FormCard";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { Accordion } from "react-bootstrap";
import { AcademicFormData } from "./AcademicFormData";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { BASE_URL } from "../../../../shared/API";

export const AddAcademicProgram = () => {
  const [programsData, setProrgramsData] = useState([]);
  const [newProgram, setNewProgram] = useState({});
  const [creditHours, setCreditHours] = useState(false);
  const authContext = useAuth();
  const { t } = useTranslation();
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    // // Get request to get all programs to display it in the sidebar
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
    if (fieldName === "system") {
      if (fieldValue === "CREDIT") {
        setCreditHours(true);
      } else {
        setCreditHours(false);
      }
    }
    const program = { ...newProgram };
    program[fieldName] = fieldValue;
    setNewProgram(program);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const program = { ...newProgram };
    program["collegeId"] = authContext.college.id;
    console.log(program);
    // // Post request to create a new program
    // setLoading(true);
    // axios
    //   .post(BASE_URL + `/programs`)
    //   .then((res) => {
    //     console.log(res);
    //     setLoading(false);
    //     navigate("/admin_portal/academic_programs")
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     console.log(error);
    //   });
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
              {AcademicFormData.map((item) => {
                return (
                  <Accordion.Item eventKey={item.id} key={item.id}>
                    <Accordion.Header>{t(item.title)}</Accordion.Header>
                    <Accordion.Body>
                      {item.formData.map((data) => {
                        if (!creditHours && data.credit) {
                          return null;
                        }
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
                                  value={newProgram[data.name] || ""}
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
                                  value={newProgram[data.name] || ""}
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