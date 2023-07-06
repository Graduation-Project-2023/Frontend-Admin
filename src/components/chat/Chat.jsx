import { useState } from "react";
import { useTranslation } from "react-i18next";

// Components
import {
  MainContainer,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  ChatContainer,
  MessageList,
  Message,
  Avatar,
  MessageInput,
  TypingIndicator,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import { Alert } from "react-bootstrap";
import studentIcon from "../../shared/images/profile.png";
import professorIcon from "../../shared/images/professor.jpg";

export const Chat = ({
  students,
  messages,
  sidebarUX,
  chatUX,
  sendMessage,
}) => {
  const { t, i18n } = useTranslation();
  const [messageInputValue, setMessageInputValue] = useState("");
  // const [messages, setMessages] = useState([
  //   {
  //     message: t("assistant.message"),
  //     sentTime: "just now",
  //     sender: "user",
  //     direction: "outgoing",
  //   },
  //   {
  //     message: t("assistant.message"),
  //     sentTime: "just now",
  //     sender: "professor",
  //   },
  //   {
  //     message: t("assistant.message"),
  //     sentTime: "just now",
  //     sender: "user",
  //     direction: "outgoing",
  //   },
  //   {
  //     message: t("assistant.message"),
  //     sentTime: "just now",
  //     sender: "professor",
  //   },
  //   {
  //     message: t("assistant.message"),
  //     sentTime: "just now",
  //     sender: "user",
  //     direction: "outgoing",
  //   },
  //   {
  //     message: t("assistant.message"),
  //     sentTime: "just now",
  //     sender: "professor",
  //   },
  //   {
  //     message: t("assistant.message"),
  //     sentTime: "just now",
  //     sender: "professor",
  //   },
  //   {
  //     message: t("assistant.message"),
  //     sentTime: "just now",
  //     sender: "professor",
  //   },
  //   {
  //     message: t("assistant.message"),
  //     sentTime: "just now",
  //     sender: "professor",
  //   },
  //   {
  //     message: t("assistant.message"),
  //     sentTime: "just now",
  //     sender: "professor",
  //   },
  //   {
  //     message: t("assistant.message"),
  //     sentTime: "just now",
  //     sender: "professor",
  //   },
  //   {
  //     message: t("assistant.message"),
  //     sentTime: "just now",
  //     sender: "professor",
  //   },
  //   {
  //     message: t("assistant.message"),
  //     sentTime: "just now",
  //     sender: "user",
  //     direction: "outgoing",
  //   },
  //   {
  //     message: t("assistant.message"),
  //     sentTime: "just now",
  //     sender: "user",
  //     direction: "outgoing",
  //   },
  // ]);
  const [userUX, setUserUX] = useState({
    siderbar: sidebarUX,
    chat: chatUX,
    submit: {
      loading: false,
      error: false,
    },
  });
  const [currChat, setCurrChat] = useState({});

  return (
    <div>
      {!currChat.id && (
        <Alert
          variant="info"
          style={{
            width: "90%",
            margin: "20px auto",
          }}
        >
          {t("chat.selectChat")}
        </Alert>
      )}
      <MainContainer
        responsive
        style={{
          height: "calc(100vh - 50px)",
          width: "90%",
          margin: "20px auto",
        }}
      >
        <Sidebar
          position={"right"}
          scrollable={false}
          style={{
            border: "solid 1px #d1dbe3",
          }}
        >
          <Search placeholder={t("chat.searchName")} />
          <ConversationList>
            {students.map((student) => {
              return (
                <Conversation
                  name={
                    i18n.language === "en"
                      ? student.englishName
                      : student.arabicName
                  }
                  key={student.id}
                  onClick={() => {
                    setCurrChat({
                      id: student.id,
                      englishName: student.englishName,
                      arabicName: student.arabicName,
                    });
                  }}
                  active={currChat.id === student.id}
                >
                  <Avatar
                    src={studentIcon}
                    name={student.name}
                    status={student.status}
                  />
                </Conversation>
              );
            })}
          </ConversationList>
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            {currChat.id && (
              <Avatar
                src={studentIcon}
                name={
                  i18n.language === "en"
                    ? currChat.englishName
                    : currChat.arabicName
                }
              />
            )}
            <ConversationHeader.Content>
              <span
                style={{
                  color: "blue",
                  alignSelf: "flex-center",
                  fontSize: "20px",
                  margin: "0 10px",
                }}
              >
                {i18n.language === "en"
                  ? currChat.englishName
                  : currChat.arabicName}
              </span>
            </ConversationHeader.Content>
          </ConversationHeader>
          <MessageList scrollBehavior="smooth">
            {messages.map((message, i) => {
              return (
                <Message
                  key={i}
                  model={message}
                  className={
                    i18n.language === "ar" && message.sender === "user"
                      ? "message-ar"
                      : ""
                  }
                  style={{ marginBottom: "18px" }}
                >
                  {message.sender === "user" ? (
                    <Avatar src={studentIcon} name="User" />
                  ) : (
                    <Avatar src={professorIcon} name="Professor" />
                  )}
                </Message>
              );
            })}
          </MessageList>
          <MessageInput
            placeholder={t("chat.placeholder")}
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
            onSend={(val) => {
              sendMessage(val, currChat.id);
            }}
            attachButton={false}
            disabled={!currChat.id}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};
