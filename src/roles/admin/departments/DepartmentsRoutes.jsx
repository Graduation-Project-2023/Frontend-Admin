import { Routes, Route } from "react-router-dom";
import { NotFound } from "../../../pages/NotFound";
import { DepartmentsPortal } from "./DepartmentsPortal";
import { DepartmentsSidebar } from "./DepartmentsSidebar";

export function DepartmentsRoutes() {
  return (
    <>
      <DepartmentsSidebar />
      <Routes>
        <Route path="" element={<DepartmentsPortal />} />
        <Route path="/:departmentCode" element={<DepartmentsPortal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
