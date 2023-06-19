import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { ADMIN_URL } from "../../../shared/API";
import axios from "axios";
import styles from "./RegisterationPortal.module.scss";
import i18next from "i18next";
import { STUDENTS } from "./TestingStudents";

// Resuable Components
import { SidebarContainer } from "../../../components/sidebar/SidebarContainer";
import { Sidebar } from "../../../components/sidebar/Sidebar";
import { FormCard } from "../../../components/forms/FormCard";
import { FormInput } from "../../../components/forms/FormInput";
import { DayPeriodTable } from "../../../components/table/schedule/DayPeriodTable";
import { RegisterationFormData } from "./RegisterationFormData";
import { Dropdown } from "react-bootstrap";
import { CoursesTable } from "../../../components/table/CoursesTable";

export const StudentRegisteration = () => {
  const [courses, setCourses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [students, setStudents] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [courseInstancesIds, setCourseInstancesIds] = useState([]);
  const [tableRegistered, setTableRegistered] = useState({
    state: false,
    tableId: "",
  });
  const [cells, setCells] = useState({ occupied: [], available: [] });
  const [userUX, setUserUX] = useState({
    list: { loading: false, error: false, errorMsg: "" },
    studentData: { loading: false, error: false, errorMsg: "" },
    table: { loading: false, error: false, errorMsg: "" },
    tableSubmit: { loading: false, error: false, errorMsg: "" },
    courses: { loading: false, error: false, errorMsg: "" },
  });
  const { t } = useTranslation();
  const { studentId } = useParams();
  const authContext = useAuth();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };

  useEffect(() => {
    setUserUX((prev) => ({
      ...prev,
      levels: { ...prev.levels, loading: true },
    }));
    // GET request to get levels by program id
    axios
      .get(
        ADMIN_URL + `/programs/6e7441c6-168e-4a1b-9b1e-a191914d44e0/levels`,
        config
      )
      .then((res) => {
        console.log(res);
        setLevels(res.data);
        setUserUX((prev) => ({
          ...prev,
          levels: { ...prev.levels, loading: false },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          levels: {
            loading: false,
            error: true,
            errorMsg: "error getting levels",
          },
        }));
      });
    // eslint-disable-next-line
  }, [authContext.program.id, authContext.college.id]);

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
        setStudents(STUDENTS);
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
    setUserUX((prev) => ({
      ...prev,
      studentData: { ...prev.studentData, loading: true },
      table: { ...prev.table, loading: true },
      courses: { ...prev.courses, loading: true },
    }));

    // GET request to get student data by student id
    axios
      .get(ADMIN_URL + `/student/${studentId}`, config)
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

    // GET request to get student availabe courses by student id
    axios
      .get(
        ADMIN_URL +
          `/view/available_classes?studentId=${studentId}&semesterId=decc46ba-7d4b-11ed-a1eb-0242ac120002
        `,
        config
      )
      .then((res) => {
        console.log(res);
        setCourses(res.data);
        setUserUX((prev) => ({
          ...prev,
          courses: { ...prev.courses, loading: false },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          courses: { loading: false, error: true, errorMsg: "error" },
        }));
      });

    // GET request to get student schedule by student id
    axios
      .get(
        ADMIN_URL +
          `/view/table?studentId=${studentId}&semesterId=decc46ba-7d4b-11ed-a1eb-0242ac120002
          `,
        config
      )
      .then((res) => {
        console.log(res);
        if (res.data === null) {
          setTableData([]);
          setTableRegistered({ state: false, tableId: "" });
        } else {
          setTableData(res.data.classes);
          setTableRegistered({ state: true, tableId: res.data.id });
        }
        setUserUX((prev) => ({
          ...prev,
          table: { loading: false, error: false, errorMsg: "" },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          table: { loading: false, error: true, errorMsg: "error" },
        }));
      });

    // eslint-disable-next-line
  }, [authContext.program.id, authContext.college.id]);

  useEffect(() => {
    if (tableData.length === 0) {
      setCourseInstancesIds([]);
    } else if (tableData.length > 0) {
      const courseInstancesIds = tableData.map((item) => item.courseInstanceId);
      setCourseInstancesIds(courseInstancesIds);
    }
  }, [tableData]);

  const handleCellsSetter = (occupiedCells, availableCells) => {
    setCells((current) => {
      return {
        ...current,
        occupied: occupiedCells,
        available: availableCells,
      };
    });
  };

  const findCellAvailable = (classes) => {
    let cellOccupied = false;
    classes.forEach((item) => {
      const dayAvailableCells = cells.available.filter(
        (cell) => cell.day === item.day
      );
      let classHrs = +item.endPeriod - +item.startPeriod + 1;
      for (let i = 0; i < classHrs; i++) {
        const cellFound = dayAvailableCells.some(
          (cell) => cell.period === +item.startPeriod + i
        );
        if (!cellFound) {
          cellOccupied = true;
          break;
        }
      }
    });
    if (cellOccupied) {
      setUserUX((prev) => ({
        ...prev,
        table: {
          error: true,
          errorMsg: "cell already occupied",
        },
      }));
      return false;
    } else {
      return true;
    }
  };

  const addCourseToTable = (classes) => {
    setUserUX((prev) => ({
      ...prev,
      table: {
        error: false,
        errorMsg: "",
      },
    }));

    if (courseInstancesIds.includes(classes[0].courseInstanceId)) {
      setUserUX((prev) => ({
        ...prev,
        table: {
          error: true,
          errorMsg: "course already occupied",
        },
      }));
      return;
    }
    const cellAvailable = findCellAvailable(classes);
    if (cellAvailable) {
      const newTableData = [...tableData, ...classes];
      setTableData(newTableData);
    }
  };

  const removeCourseFromTable = (classes) => {
    setUserUX((prev) => ({
      ...prev,
      table: {
        error: false,
        errorMsg: "",
      },
    }));
    const newTableData = tableData.filter((obj) => {
      return obj.courseInstanceId !== classes[0].courseInstanceId;
    });
    setTableData(newTableData);
  };

  const saveTableData = (event) => {
    event.preventDefault();
    const finalTableData = tableData.reduce((acc, current) => {
      const courseInstanceIndex = acc.findIndex(
        (courseInstance) =>
          courseInstance.courseInstanceId === current.courseInstanceId
      );
      if (courseInstanceIndex === -1) {
        // add new courseInstance
        acc.push({
          courseInstanceId: current.courseInstanceId,
          classes: [current.id],
        });
      } else {
        // add class to existing courseInstance
        acc[courseInstanceIndex].classes.push(current.id);
      }
      return acc;
    }, []);

    const backendData = { courseInstances: [...finalTableData] };

    if (tableRegistered.state) {
      // PUT request to update student's schedule
      axios
        .put(
          ADMIN_URL +
            `/view/register/update?studentId=${authContext.id}&tableId=${tableRegistered.tableId}`,
          backendData,
          config
        )
        .then((res) => {
          console.log(res.data);
          setTableData(res.data.classes);
          setTableRegistered({ state: true, tableId: res.data.id });
          setUserUX((prev) => ({
            ...prev,
            tableSubmit: {
              loading: false,
              error: false,
              errorMsg: "",
            },
          }));
        })
        .catch((err) => {
          console.log(err);
          setUserUX((prev) => ({
            ...prev,
            tableSubmit: {
              loading: false,
              error: true,
              errorMsg: "error in table submit",
            },
          }));
        });
    } else {
      // POST request to create a new student schedule
      axios
        .post(
          ADMIN_URL +
            `/view/register?studentId=${studentId}&semesterId=decc46ba-7d4b-11ed-a1eb-0242ac120002`,
          backendData,
          config
        )
        .then((res) => {
          console.log(res.data);
          setTableData(res.data.classes);
          setTableRegistered({ state: true, tableId: res.data.id });
          setUserUX((prev) => ({
            ...prev,
            tableSubmit: {
              loading: false,
              error: false,
              errorMsg: "",
            },
          }));
        })
        .catch((err) => {
          console.log(err);
          setUserUX((prev) => ({
            ...prev,
            tableSubmit: {
              loading: false,
              error: true,
              errorMsg: "error in table submit",
            },
          }));
        });
    }

    setUserUX((prev) => ({
      ...prev,
      tableSubmit: { loading: true, error: false, errorMsg: "" },
    }));
  };

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
        options={
          <Dropdown className="sidebarBtn" autoClose={true}>
            <Dropdown.Toggle id="dropdown-autoclose-true">
              {i18next.language === "en" ? "Level" : "المستوى"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {userUX.loading && <Dropdown.Item>Loading...</Dropdown.Item>}
              {levels.map((item) => {
                return (
                  <Dropdown.Item className="sidebarBtn-list" key={item.id}>
                    <Link>
                      {i18next.language === "en"
                        ? item.englishName
                        : item.arabicName}
                    </Link>
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        }
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
        <CoursesTable
          tableTitle={"levels.table"}
          headerItems={[
            { id: 1, title: t(`courses.name`), name: "name" },
            { id: 2, title: t(`common.day`), name: "day" },
            { id: 3, title: t(`table.start`), name: "startPeriod" },
            { id: 4, title: t(`table.end`), name: "endPeriod" },
            { id: 5, title: t(`table.doctor`), name: "professor" },
            { id: 6, title: t(`table.hall`), name: "place" },
          ]}
          courses={courses}
          courseInstances={courseInstancesIds}
          levels={levels}
          userUX={userUX.courses}
          addCourseToTable={addCourseToTable}
          removeCourseFromTable={removeCourseFromTable}
        />
        <div className={styles.tableCont}>
          <DayPeriodTable
            cellsSetter={handleCellsSetter}
            tableData={tableData}
            saveTableData={saveTableData}
            occupiedCellClick={() => {}}
            emptyCellClick={() => {}}
            readOnly={true}
            userUX={userUX.table}
          />
        </div>
      </SidebarContainer>
    </>
  );
};
