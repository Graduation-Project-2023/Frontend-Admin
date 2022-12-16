import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios";
import { BASE_URL } from "../../../../shared/API";
import styles from "../../testing/table.module.scss";
import cookies from "js-cookie";

// Reusable Components
import { Dropdown } from "react-bootstrap";
import { StudyTable } from "../../testing/studytable";
import { ModalPopup } from "../../../../components/popups/ModalPopup";
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";

export const LevelSchedule = () => {
  const [tableData, setTableData] = useState([]);
  const [levels, setLevels] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState();
  const [showModal, setShowModal] = useState({ state: false, data: null });
  const { levelId } = useParams();
  const endsAtRef = useRef();
  const authContext = useAuth();
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    // GET request to get table data by it's level and semester id
    axios
      .get(
        BASE_URL +
          `/classes_tables/semesters/decc46ba-7d4b-11ed-a1eb-0242ac120002/programs/${authContext.program.id}`
      )
      .then((res) => {
        console.log(res);
        // setTableData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // GET request to get all levels of a specific program
    axios
      .get(BASE_URL + `/programs/${authContext.program.id}/levels`)
      .then((res) => {
        setLevels(res.data);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
    // eslint-disable-next-line
  }, [authContext.program.id, levelId]);

  const emptyCellClick = (item) => {
    console.log(item);
  };

  const occupiedCellClick = (item) => {
    console.log(item);
  };

  return (
    <div className="container">
      <FormNavbarContainer>
        <div className={styles.tableContainer}>
          <div className={styles.tableContainer_level}>
            <Dropdown>
              {levels
                .filter((item) => item.id === levelId)
                .map((level) => {
                  return (
                    <Dropdown.Toggle key={level.id}>
                      {currentLanguageCode === "en"
                        ? level.englishName
                        : level.arabicName}
                      - {level.code}
                    </Dropdown.Toggle>
                  );
                })}
              <Dropdown.Menu className={styles.tableContainer_level_menu}>
                {levels
                  .filter((item) => item.id != levelId)
                  .map((level) => {
                    return (
                      <Dropdown.Item key={level.id}>
                        {" "}
                        {currentLanguageCode === "en"
                          ? level.englishName
                          : level.arabicName}
                        - {level.code}
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
        </div>
        <StudyTable
          tableData={tableData}
          emptyCellClick={emptyCellClick}
          occupiedCellClick={occupiedCellClick}
        />
      </FormNavbarContainer>
      {showModal.state && (
        <ModalPopup
          title={"add to table"}
          closeModal={() => {
            setShowModal({ state: false });
          }}
          form={{ state: true }}
        >
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-center">
                <h5>Day: {showModal.data.day}</h5>
              </div>
              <div className="d-flex justify-content-center">
                <h5>Period {showModal.data.startPeriod}</h5>
              </div>
              <div>
                Ends at : <input ref={endsAtRef} type="number" />
                <div
                  className="btn btn-primary"
                  // onClick={TestingAddSubject}
                >
                  Add Subject Here
                </div>
              </div>
            </div>
          </div>
        </ModalPopup>
      )}
    </div>
  );
};
