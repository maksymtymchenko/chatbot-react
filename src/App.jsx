import { useState, useRef, useEffect } from "react";
import { getMessageText } from "./utils";
import { ChatForm, ChatBody, ChatHeader, ChatButton } from "./components";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);

  const chatBodyRef = useRef(null);

  const updateMessages = (text, isError = false) => {
    setMessages((prev) => [
      ...prev.filter((msg) => msg.text !== "Thinking..."),
      { role: "model", text, isError },
    ]);
  };

  const generateBotResponse = async (messages) => {
    const mappedMessage = messages.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: mappedMessage,
      }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();

      const apiResponceText = getMessageText(
        data.candidates[0].content.parts[0]
      );

      updateMessages(apiResponceText);
    } catch (error) {
      updateMessages(error.message, true);
    }
  };

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <ChatButton setShowChatbot={setShowChatbot} />
      <div className="chatbot-popup">
        <ChatHeader setShowChatbot={setShowChatbot} />
        <ChatBody chatBodyRef={chatBodyRef} messages={messages} />
        <div className="chat-footer">
          <ChatForm
            setMessages={setMessages}
            messages={messages}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
