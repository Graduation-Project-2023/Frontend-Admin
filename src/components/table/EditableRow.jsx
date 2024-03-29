import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

export const EditableRow = ({
  editRowData,
  handleCancelClick,
  handleEditFormChange,
}) => {
  const authContext = useAuth();
  const { t } = useTranslation();

  return (
    <>
      {Object.keys(editRowData)?.map((key) => {
        if (key === "id") return null;
        if (key === "programId") return null;
        if (key === "levelId") return null;
        if (key === "semester")
          return (
            <td className="table-container-items" key={key}>
              <select
                className="form-select"
                name={key}
                value={editRowData[key] === 0 ? 0 : editRowData[key] || ""}
                required
                onChange={handleEditFormChange}
              >
                <option value={null}>{t("common.select")}</option>
                <option value={"FIRST"}>{t("common.firstTerm")}</option>
                <option value={"SECOND"}>{t("common.secondTerm")}</option>
                <option value={"SUMMER"}>{t("common.summerTerm")}</option>
              </select>
            </td>
          );
        if (key === "level")
          return (
            <td className="table-container-items" key={key}>
              <select
                className="form-select"
                name={key}
                value={editRowData[key] === 0 ? 0 : editRowData[key] || ""}
                required
                onChange={handleEditFormChange}
              >
                <option value={null}>{t("common.select")}</option>
                {authContext.program.levels.map((level) => (
                  <option value={level.level} key={level.id}>
                    {level.level}
                  </option>
                ))}
              </select>
            </td>
          );
        const type = typeof editRowData[key] === "number" ? "number" : "text";
        return (
          <td className="table-container-items" key={key}>
            <input
              type={key === "maxCourses" ? "number" : type}
              required
              placeholder={t("common.enterValue")}
              name={key}
              value={editRowData[key] === 0 ? 0 : editRowData[key] || ""}
              onChange={handleEditFormChange}
              className="form-control"
            />
          </td>
        );
      })}

      <td className="table-container-items">
        <button type="submit" className="table-container-items-button">
          <FaCheck color="#858D97" className="table-container-items-icon" />
        </button>
      </td>

      <td className="table-container-items">
        <GiCancel
          color="#D65050"
          className="table-container-items-icon"
          onClick={handleCancelClick}
        />
      </td>
    </>
  );
};
