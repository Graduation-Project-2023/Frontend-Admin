import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { BASE_URL } from "../../../../shared/API";
import axios from "axios";
import { AcademicFormData } from "./AcademicFormData";

// Reusable Components
import { SidebarContainer } from "../../../../components/SidebarContainer";
import { FormCard } from "../../../../components/FormCard";
import { FormInput } from "../../../../components/FormInput";
import { Accordion } from "react-bootstrap";

export const AcademicMain = () => {
  const [programData, setProgramData] = useState([]);
  const [creditHours, setCreditHours] = useState();
  const authContext = useAuth();
  const { t } = useTranslation();
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
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
        authContext.changeProgram(res.data);
        res.data.system === "CREDIT"
          ? setCreditHours(true)
          : setCreditHours(false);
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
                        <FormInput
                          inputData={data}
                          handleEditFormChange={handleEditFormChange}
                          valueData={programData}
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
