import { useEffect, useState, useRef } from "react";
import styles from "./table.module.scss";
import {
  ScheduleTableBody,
  ScheduleTableHeader,
  BackendData,
} from "./studytabledata";
import { ModalPopup } from "../../../components/popups/ModalPopup";

export const StudyTable = (props) => {
  const [cellsOccupied, setCellsOccupied] = useState([]);
  const [cellsAvailable, setCellsAvailable] = useState([]);
  const [showModal, setShowModal] = useState({ state: false, data: null });
  const [backendTable, setBackendTable] = useState(BackendData);
  const endsAtRef = useRef();

  useEffect(() => {
    const occupiedCells = [];
    backendTable.forEach((item) => {
      for (let i = item.startPeriod; i <= item.endPeriod; i++) {
        occupiedCells.push({ period: i, day: item.day });
      }
    });
    let availableCells = [];

    ScheduleTableBody.forEach((item) => {
      for (let i = 1; i <= 20; i++) {
        availableCells.push({ period: i, day: item.day });
      }
    });
    availableCells = availableCells.filter((item) => {
      return !occupiedCells.some((cell) => {
        return cell.period === item.period && cell.day === item.day;
      });
    });
    setCellsAvailable(availableCells);
    console.log(availableCells);
    setCellsOccupied(occupiedCells);
  }, [backendTable]);

  const TestingAddSubject = () => {
    const newSubject = {
      id: "etgaeg",
      day: showModal.data.day,
      startPeriod: showModal.data.startsAt,
      endPeriod: endsAtRef.current.value,
      englishName: "hhhhhhh",
      arabicName: "ههههه",
    };
    setBackendTable((prev) => [...prev, newSubject]);
    setShowModal({ state: false, data: null });
  };

  return (
    <div className={`"d-flex justify-content-center" ${styles.tabletable}`}>
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
                <div className="btn btn-primary" onClick={TestingAddSubject}>
                  Add Subject Here
                </div>
              </div>
            </div>
          </div>
        </ModalPopup>
      )}
      <form>
        <table className="table">
          <thead>
            <tr>
              {ScheduleTableHeader.map((item) => {
                return (
                  <th
                    key={item.period}
                    className={`${
                      item.period === 0
                        ? styles.table_first_cell
                        : "table-container-header"
                    }`}
                  >
                    {item.period === 0 ? (
                      <>
                        <span className={styles.table_first_cell_up}>
                          Period
                        </span>
                        <span className={styles.table_first_cell_down}>
                          Day
                        </span>
                      </>
                    ) : (
                      <h6>period {item.period}</h6>
                    )}
                    <h6>{item.time}</h6>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {ScheduleTableBody.map((item) => {
              const backendTableFiltered = backendTable.filter(
                (day) => item.day === day.day
              );
              return (
                <tr key={item.id}>
                  <td>{item.day}</td>
                  {item.cells.map((cell) => {
                    const cellFilter = backendTableFiltered.filter(
                      (obj) => obj.startPeriod === cell.period
                    );
                    if (cellFilter.length !== 0) {
                      return cellFilter.length === 1 ? (
                        <td
                          key={cell.period}
                          onClick={(event) => {
                            console.log(cellFilter[0]);
                          }}
                          className={styles.filled_cell}
                          colSpan={
                            cellFilter[0].endPeriod -
                            cellFilter[0].startPeriod +
                            1
                          }
                        >
                          <h6 key={cellFilter[0].id}>
                            {cellFilter[0].arabicName}
                          </h6>
                        </td>
                      ) : (
                        <td
                          key={cell.period}
                          colSpan={
                            cellFilter[0].endPeriod -
                            cellFilter[0].startPeriod +
                            1
                          }
                        >
                          {cellFilter.map((item) => {
                            return (
                              <div
                                key={item.id}
                                className={styles.filled_cell}
                                style={{ borderBottom: "1px solid black" }}
                              >
                                {item.arabicName}
                              </div>
                            );
                          })}
                        </td>
                      );
                    } else if (
                      cellsOccupied?.filter(
                        (obj) =>
                          obj.period === cell.period && obj.day === item.day
                      ).length !== 0
                    ) {
                      return null;
                    } else {
                      return (
                        <td
                          key={cell.period}
                          onClick={(event) => {
                            setShowModal({
                              state: true,
                              data: { startPeriod: cell.period, day: item.day },
                            });
                          }}
                          className={styles.empty_cell}
                        ></td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
};
