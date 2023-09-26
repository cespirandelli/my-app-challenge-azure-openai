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
      aria-label="Chat Messages"
    >
      {messages.map((message) => (
        <div
          key={`${message.timestamp}-${message.type}`}
          className={`chatMessage ${
            message.type === "user" ? "userMessage" : "iaMessage"
          }`}
          tabIndex="0" // Makes the message focusable by keyboard
          role="article" // Represents the message as an independent piece of content
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
