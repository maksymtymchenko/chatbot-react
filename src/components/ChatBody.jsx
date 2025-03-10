import ChatbotIcon from "./ChatbotIcon";
import ChatMessage from "./ChatMessage";

const ChatBody = ({ chatBodyRef, messages }) => {
  return (
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
  );
};

export default ChatBody;
