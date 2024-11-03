import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const systemMessage = {
  role: "system",
  content:
    "Please provide guidance as if you were advising a student in need of subject suggestions. In addition, please do not reply to topics that are not related to career counseling, choosing a school, choosing a major, researching a school, researching an industry.",
};

function Chatbot({ unreadMessages, setUnreadMessages }) {
  const customMessageContentTransformer = (content) => {
    return <p>{content}</p>;
  };
  const [messages, setMessages] = useState([
    {
      message:
        "Chào bạn, mình là trợ lý ảo có thể tư vấn cho bạn tất cả những thứ bạn cần về ngành học nhé",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
    setUnreadMessages(unreadMessages + 1);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_CHATGPT_APIKEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }
  return (
    <div
      style={{
        position: "relative",
        height: "500px",
        width: "100%",
      }}
    >
      <MainContainer style={{ backgroundColor: "#F5F5F5" }}>
        <ChatContainer>
          <MessageList
            scrollBehavior="auto"
            typingIndicator={
              isTyping ? (
                <TypingIndicator content="Trợ lý ảo đang tìm kiếm câu trả lời, bạn chờ 1 lát nhé" />
              ) : null
            }
          >
            {messages.map((message, i) => {
              return (
                <Message
                  key={i}
                  model={message}
                  messageContentTransformer={customMessageContentTransformer}
                />
              );
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default Chatbot;
