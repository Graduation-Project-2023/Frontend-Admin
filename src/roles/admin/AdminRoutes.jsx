import { Routes, Route } from "react-router-dom";
import { AdminPortal } from "./AdminPortal";
import { AdminNavbar } from "./AdminNavbar";
import { AddAcademicProgram } from "./programs/main/AddAcademicProgram";
import { AcademicPorgramsPortal } from "./programs/AcademicPorgramsPortal";
import { AcademicProgramsRoutes } from "./programs/AcademicProgramsRoutes";
import { StudentDataRoutes } from "./student_data/StudentDataRoutes";
import { RegisterationPortal } from "./registeration/RegisterationPortal";
import { StudySchedulesRoutes } from "./schedules/StudySchedulesRoutes";
import { CoursesRoutes } from "./courses/CoursesRoutes";
import { DepartmentsRoutes } from "./departments/DepartmentsRoutes";
import { ProfessorsRoutes } from "./professors/ProfessorsRoutes";
import { StudentRegisteration } from "./registeration/StudentRegisteration";
import { PaymentPortal } from "./payments/PaymentPortal";
import { Results } from "./results/Results";
import { NotFound } from "../../pages/NotFound";

export function AdminRoutes() {
  return (
    <>
      <AdminNavbar />
      <Routes>
        <Route path="" element={<AdminPortal />} />
        <Route path="student_data/*" element={<StudentDataRoutes />} />
        <Route path="courses/*" element={<CoursesRoutes />} />
        <Route path="departments/*" element={<DepartmentsRoutes />} />
        <Route path="payments/*" element={<PaymentPortal />} />
        <Route path="control_system/*" element={<ProfessorsRoutes />} />
        <Route path="academic_programs" element={<AcademicPorgramsPortal />} />
        <Route path="academic_programs/add" element={<AddAcademicProgram />} />
        <Route
          path="academic_programs/:programId/*"
          element={<AcademicProgramsRoutes />}
        />
        <Route path="study_schedules/*" element={<StudySchedulesRoutes />} />
        <Route path="registeration" element={<RegisterationPortal />} />
        <Route
          path="registeration/student/:studentId"
          element={<StudentRegisteration />}
        />
        <Route path="results" element={<Results />} />
        <Route path="results/:courseId" element={<Results />} />
        <Route
          path="exams"
          element={
            <h1 className="text-center alert alert-info m-5" role="alert">
              FUTURE WORK
            </h1>
          }
        />
        <Route
          path="absence"
          element={
            <h1 className="text-center alert alert-info m-5" role="alert">
              FUTURE WORK
            </h1>
          }
        />
        <Route
          path="supervision"
          element={
            <h1 className="text-center alert alert-info m-5" role="alert">
              FUTURE WORK
            </h1>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
