import { useState, useEffect } from "react";
import { ADMIN_URL } from "../../shared/API";
import axios from "axios";

// Reusable Components
import { ModalPopup } from "../../components/popups/ModalPopup";

export const AdminPortal = () => {
  const [colleges, setColleges] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [userUX, setUserUX] = useState({ error: false, errorMsg: "" });

  useEffect(() => {
    axios
      .get(ADMIN_URL + "/colleges")
      .then((res) => {
        setUserUX({ error: false, errorMsg: "" });
        setColleges(res.data);
      })
      .catch((error) => {
        setUserUX({ error: true, errorMsg: error.message });
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  return (
    showModal && (
      <ModalPopup
        error={{ state: userUX.error, message: userUX.errorMsg }}
        title={"academicMain.faculty"}
        searchable={true}
        list={{ state: true, data: colleges, path: "academic_programs" }}
        closeModal={() => {
          // FORCE THE USE TO SELECT A COLLEGE
          setShowModal(false);
        }}
      />
    )
  );
};
