import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { CurrentLanguage } from "../../../shared/Language";
import cookies from "js-cookie";
import styles from "./DayPeriodTable.module.scss";
import { ScheduleTableBody, ScheduleTableHeader } from "./DayPeriodData";

export const DayPeriodTable = (props) => {
  const [tableData, setTableData] = useState(props.tableData);
  const [cells, setCells] = useState({ occupied: [], available: [] });
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    setTableData(props.tableData);
  }, [props.tableData]);

  useEffect(() => {
    if (tableData.length === 0) return;
    const occupiedCells = [];
    tableData.forEach((item) => {
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
    setCells((current) => {
      return {
        ...current,
        occupied: occupiedCells,
        available: availableCells,
      };
    });
    props.cellsSetter(occupiedCells, availableCells);
    // eslint-disable-next-line
  }, [tableData]);

  return (
    <form
      onSubmit={(event) => {
        props.saveTableData(event);
      }}
    >
      <div className={styles.tableContainer_tableCard}>
        <div className={styles.tableContainer_tableCard_wrap}>
          <table
            className={`table table-bordered ${styles.tableContainer_tableCard_wrap_scroll}`}
          >
            <thead
              className={styles.tableContainer_tableCard_wrap_scroll_header}
            >
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
                            {t("common.period")}
                          </span>
                          <span className={styles.table_first_cell_down}>
                            {t("common.day")}
                          </span>
                        </>
                      ) : (
                        <h6>
                          {t("common.period")} {item.period}
                        </h6>
                      )}
                      <h6>{item.time}</h6>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {ScheduleTableBody.map((item) => {
                const backendTableFiltered = tableData.filter(
                  (day) => item.day === day.day
                );
                return (
                  <tr key={item.id}>
                    <td
                      className={
                        styles.tableContainer_tableCard_wrap_scroll_days
                      }
                    >
                      {t(`week.${item.day.toLowerCase()}`)}
                    </td>
                    {item.cells.map((cell) => {
                      const cellFilter = backendTableFiltered.filter(
                        (obj) => obj.startPeriod === cell.period
                      );
                      if (cellFilter.length !== 0) {
                        return cellFilter.length === 1 ? (
                          <td
                            key={cell.period}
                            onClick={(event) => {
                              props.occupiedCellClick(cellFilter[0]);
                            }}
                            className={styles.filled_cell}
                            colSpan={
                              cellFilter[0].endPeriod -
                              cellFilter[0].startPeriod +
                              1
                            }
                          >
                            <h6 key={cellFilter[0].id}>
                              {currentLanguageCode === "en"
                                ? cellFilter[0].englishName
                                : cellFilter[0].arabicName}
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
                                  style={{
                                    borderBottom: "1px solid black",
                                  }}
                                  onClick={(event) => {
                                    props.occupiedCellClick(item);
                                  }}
                                >
                                  {item.arabicName}
                                </div>
                              );
                            })}
                          </td>
                        );
                      } else if (
                        cells.occupied.filter(
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
                              props.emptyCellClick({
                                cellNo: cell.period,
                                day: item.day,
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
        </div>
      </div>
      <button type="submit" className="form-card-button form-card-button-save">
        {t(`common.save`)}
      </button>
      <button type="reset" className="form-card-button form-card-button-cancel">
        {t(`common.cancel`)}
      </button>
    </form>
  );
};
