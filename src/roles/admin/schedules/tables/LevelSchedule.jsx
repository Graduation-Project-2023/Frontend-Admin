import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios";
import { BASE_URL } from "../../../../shared/API";
import cookies from "js-cookie";
import styles from "../../../../components/table/schedule/DayPeriodTable.module.scss";

// Reusable Components
import { Dropdown } from "react-bootstrap";
import { DayPeriodTable } from "../../../../components/table/schedule/DayPeriodTable";
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { TablePopup } from "./TablePopup";

export const LevelSchedule = () => {
  const [tableData, setTableData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [levelCourses, setLevelCourses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [cells, setCells] = useState({ occupied: [], available: [] });
  // eslint-disable-next-line
  const [userUX, setUserUX] = useState(true);
  const [showModal, setShowModal] = useState({
    add: { state: false, data: null },
    edit: { state: false, data: null },
  });
  const navigate = useNavigate();
  const { levelId } = useParams();
  const authContext = useAuth();
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    // GET request to get table data by it's level and semester id
    axios
      .get(
        BASE_URL +
          `/classes_tables/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}/${levelId}`
      )
      .then((res) => {
        setTableData(res.data.classes);
      })
      .catch((error) => {
        console.log(error);
      });
    setLevels(authContext.program.levels);
    // eslint-disable-next-line
  }, [authContext.program.id, levelId]);

  useEffect(() => {
    // GET request to get all program courses that are registered on the current level
    axios
      .get(
        BASE_URL +
          `/course_instances/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}`
      )
      .then((res) => {
        setCourses(res.data);
        setLevelCourses(
          res.data.filter((course) => course.levelId === levelId)
        );
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      setLevelCourses(courses.filter((course) => course.levelId === levelId));
    }
  }, [levelId, courses]);

  // useEffect(() => {
  //   console.log(cells.available);
  // }, [cells.available]);

  const handleCellsSetter = (occupiedCells, availableCells) => {
    setCells((current) => {
      return {
        ...current,
        occupied: occupiedCells,
        available: availableCells,
      };
    });
  };

  const emptyCellClick = (cell) => {
    setShowModal((current) => {
      return {
        ...current,
        add: {
          state: true,
          data: { cellData: cell },
        },
      };
    });
  };

  const occupiedCellClick = (subject) => {
    setShowModal((current) => {
      return {
        ...current,
        edit: {
          state: true,
          data: { cellData: subject },
        },
      };
    });
  };

  const handlePopupSubmit = (subject) => {
    const subjectExists = tableData.find(
      (element) =>
        element.englishName === subject.englishName &&
        element.classType === subject.classType
    );
    if (subjectExists) {
      setTableData(
        tableData.map((obj) =>
          obj.englishName === subject.englishName &&
          obj.classType === subject.classType
            ? subject
            : obj
        )
      );
    } else {
      setTableData((prev) => [...prev, subject]);
    }
  };

  const saveTableData = (event, item) => {
    event.preventDefault();
  };

  return (
    <FormNavbarContainer>
      <div className={styles.tableContainer_level}>
        <Dropdown className="customDropMenu">
          {levels
            .filter((item) => item.id === levelId)
            .map((level) => {
              return (
                <Dropdown.Toggle key={level.id} className="customDropMenu-btn">
                  {level.level}&nbsp;-&nbsp;
                  {currentLanguageCode === "en"
                    ? level.englishName
                    : level.arabicName}
                </Dropdown.Toggle>
              );
            })}
          <Dropdown.Menu className="customDropMenu-list">
            {levels
              .filter((item) => item.id !== levelId)
              .map((level) => {
                return (
                  <Dropdown.Item
                    key={level.id}
                    onClick={() => {
                      navigate(
                        `/admin_portal/study_schedules/tables/${level.id}`
                      );
                    }}
                  >
                    {level.level}&nbsp;-&nbsp;
                    {currentLanguageCode === "en"
                      ? level.englishName
                      : level.arabicName}
                  </Dropdown.Item>
                );
              })}
          </Dropdown.Menu>
        </Dropdown>
        <h6>
          {currentLanguageCode === "en"
            ? authContext.program.englishName
            : authContext.program.arabicName}
        </h6>
      </div>

      <DayPeriodTable
        cellsSetter={handleCellsSetter}
        tableData={tableData}
        emptyCellClick={emptyCellClick}
        occupiedCellClick={occupiedCellClick}
        saveTableData={saveTableData}
      />
      {showModal.add.state && (
        <TablePopup
          title={"table.add"}
          close={() => {
            setShowModal((current) => {
              return {
                ...current,
                add: { state: false, data: null },
              };
            });
          }}
          submit={handlePopupSubmit}
          cellData={showModal.add.data}
          availableCells={cells.available}
          courses={{ registered: tableData, notRegistered: levelCourses }}
        />
      )}
      {showModal.edit.state && (
        <TablePopup
          title={"table.edit"}
          close={() => {
            setShowModal((current) => {
              return {
                ...current,
                edit: { state: false, data: null },
              };
            });
          }}
          edit={true}
          submit={handlePopupSubmit}
          cellData={showModal.edit.data}
          availableCells={cells.available}
          courses={{ registered: tableData, notRegistered: levelCourses }}
        />
      )}
    </FormNavbarContainer>
  );
};
