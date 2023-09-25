import React, { useEffect, useRef } from "react";

function ChatDisplay({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ overflowY: "scroll", maxHeight: "200px" }}>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatDisplay;
