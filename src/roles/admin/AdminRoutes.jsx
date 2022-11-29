import { Routes, Route } from "react-router-dom";
import { AdminPortal } from "./AdminPortal";
import { AdminNavbar } from "./AdminNavbar";
import { AcademicProgramsRoutes } from "./programs/AcademicProgramsRoutes";
import { AcademicPorgramsPortal } from "./programs/portal/AcademicPorgramsPortal";
import { StudySchedules } from "./schedules/StudySchedules";
import { Courses } from "./courses/Courses";
import { StudentData } from "./student_data/StudentData";
import { ControlSystem } from "./control/ControlSystem";
import { NotFound } from "../../pages/NotFound";

export function AdminRoutes() {
  return (
    <>
      <AdminNavbar />
      <Routes>
        <Route path="" element={<AdminPortal />} />
        <Route path="academic_programs" element={<AcademicPorgramsPortal />} />
        <Route
          path="academic_programs/:programId/*"
          element={<AcademicProgramsRoutes />}
        />
        <Route path="study_schedules" element={<StudySchedules />} />
        <Route path="student_data" element={<StudentData />} />
        <Route path="courses" element={<Courses />} />
        <Route path="control_system" element={<ControlSystem />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
