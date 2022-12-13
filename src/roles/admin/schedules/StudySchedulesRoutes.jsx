import { Routes, Route } from "react-router-dom";
import { FormNavbar } from "../../../components/other/FormNavbar";
import { NotFound } from "../../../pages/NotFound";
import { TablePeriods } from "./periods/TablePeriods";
import { CoursesRegisteration } from "./registeration/CoursesRegisteration";
import { StudySchedules } from "./tables/StudySchedules";

export function StudySchedulesRoutes() {
  return (
    <>
      <FormNavbar
        headerData={[
          { id: 0, title: "el tasgel", path: "register_course" },
          { id: 1, title: "el gdawl", path: "tables" },
          { id: 2, title: "el ftrat", path: "table_period" },
        ]}
      />
      <Routes>
        <Route path="" element={<CoursesRegisteration />} />
        <Route path="register_course" element={<CoursesRegisteration />} />
        <Route path="register_course/:courseId" element={<CoursesRegisteration />} />
        <Route path="tables" element={<StudySchedules />} />
        <Route path="table_period" element={<TablePeriods />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
