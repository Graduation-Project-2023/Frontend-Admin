import { FormNavbarContainer } from "../../../../components/other/FormNavbarContainer";
import { useNavigate } from "react-router-dom";
export const StudySchedules = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <FormNavbarContainer>
        <button
          onClick={() => {
            navigate("20");
          }}
        >
          GO TO TABLE
        </button>
      </FormNavbarContainer>
    </div>
  );
};
