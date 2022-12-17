import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { StudentFormData } from "./StudentFormData";
import axios from "axios";
import { BASE_URL } from "../../../../shared/API";

// Reusable Components
import { Accordion } from "react-bootstrap";
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { FormInput } from "../../../../components/forms/FormInput";

export const StudentDataPortal = () => {
  const { t } = useTranslation();
  const [studentData, setStudentData] = useState([]);
  const [updatedData, setUpdatedData] = useState({});
  const [genderMale, setGenderMale] = useState(false);
  const nationalIdRef = useRef();
  const { studentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (studentId !== "register" && studentId !== undefined) {
      // GET request to get student data by it's id
      axios
        .get(BASE_URL + `/students/${studentId}`)
        .then((res) => {
          setStudentData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setStudentData([]);
    }
    // eslint-disable-next-line
  }, [studentId]);

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    if (event.target.type === "number") {
      fieldValue = +fieldValue;
    }
    if (fieldName === "gender") {
      if (fieldValue === "MALE") {
        setGenderMale(true);
      } else {
        setGenderMale(false);
      }
    }
    const student = { ...studentData };
    student[fieldName] = fieldValue;
    setStudentData(student);
    setUpdatedData((current) => {
      return { ...current, [`${fieldName}`]: fieldValue };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      ...studentData,
    };
    // Condition to check whether it's adding a new student or updating the current
    studentId !== "register" && studentId !== undefined
      ? // PUT request to update the current student data
        axios
          .put(BASE_URL + `/students/${newStudent.id}`, newStudent)
          .then((res) => {
            setStudentData(res.data);
          })
          .catch((error) => {
            console.log(error);
          })
      : // POST request to create a new student
        axios
          .post(BASE_URL + `/students`, newStudent)
          .then((res) => {
            console.log(res);
            navigate(`/student_data/${res.data.id}`);
          })
          .catch((error) => {
            console.log(error);
          });
  };

  return (
    <FormNavbarContainer>
      <div className="collapseSectionCard">
        <form onSubmit={handleFormSubmit}>
          <Accordion
            defaultActiveKey={["0"]}
            alwaysOpen
            className="collapseSection"
          >
            {StudentFormData.map((item) => {
              if (
                (studentId === "register" || studentId === undefined) &&
                item.addStudent
              ) {
                return null;
              }
              if (item.male && !genderMale) {
                return null;
              }
              return (
                <Accordion.Item eventKey={item.id} key={item.id}>
                  <Accordion.Header>{t(item.title)}</Accordion.Header>
                  <Accordion.Body>
                    {item.formData.map((data) => {
                      return (
                        <FormInput
                          inputData={data}
                          handleEditFormChange={handleEditFormChange}
                          valueData={studentData}
                          key={data.id}
                        />
                      );
                    })}
                  </Accordion.Body>
                </Accordion.Item>
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
          </Accordion>
        </form>
      </div>
    </FormNavbarContainer>
  );
};
