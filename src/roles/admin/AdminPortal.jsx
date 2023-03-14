import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ADMIN_URL } from "../../shared/API";
import axios from "axios";

// Reusable Components
import { ModalPopup } from "../../components/popups/ModalPopup";

export const AdminPortal = () => {
  const [colleges, setColleges] = useState([]);
  // eslint-disable-next-line
  const [showModal, setShowModal] = useState(true);
  const [userUX, setUserUX] = useState({ error: false, errorMsg: "" });
  const navigate = useNavigate();
  const authContext = useAuth();
  const config = {
    headers: { Authorization: `Bearer ${authContext.token}` },
  };

  useEffect(() => {
    if (authContext.role === "ADMIN") {
      navigate("/admin/academic_programs");
    } else {
      axios
        .get(ADMIN_URL + "/colleges", config)
        .then((res) => {
          console.log(res.data);
          setUserUX({ error: false, errorMsg: "" });
          setColleges(res.data);
        })
        .catch((error) => {
          setUserUX({ error: true, errorMsg: error.message });
          console.log(error);
        });
    }

    // eslint-disable-next-line
  }, []);

  return (
    <ModalPopup
      error={{ state: userUX.error, message: userUX.errorMsg }}
      title={"academicMain.faculty"}
      searchable={true}
      contextValue={"COLLEGE"}
      list={{ state: true, data: colleges, path: "academic_programs" }}
      closeModal={() => {
        // FORCE THE USER TO SELECT A COLLEGE
        // setShowModal(false);
      }}
    />
  );
};
