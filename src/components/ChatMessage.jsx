import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({ message }) => {
  return (
    <div
      className={`message ${
        message.role === "model" ? "bot" : "user"
      }-message ${message.isError ? "error" : ""}`}
    >
      {message.role === "model" && <ChatbotIcon />}
      <p className="message-text">{message.text}</p>
    </div>
  );
};

export default ChatMessage;
