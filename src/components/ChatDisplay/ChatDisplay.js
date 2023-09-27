import React, { useEffect, useRef } from "react";
import "./ChatDisplay.css";
import PropTypes from "prop-types";

function ChatDisplay({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="chatDisplayContainer"
      role="region"
      aria-live="polite"
      aria-label="Mensagens do chat"
    >
      {messages.map((message, idx) => (
        <div
          key={`${message.timestamp}-${message.type}-${idx}`}
          className={`chatMessage ${
            message.type === "user" ? "userMessage" : "iaMessage"
          }`}
          tabIndex="0"
          role="article"
          aria-label={`${message.type === "user" ? "User" : "IA"}: ${
            message.text
          }`}
        >
          <span className="timestamp" aria-hidden="true">
            {message.timestamp}
          </span>
          <p>
            {message.type === "user"
              ? `User: ${message.text}`
              : `IA: ${message.text}`}
          </p>
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
