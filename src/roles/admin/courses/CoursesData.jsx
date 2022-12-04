import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks/useAuth";
import { BASE_URL } from "../../../shared/API";
import axios from "axios";
import cookies from "js-cookie";
import { Link } from "react-router-dom";
import { Sidebar } from "../../../components/Sidebar";
import { SidebarContainer } from "../../../components/SidebarContainer";
import { FormCard } from "../../../components/FormCard";
import { FormInput } from "../../../components/FormInput";
import { Table } from "../../../components/table/Table";
import { Dropdown } from "react-bootstrap";


export const CoursesData = () => {
  const [coursesDataData, setCoursesDataData] = useState([]);
  const [courses, setCourses] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState();
  const { t } = useTranslation();
  const { programId } = useParams();
  const authContext = useAuth();
  const currentLanguageCode = cookies.get("i18next") || "en";
  const [filteredcourse, setFilteredCourse] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  
  

  useEffect(() => {
    // GET request to get all level allowed hours to display it in the table
    axios
      .get(BASE_URL + `/programs/${programId}/courses`)
      .then((res) => {
        console.log(res.data);
        setCourses(res.data);
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
    const coursesData = { ...coursesDataData };
    coursesData[fieldName] = fieldValue;
    setCoursesDataData(coursesData);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const rows = [...courses];
    const academicCoursesData = { ...coursesDataData };
    academicCoursesData["collegeId"] = authContext.college.id;
    rows.push(academicCoursesData);

    // POST request to create a new level allowed hours
    axios
      .post(BASE_URL + `/programs/${programId}/courses`, {
        academicCoursesData,
      })
      .then((res) => {
        console.log(res);
        setCourses(rows);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const CoursesDataData = [
    
      {
        id: 0,
        title: "courses.eng_name",
        name: "englishName",
        req: true,
        options: false,
        type: "text",
      },
      {
        id: 1,
        title: "courses.ar_name",
        name: "arabicName",
        req: true,
        options: false,
        type: "text",
      },
      {
      id: 2,
      title: "courses.code",
      name: "code",
      req: true,
      options: false,
      type: "text",
    },
   
    {
      id: 3,
      title: "courses.ar_des",
      name: "arabicDescription",
      req: false,
      options: false,
      type: "text",
    },
    {
      id: 4,
      title: "courses.eng_des",
      name: "englishDescription",
      req: true,
      options: false,
      type: "text",
    },
  ];
  
  

  useEffect(() => {
    if (currentLanguageCode === "en") {
      setFilteredCourse(
        courses.filter((item) =>
          item.englishName.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      setFilteredCourse(
        courses.filter((item) =>
          item.arabicName.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
    // eslint-disable-next-line
  }, [searchValue]);
  
  

  return (
    <>
      <Sidebar 
       options=
       {<><input
        type="text"
        className="form-control"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        placeholder={t("courses.name")}
        />
        <button className="coursesSidebarBtn">{t("portal.add")}</button>
        </>
        }
       
       sideData={courses}
       sidebarTitle={"courses.formhead"} />

      <SidebarContainer>
        <FormCard cardTitle={"courses.formhead"}>
        <form
          onSubmit={(event) => {
            handleFormSubmit(event);
          }}
        >
          {CoursesDataData.map((data) => {
            return (
              <FormInput
                inputData={data}
                handleEditFormChange={handleEditFormChange}
                valueData={coursesDataData}
                key={data.id}
              />
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
        </form>
        </FormCard>
        <Table
        tableTitle={"courses.tabletitle"}
        headerItems={[
          { id: 1, title: t(`courses.eng_name`) },
          { id: 2, title: t(`courses.ar_name`) },
          { id: 3, title: t(`courses.code`) },
          { id: 4, title: t(`courses.ar_des`) },
          { id: 5, title: t(`courses.eng_des`) },
        ]}
        rowItems={courses}
        editableItems={true}
        deletableItems={true}
      />
      </SidebarContainer>
    </>
  );
};
