import ChatbotIcon from "./ChatbotIcon";

const ChatHeader = ({ setShowChatbot }) => {
  return (
    <div className="chat-header">
      <div className="header-info">
        <ChatbotIcon />
        <h2 className="logo-text">Chatbot</h2>
      </div>
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        className="material-symbols-rounded"
      >
        keyboard_arrow_down
      </button>
    </div>
  );
};

export default ChatHeader;
