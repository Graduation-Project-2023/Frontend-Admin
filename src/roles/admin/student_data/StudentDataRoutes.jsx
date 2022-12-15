import { Routes, Route } from "react-router-dom";
import { FormNavbar } from "../../../components/other/FormNavbar";
import { NotFound } from "../../../pages/NotFound";
import { AddStudents } from "./add/AddStudents";
import { StudentDataPortal } from "./portal/StudentDataPortal";
import { StudentInfo } from "./portal/StudentInfo";

export function StudentDataRoutes() {
  return (
    <>
      <FormNavbar
        headerData={[
          {
            id: 0,
            title: "el tasgel",
            path: "register",
            locationIndex: "student_data",
          },
          { id: 1, title: "edaft tolab", path: "add" },
        ]}
      />
      <Routes>
        <Route path="" element={<StudentDataPortal />} />
        <Route path="register" element={<StudentDataPortal />} />
        <Route path="register/:studentId" element={<StudentInfo />} />
        <Route path="add" element={<AddStudents />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
