import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { ADMIN_URL } from "../../../shared/API";
import axios from "axios";
import i18next from "i18next";

// Reusable Components
import { Sidebar } from "../../../components/sidebar/Sidebar";
import { SidebarContainer } from "../../../components/sidebar/SidebarContainer";
import { FormCard } from "../../../components/forms/FormCard";

// testing
const CourseworkStudents = [
  { id: 123123, code: 321231, arabicName: "ahmed" },
  { id: 2456, code: 12342, arabicName: "mohamed" },
  { id: 32301, code: 1233, arabicName: "ali" },
  { id: 4213, code: 4543, arabicName: "khaled" },
  { id: 512354, code: 5123, arabicName: "mohamed" },
];

export const StaffStudents = () => {
  const [courses, setCourses] = useState([]);
  const [userUX, setUserUX] = useState({
    list: { loading: false, error: false, errorMsg: "" },
    students: { loading: false, success: false, error: false, errorMsg: "" },
  });
  const authContext = useAuth();
  const { t } = useTranslation();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };
  const HeaderItems = [
    { id: 0, title: "" },
    { id: 1, title: "studentsData.code" },
    { id: 2, title: "studentsData.name" },
    { id: 3, title: "studentsData.notes" },
  ];

  useEffect(() => {
    setUserUX((prev) => ({ ...prev, list: { ...prev.list, loading: true } }));
    // GET request to get all college courses to display it in the sidebar
    axios
      .get(ADMIN_URL + `/courses?college_id=${authContext.college.id}`, config)
      .then((res) => {
        setCourses(res.data);
        setUserUX((prev) => ({
          ...prev,
          list: { ...prev.list, loading: false },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          list: { loading: false, error: true, errorMsg: "erorrr" },
        }));
      });

    // eslint-disable-next-line
  }, [authContext.college.id]);

  return (
    <>
      <Sidebar
        sideData={courses.map((obj) => ({ ...obj, path: obj.id }))}
        sidebarTitle={"kshofat el tolab"}
        searchable={true}
        inputPlaceholder={"common.search"}
        backendData={true}
        activeNav={true}
        userUX={userUX.list}
      />
      <SidebarContainer>
        <FormCard>
          <div className="table-container">
            <div className="table-container-mainHeader">
              <h1>title</h1>
              <button>print button</button>
            </div>
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  {HeaderItems.map((item) => {
                    return (
                      <th key={item.id} className="table-container-header">
                        {t(item.title)}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {CourseworkStudents.map((item, index) => {
                  return (
                    <tr>
                      <td className="table-container-items">{index + 1}</td>
                      <td className="table-container-items">{item.code}</td>
                      <td className="table-container-items">
                        {i18next.language === "en"
                          ? item.englishName
                          : item.arabicName}
                      </td>
                      <td className="table-container-items">{item.notes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </FormCard>
      </SidebarContainer>
    </>
  );
};
