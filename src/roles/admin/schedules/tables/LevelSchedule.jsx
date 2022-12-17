import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios";
import { BASE_URL } from "../../../../shared/API";
import cookies from "js-cookie";
import styles from "../../../../components/table/schedule/DayPeriodTable.module.scss";

// Reusable Components
import { Dropdown } from "react-bootstrap";
import { DayPeriodTable } from "../../../../components/table/schedule/DayPeriodTable";
import { ModalPopup } from "../../../../components/popups/ModalPopup";
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { TablePopup } from "./TablePopup";

export const LevelSchedule = () => {
  const [tableData, setTableData] = useState([]);
  const [levels, setLevels] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState();
  const [showModal, setShowModal] = useState({
    add: { state: false, data: null },
    edit: { state: false, data: null },
  });
  const { levelId } = useParams();
  const endsAtRef = useRef();
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
        console.log(res.data);
        setTableData(res.data.classes);
      })
      .catch((error) => {
        console.log(error);
      });

    setLevels(authContext.program.levels);
    // eslint-disable-next-line
  }, [authContext.program.id, levelId]);

  const emptyCellClick = (cell, availableCells) => {
    setShowModal((current) => {
      return {
        ...current,
        add: {
          state: true,
          data: { cellData: cell, availableCells: availableCells },
        },
      };
    });
  };

  const occupiedCellClick = (subject, availableCells) => {
    setShowModal((current) => {
      return {
        ...current,
        edit: {
          state: true,
          data: { cellData: subject, availableCells: availableCells },
        },
      };
    });
  };

  const handlePopupSubmit = () => {
    console.log("hi");
  };

  const saveTableData = (event, item) => {
    event.preventDefault();
    console.log(item);
  };

  return (
    <>
      <FormNavbarContainer>
        <div className={styles.tableContainer_level}>
          <Dropdown>
            {levels
              .filter((item) => item.id === levelId)
              .map((level) => {
                return (
                  <Dropdown.Toggle key={level.id}>
                    {level.level}&nbsp;-&nbsp;
                    {currentLanguageCode === "en"
                      ? level.englishName
                      : level.arabicName}
                  </Dropdown.Toggle>
                );
              })}
            <Dropdown.Menu className={styles.tableContainer_level_menu}>
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
          tableData={tableData}
          emptyCellClick={emptyCellClick}
          occupiedCellClick={occupiedCellClick}
          saveTableData={saveTableData}
        />
      </FormNavbarContainer>
      {showModal.add.state && (
        <TablePopup
          title={"add subject to table"}
          close={() => {
            setShowModal((current) => {
              return {
                ...current,
                add: { state: false, data: null },
              };
            });
          }}
          state={"add"}
          submit={handlePopupSubmit}
          cellData={showModal.add.data}
        />
      )}
      {showModal.edit.state && (
        <TablePopup
          title={"edit subject"}
          close={() => {
            setShowModal((current) => {
              return {
                ...current,
                edit: { state: false, data: null },
              };
            });
          }}
          state={"edit"}
          submit={handlePopupSubmit}
          cellData={showModal.edit.data}
        />
      )}
    </>
  );
};
