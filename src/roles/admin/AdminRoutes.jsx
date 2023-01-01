import { Routes, Route } from "react-router-dom";
import { AdminPortal } from "./AdminPortal";
import { AdminNavbar } from "./AdminNavbar";
import { AddAcademicProgram } from "./programs/main/AddAcademicProgram";
import { AcademicPorgramsPortal } from "./programs/AcademicPorgramsPortal";
import { AcademicProgramsRoutes } from "./programs/AcademicProgramsRoutes";
import { StudentDataRoutes } from "./student_data/StudentDataRoutes";
import { RegisterationPortal } from "./registeration/RegisterationPortal";
import { RegisterationRoutes } from "./registeration/RegisterationRoutes";
import { StudySchedulesRoutes } from "./schedules/StudySchedulesRoutes";
import { LevelHours } from "./programs/level-allowed-hours/LevelHours";
import { NotFound } from "../../pages/NotFound";
import { CoursesRoutes } from "./courses/CoursesRoutes";

export function AdminRoutes() {
  return (
    <>
      <AdminNavbar />
      <Routes>
        <Route path="" element={<AdminPortal />} />
        <Route path="student_data/*" element={<StudentDataRoutes />} />
        <Route path="courses/*" element={<CoursesRoutes />} />
        <Route path="academic_programs" element={<AcademicPorgramsPortal />} />
        <Route path="academic_programs/add" element={<AddAcademicProgram />} />
        <Route
          path="academic_programs/:programId/*"
          element={<AcademicProgramsRoutes />}
        />
        <Route path="study_schedules/*" element={<StudySchedulesRoutes />} />
        <Route path="registeration" element={<RegisterationPortal />} />
        <Route path="registeration/*" element={<RegisterationRoutes />} />
        <Route path="exams" element={<LevelHours />} />
        <Route path="results" element={<LevelHours />} />
        <Route path="finance" element={<LevelHours />} />
        <Route path="absence" element={<LevelHours />} />
        <Route path="supervision" element={<LevelHours />} />
        <Route path="control_system" element={<LevelHours />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
