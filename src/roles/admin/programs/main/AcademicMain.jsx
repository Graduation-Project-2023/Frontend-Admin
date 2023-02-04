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
import { FormButton } from "../../../../components/buttons/Buttons";
import { Accordion } from "react-bootstrap";

//TODO: edit ux for input fields loading and pre programs selection ux

export const AcademicMain = () => {
  const [updatedData, setUpdatedData] = useState({});
  const [programData, setProgramData] = useState([]);
  const [allPrograms, setAllPrograms] = useState([]);
  const [creditHours, setCreditHours] = useState();
  const [summerSemester, setSummerSemester] = useState();
  const [userUX, setUserUX] = useState({
    form: { loading: false, error: false, errorMsg: "" },
    prePrograms: { loading: false, error: false, errorMsg: "" },
  });
  const authContext = useAuth();
  const { t } = useTranslation();
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
      })
      .catch((error) => {
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
      })
      .catch((error) => {
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
    setUserUX((prev) => {
      return {
        ...prev,
        form: { loading: true, error: false, errorMsg: "" },
      };
    });
    // PUT request to update the current program
    axios
      .put(ADMIN_URL + `/programs/${programId}`, updatedData)
      .then((res) => {
        console.log(res.data);
        setUserUX((prev) => {
          return {
            ...prev,
            form: { loading: false, error: false, errorMsg: "" },
          };
        });
        navigate("/admin/academic_programs");
      })
      .catch((error) => {
        setUserUX((prev) => {
          return {
            ...prev,
            form: { loading: false, error: true, errorMsg: "error" },
          };
        });
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
          {userUX.form.loading ? (
            <FormButton type="loading" label="common.loading" />
          ) : (
            <FormButton type="submit" styles="save" label="common.add" />
          )}
          <FormButton type="reset" styles="cancel" label="common.cancel" />
        </form>
      </FormCard>
    </SidebarContainer>
  );
};
