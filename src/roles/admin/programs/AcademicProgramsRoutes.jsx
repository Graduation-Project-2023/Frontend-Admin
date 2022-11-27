import { Routes, Route } from "react-router-dom";
import { NotFound } from "../../../pages/NotFound";
import { AcademicCourses } from "./courses/AcademicCourses";
import { AcademicGrades } from "./grades/AcademicGrades";
import { AcademicGraduation } from "./graduation/AcademicGraduation";
import { AcademicLevels } from "./levels/AcademicLevels";
import { AcademicMain } from "./main/AcademicMain";
import { ProgramsSidebar } from "./sidebar/ProgramsSidebar";
import { AcademicControl } from "./control/AcademicControl";

export function AcademicProgramsRoutes() {
  return (
    <>
      <ProgramsSidebar />
      <Routes>
        <Route path=":programId" element={<AcademicMain />} />
        <Route path=":programId/levels" element={<AcademicLevels />} />
        <Route path=":programId/courses" element={<AcademicCourses />} />
        <Route path=":programId/grades" element={<AcademicGrades />} />
        <Route path=":programId/graduation" element={<AcademicGraduation />} />
        <Route path=":programId/control" element={<AcademicControl />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
