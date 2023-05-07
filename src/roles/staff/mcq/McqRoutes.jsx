import { Routes, Route } from "react-router-dom";
import { FormNavbar } from "../../../components/other/FormNavbar";
import { ViewBank } from "./bank/ViewBank";
import { Banks } from "./bank/Banks";
import { CreateQuiz } from "./quiz/CreateQuiz";
import { AddToBank } from "./add_questions/AddToBank";
import { NotFound } from "../../../pages/NotFound";

export function McqRoutes() {
  return (
    <>
      <FormNavbar
        headerData={[
          {
            id: 0,
            title: "staffNavbar.view_bank",
            path: "bank",
            locationIndex: "mcq",
          },
          { id: 1, title: "staffNavbar.add_questions", path: "add_questions" },
          { id: 2, title: "staffNavbar.quiz", path: "quiz" },
          { id: 3, title: "staffNavbar.banks", path: "banks" },
        ]}
      />
      <Routes>
        <Route path="" element={<ViewBank />} />
        <Route path="bank" element={<ViewBank />} />
        <Route path="bank/:bankId" element={<ViewBank />} />
        <Route path="banks" element={<Banks />} />
        <Route path="banks/:bankId" element={<Banks />} />
        <Route path="quiz" element={<CreateQuiz />} />
        <Route path="add_questions" element={<AddToBank />} />
        <Route path="add_questions/:bankId" element={<AddToBank />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
