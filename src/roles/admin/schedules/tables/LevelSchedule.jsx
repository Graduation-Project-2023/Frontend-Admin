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
import { ModalPopup } from "../../../../components/popups/ModalPopup";
import { TablePopup } from "./TablePopup";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";

export const LevelSchedule = () => {
  const [tableId, setTableId] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [levelCourses, setLevelCourses] = useState([]);
  const [levels, setLevels] = useState([]);
  const [cells, setCells] = useState({ occupied: [], available: [] });
  // eslint-disable-next-line
  const [userUX, setUserUX] = useState({
    table: { loading: false, error: false, errorMsg: "" },
    regCourses: { loading: false, error: false, errorMsg: "" },
    levels: { loading: false, error: false, errorMsg: "" },
    levelTableCreate: { loading: false, error: false, errorMsg: "" },
    form: { loading: false, success: false, error: false, errorMsg: "" },
  });
  const [showModal, setShowModal] = useState({
    add: { state: false, data: null },
    edit: { state: false, data: null },
  });
  const navigate = useNavigate();
  const { levelId } = useParams();
  const authContext = useAuth();
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    setUserUX((prev) => ({
      ...prev,
      table: { loading: true, error: false, errorMsg: "" },
    }));
    // GET request to get table data by it's level and semester id
    axios
      .get(
        BASE_URL +
          `/classes_tables/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}/${levelId}`
      )
      .then((res) => {
        setTableData(res.data.classes);
        setTableId(res.data.id);
        setUserUX((prev) => ({
          ...prev,
          table: { ...prev.table, loading: false },
        }));
      })
      .catch((error) => {
        console.log(error);
        setUserUX((prev) => ({
          ...prev,
          table: { loading: false, error: true, errorMsg: "table error" },
        }));
      });
    setLevels(authContext.program.levels);
    // eslint-disable-next-line
  }, [authContext.program.id, levelId]);

  useEffect(() => {
    setUserUX((prev) => ({
      ...prev,
      regCourses: { loading: true, error: false, errorMsg: "" },
    }));
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
        setUserUX((prev) => ({
          ...prev,
          regCourses: { ...prev.regCourses, loading: false },
        }));
      })
      .catch((error) => {
        setUserUX((prev) => ({
          ...prev,
          regCourses: {
            loading: false,
            error: true,
            errorMsg: "courses error",
          },
        }));
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      setLevelCourses(courses.filter((course) => course.levelId === levelId));
    }
  }, [levelId, courses]);

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

  const handlePopupSubmit = (subject, state) => {
    if (state === "edit") {
      setTableData(
        tableData.map((obj) => (obj.id === subject.id ? subject : obj))
      );
    }
    if (state === "add") {
      setTableData([...tableData, subject]);
    }
  };

  const handleSubjectDelete = (id) => {
    setTableData(tableData.filter((obj) => obj.id !== id));
  };

  const handleDropDownClick = (event, id) => {
    event.preventDefault();
    setUserUX((prev) => ({
      ...prev,
      levels: { loading: true, error: false, errorMsg: "" },
    }));
    // GET request to get all levels that have a table created
    axios
      .get(
        BASE_URL +
          `/classes_tables/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}`
      )
      .then((res) => {
        setUserUX((prev) => ({
          ...prev,
          levels: { ...prev.levels, loading: false },
        }));
        if (res.data.map((obj) => obj.level.id).includes(id)) {
          navigate(`/admin_portal/study_schedules/tables/${id}`);
        } else {
          setUserUX((prev) => ({
            ...prev,
            levelTableCreate: { loading: true, error: false, errorMsg: "" },
          }));
          const levelTableData = {
            academicSemesterId: "decc46ba-7d4b-11ed-a1eb-0242ac120002",
            programId: authContext.program.id,
            levelId: id,
            classes: [],
          };
          axios
            .post(
              BASE_URL +
                `/classes_tables/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}`,
              levelTableData
            )
            .then((res) => {
              setUserUX((prev) => ({
                ...prev,
                levelTableCreate: { ...prev.levelTableCreate, loading: false },
              }));
              navigate(`/admin_portal/study_schedules/tables/${id}`);
            })
            .catch((error) => {
              console.log(error);
              setUserUX((prev) => ({
                ...prev,
                levelTableCreate: {
                  loading: false,
                  error: true,
                  errorMsg: "level table create error",
                },
              }));
            });
        }
      })
      .catch((error) => {
        setUserUX((prev) => ({
          ...prev,
          levels: {
            loading: false,
            error: true,
            errorMsg: "levels erro",
          },
        }));
        console.log(error);
      });
  };

  const saveTableData = (event) => {
    event.preventDefault();
    const levelTableData = {
      classes: tableData.map(
        ({
          labCount,
          startDate,
          endDate,
          id,
          levelId,
          englishName,
          arabicName,
          hasLectureGroups,
          lectureCount,
          lectureGroupCount,
          labGroupCount,
          sectionGroupCount,
          lectureHrs,
          labHrs,
          sectionHrs,
          ...rest
        }) => rest
      ),
    };
    setUserUX((prev) => ({
      ...prev,
      form: { loading: true, success: false, error: false, errorMsg: "" },
    }));
    // PUT request to update the table data by it's level and semester id
    axios
      .put(
        BASE_URL +
          `/classes_tables/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}/${tableId}`,
        levelTableData
      )
      .then((res) => {
        setUserUX((prev) => ({
          ...prev,
          form: { ...prev.form, loading: false, success: true },
        }));
      })
      .catch((error) => {
        setUserUX((prev) => ({
          ...prev,
          form: {
            ...prev.form,
            loading: false,
            error: true,
            errorMsg: "table save error",
          },
        }));
        console.log(error.response.data.message);
      });
  };

  const closeFormSubmitModal = () => {
    setUserUX((prev) => ({
      ...prev,
      form: { ...prev.form, success: false, error: false, errorMsg: "" },
    }));
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
                    onClick={(event) => {
                      handleDropDownClick(event, level.id);
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
          subjectDelete={handleSubjectDelete}
          cellData={showModal.add.data}
          availableCells={cells.available}
          courses={{ registered: tableData, notRegistered: levelCourses }}
          userUX={userUX.regCourses}
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
          subjectDelete={handleSubjectDelete}
          cellData={showModal.edit.data}
          availableCells={cells.available}
          courses={{ registered: tableData, notRegistered: levelCourses }}
          userUX={userUX.regCourses}
        />
      )}
      {userUX.form.success && (
        <ModalPopup
          message={{
            state: true,
            icon: <BsFillPersonCheckFill />,
            title: "popup.success",
            text: "popup.message_success",
            button: "common.save",
            handleClick: closeFormSubmitModal,
          }}
          closeModal={closeFormSubmitModal}
        />
      )}
      {userUX.form.error && (
        <ModalPopup
          message={{
            state: true,
            icon: <MdErrorOutline />,
            title: "popup.error",
            text: userUX.form.errorMsg,
            button: "common.continue",
            handleClick: closeFormSubmitModal,
          }}
          error={true}
          closeModal={closeFormSubmitModal}
        />
      )}
    </FormNavbarContainer>
  );
};
