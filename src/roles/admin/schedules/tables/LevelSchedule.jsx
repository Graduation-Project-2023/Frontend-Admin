import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  const [tableData, setTableData] = useState([
    {
      englishName: "English",
      arabicName: "لغة انجليزية",
      startPeriod: 3,
      endPeriod: 5,
      classType: "LECTURE",
      day: "MONDAY",
    },
    {
      englishName: "Advanced English 2",
      arabicName: "2 لغة انجليزية متقدمة",
      startPeriod: 7,
      endPeriod: 9,
      classType: "LAB",
      day: "TUESDAY",
    },
    {
      englishName: "Advanced English",
      arabicName: "لغة انجليزية متقدمة",
      startPeriod: 1,
      endPeriod: 4,
      classType: "LAB",
      day: "TUESDAY",
    },
  ]);

  const [levels, setLevels] = useState([]);
  const [cells, setCells] = useState({ occupied: [], available: [] });
  // eslint-disable-next-line
  const [userUX, setUserUX] = useState(true);
  const [showModal, setShowModal] = useState({
    add: { state: false, data: null },
    edit: { state: false, data: null },
  });
  const { levelId } = useParams();
  const authContext = useAuth();
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    // GET request to get table data by it's level and semester id
    // axios
    //   .get(
    //     BASE_URL +
    //       `/classes_tables/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}/${levelId}`
    //   )
    //   .then((res) => {
    //     console.log(res.data.classes);
    //     setTableData(res.data.classes);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    setLevels(authContext.program.levels);
    // eslint-disable-next-line
  }, [authContext.program.id, levelId]);

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
          data: { cellData: cell, availableCells: cells.available },
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
          data: { cellData: subject, availableCells: cells.available },
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
    <>
      <FormNavbarContainer>
        <div className={styles.tableContainer_level}>
          <Dropdown className="customDropMenu">
            {levels
              .filter((item) => item.id === levelId)
              .map((level) => {
                return (
                  <Dropdown.Toggle
                    key={level.id}
                    className="customDropMenu-btn"
                  >
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
                    <Dropdown.Item key={level.id}>
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
      </FormNavbarContainer>
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
        />
      )}
    </>
  );
};
