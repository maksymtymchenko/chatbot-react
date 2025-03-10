import { useState, useRef, useEffect } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import ChatHeader from "./components/ChatHeader";

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
      const apiResponceText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

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
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        id="chatbot-toggler"
      >
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>
      <div className="chatbot-popup">
        <ChatHeader setShowChatbot={setShowChatbot} />
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hi, I'm the Chatbot. How can I help you today?
            </p>
          </div>
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
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
