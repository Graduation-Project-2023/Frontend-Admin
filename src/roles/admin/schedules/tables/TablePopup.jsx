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
  const [courses, setCourses] = useState({ registered: [], notRegistered: [] });
  const [period, setPeriod] = useState({ startPeriod: 0, endPeriod: 0 });
  const [userUX, setUserUX] = useState({
    error: false,
    errorMsg: "",
  });
  const [availableCells, setAvailableCells] = useState([]);
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get("i18next") || "en";

  useEffect(() => {
    let cellsAvailable = [...props.availableCells];
    if (props.edit && cellsAvailable.length > 0) {
      for (let i = 0; i < cellData.endPeriod - cellData.startPeriod + 1; i++) {
        const cellFound = cellsAvailable.some((cell) => {
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
          cellsAvailable.push({
            period: cellData.startPeriod + i,
            day: cellData.day,
          });
        }
      }
    }

    setAvailableCells(cellsAvailable);
    // eslint-disable-next-line
  }, [props.cellData.cellData]);

  useEffect(() => {
    if (props.edit) {
      setCellData(props.cellData.cellData);
      setPeriod({
        startPeriod: cellData.startPeriod,
        endPeriod: cellData.endPeriod,
      });
    } else {
      setCellData({
        startPeriod: props.cellData.cellData.cellNo,
        day: props.cellData.cellData.day,
      });
      setPeriod({
        startPeriod: props.cellData.cellData.cellNo,
        endPeriod: 0,
      });
    }
    // eslint-disable-next-line
  }, [props.cellData.cellData]);

  useEffect(() => {
    setCourses(props.courses);
  }, [props.courses]);

  const findCellAvailable = (value, classHrs) => {
    const dayAvailableCells = availableCells.filter(
      (item) => item.day === cellData.day
    );
    let cellOccupied = false;
    for (let i = 0; i < classHrs + 1; i++) {
      const cellFound = dayAvailableCells.some((cell) => {
        if (cell.period === +value + i) {
          return true;
        } else {
          return false;
        }
      });
      if (!cellFound) {
        cellOccupied = true;
        break;
      }
    }
    if (cellOccupied) {
      setUserUX({
        error: true,
        errorMsg: "This Cell is Occupied",
      });
    } else {
      setUserUX({ error: false, errorMsg: "" });
      setPeriod({
        startPeriod: +value,
        endPeriod: +value + +classHrs,
      });
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "day") {
      setPeriod({
        startPeriod: 0,
        endPeriod: 0,
      });
    } else if (name === "classType") {
      const classHrs = value === "LECTURE" ? 3 * 2 - 1 : 2 * 2 - 1;
      findCellAvailable(cellData.startPeriod, classHrs);
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
    if (props.edit) {
      findCellAvailable(value, cellData.endPeriod - cellData.startPeriod);
    } else {
      if (cellData.classType === "LECTURE" || cellData.classType === "LAB") {
        const classHrs =
          cellData.classType === "LECTURE" ? 3 * 2 - 1 : 2 * 2 - 1;
        findCellAvailable(value, classHrs);
      } else {
        setUserUX({
          error: true,
          errorMsg: "Select a Class Type First",
        });
      }
    }
  };

  const handleSubjectSelection = (item) => {
    setCellData((prev) => {
      return {
        ...prev,
        ...item,
      };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      userUX.cellOccupied ||
      period.startPeriod === 0 ||
      period.endPeriod === 0
    ) {
      setUserUX({ error: true, errorMsg: "please select valid inputs" });
      return;
    }
    if (props.edit) {
      const editedData = {
        ...cellData,
        startPeriod: period.startPeriod,
        endPeriod: period.endPeriod,
      };
      props.submit(editedData, "edit");
      props.close();
    } else {
      const courseCount = courses.registered.filter(
        (item) =>
          item.courseInstanceId === cellData.id &&
          item.classType === cellData.classType
      ).length;
      const maxCourseCount =
        cellData.classType === "LECTURE"
          ? cellData.lectureCount
          : cellData.labCount;
      if (courseCount < maxCourseCount) {
        const newCourse = {
          ...cellData,
          startPeriod: period.startPeriod,
          endPeriod: period.endPeriod,
          courseInstanceId: cellData.id,
          endDate: null,
          startDate: null,
          id: Date.now(),
        };
        props.submit(newCourse, "add");
        props.close();
      } else {
        setUserUX({
          error: true,
          errorMsg: "Course Count is Full",
        });
      }
    }
  };

  return (
    <ModalPopup
      title={props.title}
      closeModal={() => {
        props.close();
      }}
      form={{ state: true }}
    >
      <form
        onSubmit={(event) => {
          handleFormSubmit(event);
        }}
      >
        <div className="row mb-3">
          <div className="col-md-6">
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
                name={{
                  englishName: cellData.englishName,
                  arabicName: cellData.arabicName,
                }}
                menuData={courses.notRegistered}
                label={"courses.name"}
                inputPlaceholder={"common.select"}
                handleListClick={handleSubjectSelection}
              />
            )}
          </div>
          <div className="col-md-6">
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
            ) : cellData?.arabicName === undefined ? (
              <input
                type="text"
                className="form-control"
                value={"pls select a subject"}
                disabled
                readOnly
              />
            ) : (
              <select
                name="classType"
                className="form-select"
                onChange={handleEditFormChange}
                value={cellData?.classType || ""}
              >
                <option value={null}>{t(`common.select`)}</option>
                <option value="LECTURE">{t(`common.lecture`)}</option>
                {cellData?.labCount > 0 && (
                  <option value="LAB">{t(`common.lab`)}</option>
                )}
              </select>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
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
          <div className="col-md-4">
            <label>{t(`table.start`)}</label>
            <select
              type="text"
              className="form-select"
              name="startPeriod"
              required
              onChange={handlePeriodChange}
              value={period.startPeriod || ""}
            >
              {period.startPeriod === 0 && (
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
          </div>
          <div className="col-md-4">
            <label>{t(`table.end`)}</label>
            <input
              type="text"
              className="form-control"
              name="endPeriod"
              value={
                period.endPeriod === 0
                  ? "choose start period first"
                  : ScheduleTableHeader.find(
                      (item) => item.period === period?.endPeriod
                    )
                      ?.time.split("-")[1]
                      ?.trim() || cellData.endPeriod
              }
              disabled
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>{t(`table.place`)}</label>
            <select name="place" className="form-select">
              <option value="1">{t(`common.select`)}</option>
              <option value="2">{t(`el mkaan`)}</option>
              <option value="3">{t(`el mkaan`)}</option>
            </select>
          </div>
          <div className="col-md-6">
            <label>{t(`table.studentNo`)}</label>
            <input type="number" className="form-control" />
          </div>
        </div>
        {userUX.error && <h1>{userUX.errorMsg}</h1>}
        <div

        // onClick={TestingAddSubject}
        >
          <button
            type="submit"
            onClick={handleFormSubmit}
            className="form-card-button-save"
          >
            Add Subject Here
          </button>
          <button
            type="button"
            className="form-card-button-cancel"
            onClick={() => {
              props.close();
            }}
          >
            exit
          </button>
          {props.edit && (
            <button
              type="button"
              className="form-card-button-cancel"
              onClick={(event) => {
                props.subjectDelete(cellData.id);
                props.close();
              }}
            >
              delete subject from table
            </button>
          )}
        </div>
      </form>
    </ModalPopup>
  );
};
