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
import studentIcon from "../../shared/images/profile.png";
import professorIcon from "../../shared/images/professor.jpg";

export const Chat = (props) => {
  const { t, i18n } = useTranslation();
  const [messageInputValue, setMessageInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      message: t("assistant.message"),
      sentTime: "just now",
      sender: "user",
      direction: "outgoing",
    },
    {
      message: t("assistant.message"),
      sentTime: "just now",
      sender: "professor",
    },
    {
      message: t("assistant.message"),
      sentTime: "just now",
      sender: "user",
      direction: "outgoing",
    },
    {
      message: t("assistant.message"),
      sentTime: "just now",
      sender: "professor",
    },
    {
      message: t("assistant.message"),
      sentTime: "just now",
      sender: "user",
      direction: "outgoing",
    },
    {
      message: t("assistant.message"),
      sentTime: "just now",
      sender: "professor",
    },
    {
      message: t("assistant.message"),
      sentTime: "just now",
      sender: "professor",
    },
    {
      message: t("assistant.message"),
      sentTime: "just now",
      sender: "professor",
    },
    {
      message: t("assistant.message"),
      sentTime: "just now",
      sender: "professor",
    },
    {
      message: t("assistant.message"),
      sentTime: "just now",
      sender: "professor",
    },
    {
      message: t("assistant.message"),
      sentTime: "just now",
      sender: "professor",
    },
    {
      message: t("assistant.message"),
      sentTime: "just now",
      sender: "professor",
    },
    {
      message: t("assistant.message"),
      sentTime: "just now",
      sender: "user",
      direction: "outgoing",
    },
    {
      message: t("assistant.message"),
      sentTime: "just now",
      sender: "user",
      direction: "outgoing",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [currChat, setCurrChat] = useState("");
  const [professors, setProfessors] = useState([]);

  return (
    <div>
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
            <Conversation name="Lilly">
              <Avatar src={professorIcon} name="Lilly" status="available" />
            </Conversation>
            <Conversation name="Joe">
              <Avatar src={professorIcon} name="Joe" status="dnd" />
            </Conversation>

            <Conversation name="Emily" unreadCnt={3}>
              <Avatar src={professorIcon} name="Emily" status="available" />
            </Conversation>

            <Conversation name="Kai" unreadDot>
              <Avatar src={professorIcon} name="Kai" status="unavailable" />
            </Conversation>

            <Conversation name="Akane">
              <Avatar src={professorIcon} name="Akane" status="eager" />
            </Conversation>

            <Conversation name="Eliot">
              <Avatar src={professorIcon} name="Eliot" status="away" />
            </Conversation>

            <Conversation name="Zoe">
              <Avatar src={professorIcon} name="Zoe" status="dnd" />
            </Conversation>

            <Conversation name="Patrik">
              <Avatar src={professorIcon} name="Patrik" status="invisible" />
            </Conversation>
          </ConversationList>
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src={studentIcon} name="Zoe" />
            <ConversationHeader.Content>
              <span
                style={{
                  color: "blue",
                  alignSelf: "flex-center",
                  fontSize: "20px",
                  margin: "0 10px",
                }}
              >
                {t("dr.name")}
              </span>{" "}
            </ConversationHeader.Content>
          </ConversationHeader>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={
              typing ? <TypingIndicator content={t("chat.sending")} /> : null
            }
          >
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
            attachButton={false}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};
