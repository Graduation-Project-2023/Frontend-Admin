import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { BASE_URL } from "../../../../shared/API";
import axios from "axios";
import { AcademicFormData } from "./AcademicFormData";

// Reusable Components
import { SidebarContainer } from "../../../../components/SidebarContainer";
import { FormCard } from "../../../../components/FormCard";
import { FormInput } from "../../../../components/FormInput";
import { Sidebar } from "../../../../components/Sidebar";
import { Accordion } from "react-bootstrap";
import cookies from "js-cookie";

export const AddAcademicProgram = () => {
  const [programsData, setProrgramsData] = useState([]);
  const [newProgram, setNewProgram] = useState({});
  const [creditHours, setCreditHours] = useState(false);
  const authContext = useAuth();
  const { t } = useTranslation();
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    // GET request to get all programs to display it in the sidebar
    axios
      .get(BASE_URL + `/programs?college_id=${authContext.college.id}`)
      .then((res) => {
        setProrgramsData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    if (event.target.type === "number") {
      fieldValue = +fieldValue;
    }
    if (fieldName === "hasSummerSemester") {
      if (fieldValue === "true") {
        fieldValue = true;
      } else if (fieldValue === "false") {
        fieldValue = false;
      }
    }
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
    // POST request to create a new program
    setLoading(true);
    axios
      .post(BASE_URL + `/programs`, program)
      .then((res) => {
        setLoading(false);
        navigate(`/admin_portal/academic_programs/${res.data.id}/main`);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        console.log(error);
      });
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
                        if (data.prerequisites) {
                          const newProgramsData = programsData.map((item) => {
                            return {
                              id: item.id,
                              value: item.id,
                              title:
                                currentLanguageCode === "en"
                                  ? item.englishName
                                  : item.arabicName,
                            };
                          });
                          newProgramsData.unshift({
                            id: 0,
                            title: "common.select",
                            value: null,
                          });
                          data.options = newProgramsData;
                          return (
                            <FormInput
                              inputData={data}
                              handleEditFormChange={handleEditFormChange}
                              valueData={newProgram}
                              key={data.id}
                            />
                          );
                        }
                        return (
                          <FormInput
                            inputData={data}
                            handleEditFormChange={handleEditFormChange}
                            valueData={newProgram}
                            key={data.id}
                          />
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
              {t(`common.add`)}
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
