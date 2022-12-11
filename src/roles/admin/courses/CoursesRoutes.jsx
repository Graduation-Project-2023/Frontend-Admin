import { Routes, Route } from "react-router-dom";
import { NotFound } from "../../../pages/NotFound";
import { CourseData } from "./CourseData";
import { CoursesPortal } from "./CoursesPortal";
import { CoursesSidebar } from "./CoursesSidebar";

export function CoursesRoutes() {
  return (
    <>
      <CoursesSidebar />
      <Routes>
        <Route path="" element={<CoursesPortal />} />
        <Route path="/:courseCode" element={<CourseData />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
