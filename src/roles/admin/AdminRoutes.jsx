import { Routes, Route } from "react-router-dom";
import { AdminPortal } from "./portal/AdminPortal";
import { AdminNavbar } from "./AdminNavbar";
import { AcademicProgramsRoutes } from "./programs/AcademicProgramsRoutes";
import { AcademicPorgramsPortal } from "./programs/portal/AcademicPorgramsPortal";
import { StudySchedules } from "./schedules/StudySchedules";
import { CoursesData } from "./courses/CoursesData";
import { StudentData } from "./student_data/StudentData";
import { ControlSystem } from "./control/ControlSystem";
import { NotFound } from "../../pages/NotFound";
import { LevelHours } from "./programs/level-allowed-hours/LevelHours";
import { AddAcademicProgram } from "./programs/main/AddAcademicProgram";

export function AdminRoutes() {
  return (
    <>
      <AdminNavbar />
      <Routes>
        <Route path="" element={<AdminPortal />} />
        <Route path="academic_programs" element={<AcademicPorgramsPortal />} />
        <Route path="academic_programs/add" element={<AddAcademicProgram />} />
        <Route
          path="academic_programs/:programId/*"
          element={<AcademicProgramsRoutes />}
        />
        <Route path="study_schedules" element={<StudySchedules />} />
        <Route path="student_data" element={<StudentData />} />
        <Route path="registeration" element={<ControlSystem />} />
        <Route path="exams" element={<ControlSystem />} />
        <Route path="results" element={<ControlSystem />} />
        <Route path="finance" element={<LevelHours />} />
        <Route path="absence" element={<ControlSystem />} />
        <Route path="courses" element={<CoursesData />} />
        <Route path="supervision" element={<ControlSystem />} />
        <Route path="control_system" element={<ControlSystem />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
