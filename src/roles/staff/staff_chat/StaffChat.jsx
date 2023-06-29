import { useState } from "react";
import { useTranslation } from "react-i18next";

// Components
import { Alert } from "react-bootstrap";
import { SpinnerLoader } from "../../../components/loaders/SpinnerLoader";
import { Chat } from "../../../components/chat/Chat";

export const StaffChat = () => {
  const [userUX, setUserUX] = useState({
    chat: {
      loading: false,
      error: false,
      errorMsg: "",
    },
    sidebar: {
      loading: false,
      error: false,
      errorMsg: "",
    },
  });
  const { t } = useTranslation();
  return (
    <div className="container">
      <div className="portal-body">
        <h5 className="portal-title">{t("staff.chat")}</h5>
        <hr className="mb-3" />
        <div style={{ width: "100%" }}>
          {userUX.sidebar.loading ? (
            <SpinnerLoader size={"80px"} heigth={"250px"} />
          ) : userUX.sidebar.error ? (
            <Alert variant="danger">{t(userUX.errorMsg)}</Alert>
          ) : (
            <Chat />
          )}
        </div>
      </div>
    </div>
  );
};
