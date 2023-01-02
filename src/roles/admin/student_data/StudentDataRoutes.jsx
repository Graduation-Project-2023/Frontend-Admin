import { Routes, Route } from "react-router-dom";
import { FormNavbar } from "../../../components/other/FormNavbar";
import { NotFound } from "../../../pages/NotFound";
import { AddStudents } from "./add/AddStudents";
import { StudentDataPortal } from "./portal/StudentDataPortal";

export function StudentDataRoutes() {
  return (
    <>
      <FormNavbar
        headerData={[
          {
            id: 0,
            title: "studentsData.data",
            path: "info",
            locationIndex: "student_data",
          },
          { id: 1, title: "studentsData.add", path: "add" },
        ]}
      />
      <Routes>
        <Route path="" element={<StudentDataPortal />} />
        <Route path="info" element={<StudentDataPortal />} />
        <Route path="info/:studentId" element={<StudentDataPortal />} />
        <Route path="add" element={<AddStudents />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
