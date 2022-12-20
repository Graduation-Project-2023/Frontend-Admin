import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ScheduleTableDays,
  ScheduleTableHeader,
} from "../../../../components/table/schedule/DayPeriodData";
import cookies from "js-cookie";

// Reusable Components
import { ModalPopup } from "../../../../components/popups/ModalPopup";
import { DropdownSearch } from "../../../../components/forms/DropdownSearch";

export const TablePopup = (props) => {
  const [cellData, setCellData] = useState(props.cellData.cellData);
  const [period, setPeriod] = useState({ startPeriod: 0, endPeriod: 0 });
  const [userUX, setUserUX] = useState({ cellOccupied: false });
  const [availableCells, setAvailableCells] = useState([]);
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    let availableCells = [];
    availableCells = props.cellData.availableCells;
    if (props.edit && availableCells.length > 0) {
      for (let i = 0; i < cellData.endPeriod - cellData.startPeriod + 1; i++) {
        const cellFound = availableCells.some((cell) => {
          if (
            cell.period === cellData.startPeriod + i &&
            cell.day === cellData.day
          ) {
            return true;
          } else {
            return false;
          }
        });
        if (!cellFound) {
          availableCells.push({
            period: cellData.startPeriod + i,
            day: cellData.day,
          });
        }
      }
    }
    console.log(availableCells);
    setAvailableCells(availableCells);
    // eslint-disable-next-line
  }, [props.cellData.availableCells, props.cellData.cellData]);

  useEffect(() => {
    setCellData(props.cellData.cellData);
    setPeriod({
      startPeriod: cellData.startPeriod,
      endPeriod: cellData.endPeriod,
    });
    // eslint-disable-next-line
  }, [props.cellData.cellData]);

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "day") {
      setPeriod({
        startPeriod: null,
        endPeriod: null,
      });
    }
    setCellData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handlePeriodChange = (e) => {
    const value = +e.target.value;
    if (
      availableCells
        .filter((item) => item.day === cellData.day)
        .find(
          (cell) =>
            cell.period === value + cellData.endPeriod - cellData.startPeriod
        ) === undefined
    ) {
      setUserUX({ cellOccupied: true });
    } else {
      setUserUX({ cellOccupied: false });
      setPeriod({
        startPeriod: value,
        endPeriod: value + cellData.endPeriod - cellData.startPeriod,
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.submit();
  };

  return (
    <ModalPopup
      title={props.title}
      closeModal={() => {
        props.close();
      }}
      child={true}
    >
      <form
        onSubmit={(event) => {
          handleFormSubmit(event);
        }}
      >
        <div className="row">
          <div className="form-group col-md-6">
            <label>{t(`courses.name`)}</label>
            {props.edit ? (
              <input
                type="text"
                className="form-control"
                value={
                  currentLanguageCode === "en"
                    ? cellData.englishName || ""
                    : cellData.arabicName || ""
                }
                disabled
                readOnly
              />
            ) : (
              <DropdownSearch
                name={{ arabicName: "ahmed" }}
                menuData={[]}
                label={"courses.name"}
                inputPlaceholder={"common.select"}
              />
            )}
          </div>
          <div className="form-group col-md-6">
            <label>{t(`table.classType`)}</label>
            {props.edit ? (
              <input
                type="text"
                className="form-control"
                value={t(`common.${cellData.classType.toLowerCase()}`) || ""}
                name="classType"
                disabled
                readOnly
              />
            ) : (
              <select name="classType" className="form-select">
                <option value={null}>{t(`common.select`)}</option>
                <option value="LECTURE">{t(`lecture`)}</option>
                <option value="LAB">{t(`lab`)}</option>
              </select>
            )}
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-4">
            <label>{t(`common.day`)}</label>
            {props.edit ? (
              <select
                type="text"
                className="form-select"
                name="day"
                onChange={handleEditFormChange}
                value={cellData?.day || ""}
              >
                {ScheduleTableDays.map((day) => (
                  <option key={day.id} value={day.value}>
                    {t(`week.${day.title}`)}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name="day"
                className="form-control"
                value={t(`week.${cellData.day.toLowerCase()}`)}
                disabled
                readOnly
              />
            )}
          </div>
          <div className="form-group col-md-4">
            <label>{t(`table.start`)}</label>
            {props.edit ? (
              <select
                type="text"
                className="form-select"
                name="startPeriod"
                onChange={handlePeriodChange}
                value={period.startPeriod || ""}
              >
                {period.startPeriod === null && (
                  <option value={null}>{t(`common.select`)}</option>
                )}

                {availableCells
                  .filter((item) => item.day === cellData.day)
                  .sort(function (a, b) {
                    return a.period - b.period;
                  })
                  .map((cell) => (
                    <option key={cell.period} value={cell.period}>
                      {ScheduleTableHeader.find(
                        (item) => item.period === cell.period
                      )
                        ?.time.split("-")[0]
                        .trim()}
                    </option>
                  ))}
              </select>
            ) : (
              <input
                type="text"
                name="startAt"
                className="form-control"
                value={cellData.cellNo}
                disabled
                readOnly
              />
            )}
          </div>
          <div className="form-group col-md-4">
            <label>{t(`table.end`)}</label>
            <input
              type="text"
              className="form-control"
              name="endPeriod"
              value={
                period.endPeriod === null
                  ? "choose start period first"
                  : ScheduleTableHeader.find(
                      (item) => item.period === period?.endPeriod
                    )
                      ?.time.split("-")[1]
                      ?.trim() || cellData.endPeriod
              }
              disabled
            />
            {/* {availableCells
                .filter((item) => item.day === cellData?.day)
                .sort(function (a, b) {
                  return a.period - b.period;
                })
                .map((cell) => (
                  <option key={cell.period} value={cell.period}>
                    {ScheduleTableHeader.find(
                      (item) => item.period === cell.period
                    )
                      ?.time.split("-")[1]
                      .trim()}
                  </option>
            //     ))} */}
            {/* // </input> */}
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-6">
            <label>{t(`table.place`)}</label>
            <select name="place" className="form-select">
              <option value="1">{t(`common.select`)}</option>
              <option value="2">{t(`el mkaan`)}</option>
              <option value="3">{t(`el mkaan`)}</option>
            </select>
          </div>
          <div className="form-group col-md-6">
            <label>{t(`table.studentNo`)}</label>
            <input type="number" className="form-control" />
          </div>
        </div>
        {userUX.cellOccupied && (
          <h1>CHOOSE ANOTHER CELL THIS CELL IS OCCUPIED</h1>
        )}
        <div
          className="btn btn-primary"
          // onClick={TestingAddSubject}
        >
          <button type="submit">Add Subject Here</button>
        </div>
      </form>
    </ModalPopup>
  );
};
