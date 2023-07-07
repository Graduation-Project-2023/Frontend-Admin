import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { BASE_URL, STAFF_URL } from "../../../shared/API";
import { getIo } from "../../../shared/Socket";
import axios from "axios";

// Components
import { Alert } from "react-bootstrap";
import { SpinnerLoader } from "../../../components/loaders/SpinnerLoader";
import { Chat } from "../../../components/chat/Chat";

export const StaffChat = () => {
  const [messages, setMessages] = useState([]);
  const [students, setStudents] = useState([]);
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
  const authContext = useAuth();
  const { t } = useTranslation();
  const socket = getIo();
  const config = {
    headers: {
      Authorization: `Bearer ${authContext.token}`,
    },
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket");
    });

    socket.emit("subscribe", "8dc2a88d-0353-4031-bac6-a01dd070fb75");

    socket.on("receive-message", (data) => {
      console.log("receive-message", data);
      setMessages((prev) => [
        ...prev,
        {
          message: data.text,
          sender: "user",
          direction: "outgoing",
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
    //eslint-disable-next-line
  }, [authContext.userId]);

  useEffect(() => {
    setUserUX((prev) => ({
      chat: {
        ...prev.chat,
        loading: true,
      },
      sidebar: {
        ...prev.sidebar,
        loading: true,
      },
    }));
    // Get all messages sent or recieved by the user
    axios
      .get(BASE_URL + "/message", config)
      .then((res) => {
        console.log(res);
        setMessages([
          ...res.data.messagesReceived?.map((message) => ({
            ...message,
            message: message.text,
            sender: "user",
            direction: "outgoing",
          })),
          ...res.data.messagesSent?.map((message) => ({
            ...message,
            message: message.text,
            sender: "professor",
          })),
        ]);
        setUserUX((prev) => ({
          ...prev,
          chat: {
            ...prev.chat,
            loading: false,
          },
        }));
      })
      .catch((err) => {
        console.log(err);
        setUserUX((prev) => ({
          ...prev,
          chat: {
            ...prev.chat,
            loading: false,
            error: true,
            errorMsg: "error.common",
          },
        }));
      });

    // Get all users
    axios
      .get(
        STAFF_URL + "/courses/3f0e35f9-5ecb-4477-847d-5ccb5e8eca44/students",
        config
      )
      .then((res) => {
        console.log(res);
        setStudents(res.data.map((item) => item.student));
        setUserUX((prev) => ({
          ...prev,
          sidebar: {
            loading: false,
            error: res.data.length === 0,
            errorMsg: "error.noUsers",
          },
        }));
      })
      .catch((err) => {
        console.log(err);
        setUserUX((prev) => ({
          ...prev,
          sidebar: {
            ...prev.sidebar,
            loading: false,
            error: true,
            errorMsg: "error.common",
          },
        }));
      });
    // eslint-disable-next-line
  }, []);

  const sendMessage = (text, studentId) => {
    const message = {
      receiverId: "c34fac0d-c0d2-464b-b8e5-b71873d8d484",
      senderId: "8dc2a88d-0353-4031-bac6-a01dd070fb75",
      text: text,
    };
    socket.emit("message-sent", message);
    setMessages((prev) => [
      ...prev,
      {
        message: text,
        sender: "professor",
        createdAt: new Date(),
      },
    ]);
  };

  return (
    <div className="container">
      <div className="portal-body">
        <h5 className="portal-title">{t("staff.chat")}</h5>
        <hr className="mb-3" />
        <div style={{ width: "100%" }}>
          {userUX.sidebar.loading || userUX.chat.loading ? (
            <SpinnerLoader size={"80px"} heigth={"250px"} />
          ) : userUX.sidebar.error || userUX.chat.error ? (
            <Alert
              variant="danger"
              style={{
                width: "90%",
                margin: "20px auto",
              }}
            >
              {t(userUX.chat.errorMsg || userUX.sidebar.errorMsg)}
            </Alert>
          ) : (
            <Chat
              students={students}
              messages={messages}
              sidebarUX={userUX.sidebar}
              chatUX={userUX.chat}
              sendMessage={sendMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
};
