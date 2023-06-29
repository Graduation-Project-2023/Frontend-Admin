import { Routes, Route } from "react-router-dom";
import { FormNavbar } from "../../../components/other/FormNavbar";
import { NotFound } from "../../../pages/NotFound";
import { TablePeriods } from "./periods/TablePeriods";
import { CoursesRegPortal } from "./registeration/CourseRegPortal";
import { LevelSchedule } from "./tables/LevelSchedule";
import { StudySchedules } from "./tables/StudySchedules";

export function StudySchedulesRoutes() {
  return (
    <>
      <FormNavbar
        headerData={[
          {
            id: 0,
            title: "registeration.formhead",
            path: "register_course",
            locationIndex: "study_schedules",
          },
          { id: 1, title: "adminNavbar.schedule", path: "tables" },
          // { id: 2, title: "adminNavbarkeys.period", path: "table_period" },
        ]}
      />
      <Routes>
        <Route path="" element={<CoursesRegPortal />} />
        <Route path="register_course" element={<CoursesRegPortal />} />
        <Route
          path="register_course/add/:courseId"
          element={<CoursesRegPortal />}
        />
        <Route
          path="register_course/edit/:courseId"
          element={<CoursesRegPortal />}
        />
        <Route path="tables" element={<StudySchedules />} />
        <Route path="tables/:levelId" element={<LevelSchedule />} />
        <Route path="table_period" element={<TablePeriods />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
