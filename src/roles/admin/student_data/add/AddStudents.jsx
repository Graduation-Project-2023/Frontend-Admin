import { useState } from "react";
import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { ModalPopup } from "../../../../components/popups/ModalPopup";

export const AddStudents = () => {
  const [error, setError] = useState({
    state: false,
    errorMessage: "",
    success: false,
    table: false,
  });
  return (
    <FormNavbarContainer>
      {/* Error modal */}
      {error.state && (
        <ModalPopup
          child={true}
          closeModal={() => {
            setError({ state: false });
          }}
        >
          <h1>hiiiiiiiiiiiii</h1>
        </ModalPopup>
      )}
    </FormNavbarContainer>
  );
};
