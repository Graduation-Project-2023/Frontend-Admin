import { Routes, Route } from "react-router-dom";
import { NotFound } from "../../../pages/NotFound";
import { ProfessorsPortal } from "./ProfessorsPortal";
import { ProfessorsSidebar } from "./ProfessorsSidebar";

export function ProfessorsRoutes() {
  return (
    <>
      <ProfessorsSidebar />
      <Routes>
        <Route path="" element={<ProfessorsPortal />} />
        <Route path="/:professorId" element={<ProfessorsPortal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
