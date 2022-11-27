import React from "react";
import { Routes, Route } from "react-router-dom";
import { StudentSidebar } from "./sidebar/StudentSidebar";
import { StudentPortal } from "./portal/StudentPortal";
import { StudentPayment } from "./payment/StudentPayment";
import { NotFound } from "../../pages/NotFound";

export const StudentRoutes = () => {
  return (
    <>
      <StudentSidebar />
      <Routes>
        <Route path="" element={<StudentPortal />} />
        <Route path="payment" element={<StudentPayment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
