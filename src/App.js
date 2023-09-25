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
          // ensure res.text is available
          setResponse(res);
          setMessages((prevMessages) => [...prevMessages, `IA: ${res.text}`]);
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
    setRecognizedText(userMessage);
    setMessages((prevMessages) => [...prevMessages, `User: ${userMessage}`]);
  };

  return (
    <div className="App">
      <ErrorDisplay />
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
