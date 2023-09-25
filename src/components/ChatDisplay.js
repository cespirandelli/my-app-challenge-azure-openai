import React, { useEffect, useRef } from "react";
import "./ChatDisplay.css";
import PropTypes from "prop-types";

function ChatDisplay({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatDisplayContainer">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`chatMessage ${
            message.type === "user" ? "userMessage" : "iaMessage"
          }`}
        >
          <span className="timestamp">{message.timestamp}</span>
          <p>{message.text}</p>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

ChatDisplay.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ChatDisplay;
