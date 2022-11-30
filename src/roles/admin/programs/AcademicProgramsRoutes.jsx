import { Routes, Route } from "react-router-dom";
import { NotFound } from "../../../pages/NotFound";
import { AcademicCourses } from "./courses/AcademicCourses";
import { AcademicGrades } from "./grades/AcademicGrades";
import { AcademicGraduation } from "./graduation/AcademicGraduation";
import { AcademicLevels } from "./levels/AcademicLevels";
import { AcademicMain } from "./main/AcademicMain";
import { ProgramsSidebar } from "./ProgramsSidebar";
import { AcademicControl } from "./control/AcademicControl";
import { LevelHours } from "./level-allowed-hours/LevelHours";

export function AcademicProgramsRoutes() {
  return (
    <>
      <ProgramsSidebar />
      <Routes>
        <Route path="main" element={<AcademicMain />} />
        <Route path="levels" element={<AcademicLevels />} />
        <Route path="courses" element={<AcademicCourses />} />
        <Route path="grades" element={<AcademicGrades />} />
        <Route path="graduation" element={<AcademicGraduation />} />
        <Route path="control" element={<AcademicControl />} />
        <Route path="level-hours" element={<LevelHours />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
