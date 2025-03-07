import { useRef } from "react";

const ChatForm = ({ messages, setMessages, generateBotResponse }) => {
  const inputRef = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    inputRef.current.value = "";

    if (!userMessage) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userMessage, role: "user" },
    ]);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Thinking...", role: "model" },
      ]);

      generateBotResponse([...messages, { text: userMessage, role: "user" }]);
    }, 600);
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Type your message here..."
        className="message-input"
        required
        ref={inputRef}
      />
      <button className="material-symbols-rounded">arrow_upward</button>
    </form>
  );
};

export default ChatForm;
