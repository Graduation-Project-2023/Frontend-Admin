import { Routes, Route } from "react-router-dom";
import { StaffPortal } from "./StaffPortal";
import { StaffNavbar } from "./StaffNavbar";
import { StaffSchedule } from "./schedule/StaffSchedule";
import { NotFound } from "../../pages/NotFound";
import { Coursework } from "./coursework/Coursework";
import { StaffStudents } from "./students/StaffStudents";

export function StaffRoutes() {
  return (
    <>
      <StaffNavbar />
      <Routes>
        <Route path="" element={<StaffPortal />} />
        <Route path="schedule" element={<StaffSchedule />} />
        <Route path="coursework" element={<Coursework />} />
        <Route path="students_info" element={<StaffStudents />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
