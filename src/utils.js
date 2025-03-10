export const getMessageText = (message) => {
    return message.text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
};