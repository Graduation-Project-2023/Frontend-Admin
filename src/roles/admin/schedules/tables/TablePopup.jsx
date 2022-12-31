import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ScheduleTableDays,
  ScheduleTableHeader,
  ScheduleTableGroups,
} from "../../../../components/table/schedule/DayPeriodData";
import cookies from "js-cookie";

// Reusable Components
import { ModalPopup } from "../../../../components/popups/ModalPopup";
import { DropdownSearch } from "../../../../components/forms/DropdownSearch";

// Component Props:
// cellData: object {cellData: object, cellNo: number, day: string}
// availableCells: array of objects {period: number, day: string}
// courses: {registered: array of objects, notRegistered: array of objects}
// edit: boolean
// userUX: object {loading, error, errorMsg}
// handleSave: function
// handleClose: function

export const TablePopup = (props) => {
  const [cellData, setCellData] = useState(props.cellData.cellData);
  const [courses, setCourses] = useState({ registered: [], notRegistered: [] });
  const [period, setPeriod] = useState({ startPeriod: 0, endPeriod: 0 });
  const [editToAdd, setEditToAdd] = useState(false);
  const [userUX, setUserUX] = useState({
    loading: false,
    error: false,
    errorMsg: "",
  });
  const [availableCells, setAvailableCells] = useState([]);
  const [classCount, setClassCount] = useState(25);
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

  useEffect(() => {
    setUserUX(props.userUX);
  }, [props.userUX]);

  const findCellAvailable = (value, classHrs) => {
    const dayAvailableCells = availableCells.filter(
      (item) => item.day === cellData.day
    );
    let cellOccupied = false;
    for (let i = 0; i < classHrs; i++) {
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
        endPeriod: +value + +classHrs - 1,
      });
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "select-one") {
      if (value === "NULL") {
        return;
      }
    }
    if (name === "day") {
      setPeriod({
        startPeriod: 0,
        endPeriod: 0,
      });
    } else if (name === "classType") {
      const classHrs =
        value === "LECTURE"
          ? cellData.lectureHrs * 2
          : value === "LAB"
          ? cellData.labHrs * 2
          : cellData.sectionHrs * 2;
      findCellAvailable(cellData.startPeriod, classHrs);
      const classCount =
        value === "LECTURE"
          ? cellData.lectureGroupCount
          : value === "LAB"
          ? cellData.labGroupCount
          : cellData.sectionGroupCount;
      setClassCount(classCount);
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
      if (
        cellData.classType === "LECTURE" ||
        cellData.classType === "LAB" ||
        cellData.classType === "SECTION"
      ) {
        const classHrs =
          value === "LECTURE"
            ? cellData.lectureHrs * 2
            : value === "LAB"
            ? cellData.labHrs * 2
            : cellData.sectionHrs * 2;
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
    setCellData({
      ...item,
      day: cellData.day,
      startPeriod: cellData.startPeriod,
    });
    setPeriod({
      startPeriod: cellData.startPeriod,
      endPeriod: 0,
    });
  };

  const handleEditToAdd = () => {
    setEditToAdd(true);
    setCellData({
      startPeriod: cellData.startPeriod,
      day: cellData.day,
    });
    setPeriod({
      startPeriod: cellData.startPeriod,
      endPeriod: 0,
    });
  };

  const addNewCourse = () => {
    const newCourse = {
      ...cellData,
      startPeriod: period.startPeriod,
      endPeriod: period.endPeriod,
      courseInstanceId: cellData.id,
      endDate: null,
      startDate: null,
      id: crypto.randomUUID(),
    };
    props.submit(newCourse, "add");
    props.close();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      userUX.cellOccupied ||
      period.startPeriod === 0 ||
      period.endPeriod === 0 ||
      ((cellData.classType === "SECTION" ||
        cellData.classType === "LAB" ||
        (cellData.classType === "LECTURE" && cellData.hasLectureGroups)) &&
        (cellData.group === "NULL" || cellData.group === undefined))
    ) {
      setUserUX({ error: true, errorMsg: "please select valid inputs" });
      return;
    }
    if (props.edit && !editToAdd) {
      const editedData = {
        ...cellData,
        startPeriod: period.startPeriod,
        endPeriod: period.endPeriod,
      };
      props.submit(editedData, "edit");
      props.close();
    } else {
      const courseClassesRegistered = courses.registered.filter(
        (item) =>
          item.courseInstanceId === cellData.id &&
          item.classType === cellData.classType
      );
      const courseCount = courseClassesRegistered.length;
      const maxCourseCount =
        cellData.classType === "LECTURE"
          ? cellData.haslectureGroups
            ? cellData.lectureGroupCount * cellData.lectureCount
            : cellData.lectureCount
          : cellData.classType === "LAB"
          ? cellData.labGroupCount
          : cellData.sectionGroupCount;
      let groupAvailable = true;

      if (cellData.hasLectureGroups) {
        const groupCount = courseClassesRegistered.filter(
          (el) => el.group === cellData.group
        ).length;
        if (groupCount > 0 && cellData.classType !== "LECTURE") {
          groupAvailable = false;
        } else {
          if (cellData.lectureCount === groupCount) {
            groupAvailable = false;
          }
          if (
            courseClassesRegistered.find(
              (el) => el.group === cellData.group
            ) === undefined
          ) {
          }
        }
      }
      if (courseCount < maxCourseCount) {
        if (groupAvailable) {
          addNewCourse();
        } else {
          setUserUX({
            error: true,
            errorMsg: "Group Count is Full",
          });
        }
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
            {props.edit && !editToAdd ? (
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
                dropDownTitle={cellData}
                listData={{
                  type: "tableSelectCourse",
                  data: courses.notRegistered,
                }}
                inputPlaceholder={"common.select"}
                handleListClick={handleSubjectSelection}
                userUX={userUX}
              />
            )}
          </div>
          <div className="col-md-6">
            <label>{t(`table.classType`)}</label>
            {props.edit && !editToAdd ? (
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
                required
              >
                <option value="NULL">{t(`common.select`)}</option>
                <option value="LECTURE">{t(`common.lecture`)}</option>
                {cellData?.labGroupCount > 0 && (
                  <option value="LAB">{t(`common.lab`)}</option>
                )}
                {cellData?.sectionGroupCount > 0 && (
                  <option value="SECTION">{t(`common.section`)}</option>
                )}
              </select>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>{t(`common.day`)}</label>
            {props.edit && !editToAdd ? (
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
          <div className="col-md-6">
            <label>{t(`common.group`)}</label>
            {props.edit && !editToAdd ? (
              <input
                type="text"
                name="group"
                className="form-control"
                value={
                  cellData.classType === "LECTURE" && !cellData.hasLectureGroups
                    ? "mlhash group"
                    : cellData.group
                }
                disabled
                readOnly
              />
            ) : cellData?.classType === "LECTURE" &&
              !cellData.hasLectureGroups ? (
              <input
                type="text"
                name="group"
                className="form-control"
                value="mlhash group"
                disabled
                readOnly
              />
            ) : cellData.classType === undefined ? (
              <input
                type="text"
                name="group"
                className="form-control"
                value="pls select a class type first"
                disabled
                readOnly
              />
            ) : (
              <select
                type="text"
                className="form-select"
                name="group"
                required
                onChange={handleEditFormChange}
                value={cellData?.group || ""}
              >
                <option value="NULL">{t("common.select")}</option>
                {ScheduleTableGroups.slice(0, classCount).map((group) => (
                  <option key={group.id} value={group.title}>
                    {group.title}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>{t(`table.start`)}</label>
            <select
              type="text"
              className={editToAdd ? "form-control" : "form-select"}
              name="startPeriod"
              required
              onChange={handlePeriodChange}
              value={period.startPeriod || ""}
              disabled={editToAdd}
            >
              {period.startPeriod === 0 && (
                <option value="NULL">{t(`common.select`)}</option>
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
          <div className="col-md-6">
            <label>{t(`table.end`)}</label>
            <input
              type="text"
              className="form-control"
              name="endPeriod"
              value={
                period.endPeriod === 0
                  ? editToAdd
                    ? "choose a subject and class type"
                    : "choose start period first"
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
              <option value="NULL">{t(`common.select`)}</option>
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
            className="form-card-button form-card-button-save"
          >
            {props.edit && !editToAdd ? t("common.save") : t("common.add")}
          </button>
          <button
            type="button"
            className="form-card-button form-card-button-cancel"
            onClick={() => {
              props.close();
            }}
          >
            {t("common.cancel")}
          </button>
          {props.edit && !editToAdd && (
            <>
              <button
                type="button"
                className="form-card-button form-card-button-delete"
                onClick={(event) => {
                  props.subjectDelete(cellData.id);
                  props.close();
                }}
              >
                {t("table.deleteClass")}
              </button>
              <button
                type="button"
                className="form-card-button form-card-button-save"
                onClick={handleEditToAdd}
              >
                {t("table.add")}
              </button>
            </>
          )}
        </div>
      </form>
    </ModalPopup>
  );
};
