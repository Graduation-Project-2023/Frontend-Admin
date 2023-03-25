import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { ADMIN_URL } from "../../../shared/API";
import axios from "axios";
import { RegisterationFormData } from "./RegisterationFormData";

// Resuable Components
import { SidebarContainer } from "../../../components/sidebar/SidebarContainer";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import { FormCard } from "../../../components/forms/FormCard";
import { FormInput } from "../../../components/forms/FormInput";

export const StudentRegisteration = () => {
  const [students, setStudents] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [userUX, setUserUX] = useState({
    list: { loading: false, error: false, errorMsg: "" },
    studentData: { loading: false, error: false, errorMsg: "" },
  });
  const { t } = useTranslation();
  const { regStudentId } = useParams();
  const authContext = useAuth();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };

  useEffect(() => {
    setUserUX((prev) => ({
      ...prev,
      list: { ...prev.list, loading: true },
    }));
    // GET request to get all students by program id
    axios
      .get(ADMIN_URL + `/student/program/${authContext.program.id}`, config)
      .then((res) => {
        console.log(res);
        setStudents(res.data);
        setUserUX((prev) => ({
          ...prev,
          list: { ...prev.list, loading: false },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          list: { loading: false, error: true, errorMsg: "error" },
        }));
      });
    // eslint-disable-next-line
  }, [authContext.program.id, authContext.college.id]);

  useEffect(() => {
    console.log(regStudentId);
    setUserUX((prev) => ({
      ...prev,
      studentData: { ...prev.studentData, loading: true },
    }));
    // GET request to get student data by student id
    axios
      .get(ADMIN_URL + `/student/${regStudentId}`, config)
      .then((res) => {
        console.log(res);
        setStudentData(res.data);
        setUserUX((prev) => ({
          ...prev,
          studentData: { ...prev.studentData, loading: false },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          studentData: { loading: false, error: true, errorMsg: "error" },
        }));
      });
    // eslint-disable-next-line
  }, [authContext.program.id, authContext.college.id]);
  const handleEditFormChange = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Sidebar
        sideData={students.map((obj) => ({ ...obj, path: obj.id }))}
        sidebarTitle={"registeration.menu"}
        searchable={true}
        inputPlaceholder={"registeration.search"}
        backendData={true}
        activeNav={true}
        userUX={userUX.list}
      />
      <SidebarContainer>
        <FormCard cardTitle={"adminNavbarkeys.registeration"}>
          {RegisterationFormData.map((data) => {
            return (
              <FormInput
                inputData={{ ...data, disabled: true }}
                valueData={studentData}
                key={data.id}
                handleEditFormChange={handleEditFormChange}
                loading={userUX.studentData.loading}
              />
            );
          })}
        </FormCard>
      </SidebarContainer>
    </>
  );
};