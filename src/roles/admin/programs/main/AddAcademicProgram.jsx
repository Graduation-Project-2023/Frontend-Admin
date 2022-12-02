import { useState, useEffect } from "react";
import { Sidebar } from "../../../../components/Sidebar";
import { SidebarContainer } from "../../../../components/SidebarContainer";
import { FormCard } from "../../../../components/FormCard";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { Accordion } from "react-bootstrap";
import { AcademicFormData } from "./AcademicFormData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../shared/API";

export const AddAcademicProgram = () => {
  const [programsData, setProrgramsData] = useState([]);
  const [newProgram, setNewProgram] = useState({});
  const [creditHours, setCreditHours] = useState(false);
  const authContext = useAuth();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
  }, []);

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    console.log(event.target.type);
    let fieldValue = event.target.value;
    if (event.target.type === "number") {
      fieldValue = +fieldValue;
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
    
    // POST request to create a new program
    setLoading(true);
    axios
      .post(BASE_URL + `/programs`, { program })
      .then((res) => {
        console.log(res);
        setLoading(false);
        navigate("/admin_portal/academic_programs");
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
