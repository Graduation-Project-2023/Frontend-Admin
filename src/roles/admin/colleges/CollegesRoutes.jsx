import { Routes, Route } from "react-router-dom";
import { NotFound } from "../../../pages/NotFound";
import { CollegesPortal } from "./CollegesPortal";
import { CollegesSidebar } from "./CollegesSidebar";

export function CollegesRoutes() {
  return (
    <>
      <CollegesSidebar />
      <Routes>
        <Route path="" element={<CollegesPortal />} />
        <Route path="/:courseCode" element={<CollegesPortal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
