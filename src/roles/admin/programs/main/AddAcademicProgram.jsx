import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { Sidebar } from "../../../../components/sidebar/Sidebar";
import { Accordion } from "react-bootstrap";

export const AddAcademicProgram = () => {
  const [programsData, setProrgramsData] = useState([]);
  const [newProgram, setNewProgram] = useState({});
  const [creditHours, setCreditHours] = useState(false);
  const [summerSemester, setSummerSemester] = useState(false);
  const authContext = useAuth();
  const { t } = useTranslation();
  const [userUX, setUserUX] = useState({
    form: { loading: false, error: false, errorMsg: "" },
    siderbar: { loading: false, error: false, errorMsg: "" },
  });
  const navigate = useNavigate();

  useEffect(() => {
    setUserUX((prev) => ({ ...prev, siderbar: { loading: true } }));
    // GET request to get all programs to display it in the sidebar
    axios
      .get(ADMIN_URL + `/programs?college_id=${authContext.college.id}`)
      .then((res) => {
        setUserUX((prev) => ({ ...prev, siderbar: { loading: false } }));
        setProrgramsData(res.data);
      })
      .catch((error) => {
        setUserUX((prev) => ({
          ...prev,
          siderbar: {
            loading: false,
            error: true,
            errorMsg: "error in sidebar",
          },
        }));

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
    const program = { ...newProgram };
    program[fieldName] = fieldValue;
    setNewProgram(program);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUserUX((prev) => ({
      ...prev,
      form: { loading: true, error: false, errorMsg: "" },
    }));
    const program = { ...newProgram, collegeId: authContext.college.id };
    // POST request to create a new program
    axios
      .post(ADMIN_URL + `/programs`, program)
      .then((res) => {
        setUserUX((prev) => ({
          ...prev,
          form: { loading: false, error: false, errorMsg: "" },
        }));
        navigate(`/portal/admin/academic_programs/${res.data.id}/main`);
      })
      .catch((error) => {
        setUserUX((prev) => ({
          ...prev,
          form: { loading: false, error: true, errorMsg: "error" },
        }));
        console.log(error);
      });
  };

  return (
    <>
      <Sidebar
        sideData={programsData.map((obj) => ({
          ...obj,
          path: `/admin/academic_programs/${obj.id}/main`,
        }))}
        backendData={true}
        activeNav={false}
        sidebarTitle={"portal.programs"}
        userUX={userUX.siderbar}
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
                        if (!summerSemester && data.summer) {
                          return null;
                        }
                        if (data.prerequisites) {
                          const newProgramsData = programsData.map((item) => {
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
            {userUX.form.loading ? (
              <FormButton type="loading" label="common.loading" />
            ) : (
              <FormButton type="submit" styles="save" label="common.add" />
            )}
            <FormButton type="reset" styles="cancel" label="common.cancel" />
          </form>
        </FormCard>
      </SidebarContainer>
    </>
  );
};
