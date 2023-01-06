import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";
import { ADMIN_URL } from "../../../../shared/API";
import axios from "axios";
import i18next from "i18next";
import { AcademicFormData } from "./AcademicFormData";

// Reusable Components
import { SidebarContainer } from "../../../../components/sidebar/SidebarContainer";
import { FormCard } from "../../../../components/forms/FormCard";
import { FormInput } from "../../../../components/forms/FormInput";
import { Accordion } from "react-bootstrap";

export const AcademicMain = () => {
  const [updatedData, setUpdatedData] = useState({});
  const [programData, setProgramData] = useState([]);
  const [allPrograms, setAllPrograms] = useState([]);
  const [creditHours, setCreditHours] = useState();
  const [summerSemester, setSummerSemester] = useState();
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
      .get(ADMIN_URL + `/programs/${programId}`)
      .then((res) => {
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
    // eslint-disable-next-line
  }, [programId]);

  useEffect(() => {
    // GET request to get all programs to display it in the pre programs selection
    axios
      .get(ADMIN_URL + `/programs?college_id=${authContext.college.id}`)
      .then((res) => {
        setAllPrograms(res.data);
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
        setSummerSemester(true);
      } else if (fieldValue === "false") {
        fieldValue = false;
        setSummerSemester(false);
      }
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
    setUpdatedData((current) => {
      return { ...current, [`${fieldName}`]: fieldValue };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // PUT request to update the current program
    setLoading(true);
    axios
      .put(ADMIN_URL + `/programs/${programId}`, updatedData)
      .then((res) => {
        setLoading(false);
        navigate("/admin/academic_programs");
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
                  <Accordion.Body style={{ padding: "1rem 2rem" }}>
                    {item.formData.map((data) => {
                      if (!creditHours && data.credit) {
                        return null;
                      }
                      if (!summerSemester && data.summer) {
                        return null;
                      }
                      if (data.prerequisites) {
                        const newProgramsData = allPrograms
                          .filter((obj) => obj.id !== programId)
                          .map((item) => {
                            return {
                              id: item.id,
                              value: item.id,
                              title:
                                i18next.language === "en"
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
                            valueData={programData}
                            key={data.id}
                          />
                        );
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
