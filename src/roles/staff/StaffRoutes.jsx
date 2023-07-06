import { Routes, Route, useLocation } from "react-router-dom";
// import { useEffect } from "react";
// import { getIo } from "../../shared/Socket";

// Components
import { StaffPortal } from "./portal/StaffPortal";
import { StaffNavbar } from "./StaffNavbar";
import { StaffSchedule } from "./schedule/StaffSchedule";
import { NotFound } from "../../pages/NotFound";
import { Coursework } from "./coursework/Coursework";
import { StaffStudents } from "./students/StaffStudents";
import { McqRoutes } from "./mcq/McqRoutes";
import { StaffChat } from "./staff_chat/StaffChat";

export function StaffRoutes() {
  const location = useLocation();
  const pathname = location.pathname;
  const urlParts = pathname.split("/");
  const lastPart = urlParts[urlParts.length - 1];

  // useEffect(() => {
  //   const socket = getIo();
  //   socket.emit("subscribe");

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <>
      {lastPart !== "staff" && <StaffNavbar />}
      <Routes>
        <Route path="" element={<StaffPortal />} />
        <Route path="schedule" element={<StaffSchedule />} />
        <Route path="chat" element={<StaffChat />} />
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
