import { useState, useEffect } from "react";
import { SidebarContainer } from "../../../../components/SidebarContainer";
import { FormCard } from "../../../../components/FormCard";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { Accordion } from "react-bootstrap";
import { AcademicFormData } from "./AcademicFormData";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../shared/API";

export const AcademicMain = () => {
  const [programData, setProgramData] = useState([]);
  const [creditHours, setCreditHours] = useState();
  const authContext = useAuth();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { programId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Get request to get a program by it's id
    axios
      .get(BASE_URL + `/programs/${programId}`)
      .then((res) => {
        console.log(res);
        setProgramData(res.data);
        res.data.system === "CREDIT"
          ? setCreditHours(true)
          : setCreditHours(false);
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
    if (fieldName === "system") {
      if (fieldValue === "CREDIT") {
        setCreditHours(true);
      } else {
        setCreditHours(false);
      }
    }
    const program = { ...programData };
    program[fieldName] = fieldValue;
    setProgramData(program);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const program = { ...programData };
    program["collegeId"] = authContext.college.id;

    // Post request to create a new program
    setLoading(true);
    axios
      .post(BASE_URL + `/programs`)
      .then((res) => {
        console.log(res);
        setLoading(false);
        navigate("/admin_portal/academic_programs");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <SidebarContainer>
      <FormCard cardTitle={"academicMain.formhead"}>
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
                                value={programData[data.name] || ""}
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
                                value={programData[data.name] || ""}
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
  );
};
