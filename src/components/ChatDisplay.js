import React, { useEffect, useRef } from "react";
import "./ChatDisplay.css";

function ChatDisplay({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatDisplayContainer">
      {messages.map((message, index) => (
        <p
          key={index}
          className={`chatMessage ${
            message.includes("Usuário") ? "userMessage" : "iaMessage"
          }`}
        >
          {message}
        </p>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatDisplay;
