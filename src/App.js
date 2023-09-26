import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import SpeechRecognizer from "./components/SpeechRecognizer";
import SpeechSynthesizer from "./components/SpeechSynthesizer";
import ChatDisplay from "./components/ChatDisplay";
import ErrorDisplay from "./components/ErrorDisplay";
import { useError } from "./context/ErrorContext";
import { getApiResponse } from "./services/apiService";

function App() {
  const { setError } = useError();
  const [response, setResponse] = useState("");
  const [messages, setMessages] = useState([]);
  const [recognizedText, setRecognizedText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (recognizedText.trim() === "") return;
    setLoading(true);

    getApiResponse(recognizedText)
      .then((res) => {
        if (res && res.text) {
          setResponse(res);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: `IA: ${res.text}`,
              timestamp: new Date().toLocaleTimeString(),
              type: "ia",
            },
          ]);
        } else {
          console.error("Invalid response or response.text is missing:", res);
          setError("Received invalid response from the server.");
        }
      })
      .catch((error) => {
        console.error(error);
        setError(error.message || "An unexpected error occurred");
      })
      .finally(() => setLoading(false));
  }, [recognizedText, setError]);

  const handleRecognition = (userMessage) => {
    const timestamp = new Date().toLocaleTimeString();
    setRecognizedText(userMessage);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: `User: ${userMessage}`, timestamp, type: "user" },
    ]);
  };

  return (
    <div className="App">
      <ErrorDisplay />
      <div className="titleContainer">
        <h1 className="appTitle">Your Chat Application</h1>
      </div>
      <SpeechRecognizer onRecognition={handleRecognition} />
      <ChatDisplay messages={messages} className="ChatDisplay" />
      {loading ? (
        <ClipLoader color="#000000" />
      ) : (
        <SpeechSynthesizer response={response} />
      )}
    </div>
  );
}

export default App;
