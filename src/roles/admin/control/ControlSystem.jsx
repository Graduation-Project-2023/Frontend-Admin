import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";

export const ControlSystem = () => {
  const { t } = useTranslation();
  const classWorkRef = useRef();
  const midtermRef = useRef();
  const finalRef = useRef();
  const maxGrade = 100;

  const [wrongCourseGrades, setWrongCourseGrades] = useState({
    error: false,
    errorMessage: "",
  });

  const handleCourseGrades = () => {
    if (
      +classWorkRef.current.value +
        +midtermRef.current.value +
        +finalRef.current.value >
      maxGrade
    ) {
      setWrongCourseGrades({
        error: true,
        errorMessage: "sum of grades must be equal to the max grade",
      });
      classWorkRef.current.value = "";
      midtermRef.current.value = "";
      finalRef.current.value = "";
    } else if (
      +classWorkRef.current.value +
        +midtermRef.current.value +
        +finalRef.current.value ===
      maxGrade
    ) {
      setWrongCourseGrades({ error: false });
    }
  };

  return (
    <form>
      <div className="row mb-4">
        <label className="col-sm-1 col-form-label">{t("courses.class")}</label>
        <div className="col-sm-2">
          <input
            onChange={handleCourseGrades}
            name="classwork"
            id="classwork"
            type="number"
            ref={classWorkRef}
          />
        </div>

        <label className="col-sm-2 col-form-label">{t("courses.mid")}</label>
        <div className="col-sm-2">
          <input
            onChange={handleCourseGrades}
            name="midterm"
            id="midterm"
            type="number"
            ref={midtermRef}
          />
        </div>

        <label className="col-sm-2 col-form-label">{t("courses.final")}</label>
        <div className="col-sm-2">
          <input
            onChange={handleCourseGrades}
            id="final"
            name="final"
            type="number"
            ref={finalRef}
          />
        </div>
      </div>
      {wrongCourseGrades.error && <div>{wrongCourseGrades.errorMessage}</div>}
      <div className="row mb-4">
        <label className="col-sm-1 col-form-label">{t("grades.max")}</label>
        <div className="col-sm-2">
          <input disabled value={maxGrade} type="number" />
        </div>
      </div>
    </form>
  );
};
