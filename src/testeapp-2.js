import "./App.css";
import React, { useState, useEffect } from "react";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { ClipLoader } from "react-spinners";
import SpeechRecognizer from "./components/SpeechRecognizer";
import SpeechSynthesizer from "./components/SpeechSynthesizer";
import ChatDisplay from "./components/ChatDisplay";
import ErrorDisplay from "./components/ErrorDisplay/ErrorDisplay";
import { useError } from "./context/ErrorContext";

function App() {
  const { setError } = useError();
  const [response, setResponse] = useState("");
  const [messages, setMessages] = useState([]);
  const [recognizedText, setRecognizedText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getOpenAIResponse = async () => {
      if (!recognizedText.trim()) return; // se recognizedText for vazio, retorna early
      setLoading(true); // Define loading como true antes de começar a chamada de API
      try {
        // Log the recognizedText to debug the input
        console.log("Input to OpenAI:", recognizedText);

        const client = new OpenAIClient(
          "https://openai-instance-challenge-pcdata.openai.azure.com/",
          new AzureKeyCredential("46e6b1a583bc42238e25d2129ff70933")
          // process.env.REACT_APP_OPENAI_ENDPOINT, // Use environment variable to store endpoint
          // new AzureKeyCredential(process.env.REACT_APP_AZURE_KEY) // Use environment variable to store API Key
        );

        // Destructure the choices property from the response
        const { choices } = await client.getCompletions(
          "teste-de-conexao-gpt-azure",
          [recognizedText],
          { max_tokens: 100 }
        );

        console.log("Output from OpenAI:", choices);

        // Check if choices array is not empty and if the first choice has text property
        if (choices.length > 0 && choices[0].text) {
          const delta = choices[0].text;
          setResponse(delta);
          setMessages((prevMessages) => [...prevMessages, `IA: ${delta}`]);
        }
      } catch (error) {
        console.error("Error connecting to Azure OpenAI:", error);
        setError(error.message || "An unexpected error occurred");
      } finally {
        setLoading(false); // Define loading como false quando a chamada de API termina
      }
    };

    // Call the getOpenAIResponse function if recognizedText is not empty
    if (recognizedText && recognizedText.trim() !== "") getOpenAIResponse();
  }, [recognizedText, setError]);

  // Handle recognition and update states accordingly
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
