import { Routes, Route } from "react-router-dom";
import { StaffPortal } from "./portal/StaffPortal";
import { StaffNavbar } from "./StaffNavbar";
import { StaffSchedule } from "./schedule/StaffSchedule";
import { NotFound } from "../../pages/NotFound";
import { Coursework } from "./coursework/Coursework";
import { StaffStudents } from "./students/StaffStudents";
import { McqRoutes } from "./mcq/McqRoutes";

export function StaffRoutes() {
  return (
    <>
      <StaffNavbar />
      <Routes>
        <Route path="" element={<StaffPortal />} />
        <Route path="schedule" element={<StaffSchedule />} />
        <Route path="coursework" element={<Coursework />} />
        <Route path="coursework/:courseId" element={<Coursework />} />
        <Route path="students_info" element={<StaffStudents />} />
        <Route path="students_info/:courseId" element={<StaffStudents />} />
        <Route path="mcq/*" element={<McqRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
