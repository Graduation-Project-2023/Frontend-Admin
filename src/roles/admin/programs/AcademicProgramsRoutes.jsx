import { Routes, Route } from "react-router-dom";
import { NotFound } from "../../../pages/NotFound";
import { ProgramCourses } from "./courses/ProgramCourses";
import { AcademicGrades } from "./grades/AcademicGrades";
import { AcademicGraduation } from "./graduation/AcademicGraduation";
import { AcademicLevels } from "./levels/AcademicLevels";
import { AcademicMain } from "./main/AcademicMain";
import { ProgramsSidebar } from "./ProgramsSidebar";
import { AcademicControl } from "./control/AcademicControl";
import { LevelHours } from "./level-allowed-hours/LevelHours";
import { AcademicGPA } from "./gpa/AcademicGPA";
import { GPAHours } from "./gpa-allowed-hours/GPAHours";
import { AddAcademicProgram } from "./main/AddAcademicProgram";

export function AcademicProgramsRoutes() {
  return (
    <>
      <ProgramsSidebar />
      <Routes>
        <Route path="add" element={<AddAcademicProgram />} />
        <Route path="main" element={<AcademicMain />} />
        <Route path="levels" element={<AcademicLevels />} />
        <Route path="courses" element={<ProgramCourses />} />
        <Route path="grades" element={<AcademicGrades />} />
        <Route path="gpa" element={<AcademicGPA />} />
        <Route path="gpa-hours" element={<GPAHours />} />
        <Route path="graduation" element={<AcademicGraduation />} />
        <Route path="control" element={<AcademicControl />} />
        <Route path="level-hours" element={<LevelHours />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
