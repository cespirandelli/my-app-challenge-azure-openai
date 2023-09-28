import React, { useEffect, useRef } from "react";
import "./ChatDisplay.css";
import PropTypes from "prop-types";
import ProductCard from "../ProductCard/ProductCard";

const renderTextMessage = (message, idx) => (
  <div
    key={`${message.timestamp}-${message.type}-${idx}`}
    className={`chatMessage ${
      message.type === "user" ? "userMessage" : "iaMessage"
    }`}
    tabIndex="0"
    role="article"
    aria-label={`${message.type === "user" ? "User" : "IA"}: ${message.text}`}
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
);

const renderProductMessage = (message, idx, onClick) => (
  <div key={`${message.timestamp}-${message.type}-${idx}`}>
    <ProductCard product={message.product} onAddToCart={onClick} />
  </div>
);

function ChatDisplay({ messages, onClick }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="chatDisplayContainer"
      role="region"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Mensagens do chat"
    >
      {messages.map((message, idx) => {
        // console.log({ idx, message });
        if (message.text) return renderTextMessage(message, idx);
        if (message.product) return renderProductMessage(message, idx, onClick);
        return null;
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

ChatDisplay.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      type: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ChatDisplay;
