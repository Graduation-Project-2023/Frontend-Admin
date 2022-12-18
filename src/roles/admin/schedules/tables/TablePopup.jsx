import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";

// Reusable Components
import { ModalPopup } from "../../../../components/popups/ModalPopup";
import { DropdownSearch } from "../../../../components/forms/DropdownSearch";

export const TablePopup = (props) => {
  const [cellData, setCellData] = useState(props.cellData.cellData);
  const [availableCells, setAvailableCells] = useState([]);
  const { t } = useTranslation();
  const currentLanguageCode = cookies.get("i18next") || "en";
  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.submit();
  };
  const days = [
    { id: 1, title: "saturday", value: "SATURDAY" },
    { id: 2, title: "sunday", value: "SUNDAY" },
    { id: 3, title: "monday", value: "MONDAY" },
    { id: 4, title: "tuesday", value: "TUESDAY" },
    { id: 5, title: "wednesday", value: "WEDNESDAY" },
    { id: 6, title: "thursday", value: "THURSDAY" },
    { id: 7, title: "friday", value: "FRIDAY" },
  ];
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
    setAvailableCells(availableCells);
    // eslint-disable-next-line
  }, [props.cellData.availableCells]);

  useEffect(() => {
    setCellData(props.cellData.cellData);
  }, [props.cellData.cellData]);

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setCellData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
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
            <label>{t(`esm el mada`)}</label>
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
                name={{ arabicName: "esm el mada" }}
                menuData={[]}
                label={"esm mada"}
                inputPlaceholder={"ektb esm el mada"}
              />
            )}
          </div>
          <div className="form-group col-md-6">
            <label>{t(`no3 el drasa`)}</label>
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
                <option value={null}>{t(`ekhtar no3 el drasa`)}</option>
                <option value="LECTURE">{t(`lecture`)}</option>
                <option value="LAB">{t(`lab`)}</option>
              </select>
            )}
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-4">
            <label>{t(`el yooom`)}</label>
            {props.edit ? (
              <select
                type="text"
                className="form-select"
                name="day"
                onChange={handleEditFormChange}
                value={cellData?.day || ""}
              >
                {days.map((day) => (
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
            <label>{t(`el fatra mn`)}</label>
            {props.edit ? (
              <select
                type="text"
                className="form-select"
                name="startPeriod"
                onChange={handleEditFormChange}
                value={cellData.startPeriod}
              >
                {availableCells
                  .filter((item) => item.day === cellData.day)
                  .sort(function (a, b) {
                    return a.period - b.period;
                  })
                  .map((cell) => (
                    <option key={cell.period} value={cell.period}>
                      {cell.period}
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
            <label>{t(`el fatra ela`)}</label>
            <select
              type="text"
              className="form-select"
              name="endPeriod"
              onChange={handleEditFormChange}
              value={cellData?.endPeriod || ""}
            >
              {availableCells
                .filter((item) => item.day === cellData?.day)
                .sort(function (a, b) {
                  return a.period - b.period;
                })
                .map((cell) => (
                  <option key={cell.period} value={cell.period}>
                    {cell.period}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-6">
            <label>{t(`el mkaan`)}</label>
            <select name="place" className="form-select">
              <option value="1">{t(`el mkaan`)}</option>
              <option value="2">{t(`el mkaan`)}</option>
              <option value="3">{t(`el mkaan`)}</option>
            </select>
          </div>
          <div className="form-group col-md-6">
            <label>{t(`3dd el tolab`)}</label>
            <input type="number" className="form-control" />
          </div>
        </div>

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
