const ChatButton = ({ setShowChatbot }) => {
  return (
    <button
      onClick={() => setShowChatbot((prev) => !prev)}
      id="chatbot-toggler"
    >
      <span className="material-symbols-rounded">mode_comment</span>
      <span className="material-symbols-rounded">close</span>
    </button>
  );
};

export default ChatButton;
