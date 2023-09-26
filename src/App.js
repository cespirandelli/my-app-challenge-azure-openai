import React, { useState, useEffect, useCallback } from "react";
import { ClipLoader } from "react-spinners";
import SpeechRecognizer from "./components/SpeechRecognizer";
import SpeechSynthesizer from "./components/SpeechSynthesizer";
import ChatDisplay from "./components/ChatDisplay";
import ErrorDisplay from "./components/ErrorDisplay";
import Title from "./components/Title";
import ToggleContrast from "./components/ToggleContrast";
import { useError } from "./context/ErrorContext";
import { getApiResponse } from "./services/apiService";

function App() {
  const { setError } = useError();
  const [response, setResponse] = useState("");
  const [messages, setMessages] = useState([]);
  const [recognizedText, setRecognizedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApiResponse = useCallback(
    (response) => {
      if (response && response.text) {
        setResponse(response);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: `${response.text}`,
            timestamp: new Date().toLocaleTimeString(),
            type: "ia",
          },
        ]);
      } else {
        console.error(
          "Invalid response or response.text is missing:",
          response
        );
        setError("Received invalid response from the server.");
      }
    },
    [setError]
  );

  useEffect(() => {
    if (recognizedText.trim() === "") return;
    setLoading(true);

    getApiResponse(recognizedText)
      .then(handleApiResponse)
      .catch((error) => {
        console.error(error);
        setError(error.message || "An unexpected error occurred");
      })
      .finally(() => setLoading(false));
  }, [recognizedText, handleApiResponse, setError]);

  const handleRecognition = (userMessage) => {
    const timestamp = new Date().toLocaleTimeString();
    setRecognizedText(userMessage);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: `${userMessage}`, timestamp, type: "user" },
    ]);
  };

  return (
    <div className="App" role="main" aria-live="polite">
      <ErrorDisplay />
      <Title />
      <ToggleContrast />
      <SpeechRecognizer onRecognition={handleRecognition} />
      <ChatDisplay
        messages={messages}
        className="ChatDisplay"
        aria-label="Exibição de Chat"
      />
      {loading ? (
        <ClipLoader color="#000000" aria-label="Carregando" />
      ) : (
        <SpeechSynthesizer
          response={response}
          aria-label="Sintetizador de Fala"
        />
      )}
    </div>
  );
}

export default App;
