import React, { useState, useEffect } from "react";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import SpeechRecognizer from "./components/SpeechRecognizer";
import SpeechSynthesizer from "./components/SpeechSynthesizer";
import ChatDisplay from "./components/ChatDisplay";

function App() {
  const [response, setResponse] = useState("");
  const [messages, setMessages] = useState([]);
  const [recognizedText, setRecognizedText] = useState("");

  useEffect(() => {
    const getOpenAIResponse = async () => {
      try {
        // Log the recognizedText to debug the input
        console.log("Input to OpenAI:", recognizedText);

        const client = new OpenAIClient(
          "https://openai-instance-challenge-pcdata.openai.azure.com/",
          new AzureKeyCredential("46e6b1a583bc42238e25d2129ff70933")
        );

        const { choices } = await client.getCompletions(
          "teste-de-conexao-gpt-azure",
          [recognizedText],
          { max_tokens: 2000 }
        );

        // Log the entire choices array to debug the output
        console.log("Output from OpenAI:", choices);
        console.log("Resposta completa da OpenAI:", choices[0]);

        if (choices.length > 0) {
          const delta = choices[0].text;
          setResponse(delta);
          setMessages((prevMessages) => [...prevMessages, `IA: ${delta}`]);
        }
      } catch (error) {
        console.error("Erro ao conectar ao Azure OpenAI:", error);
      }
    };

    if (recognizedText && recognizedText.trim() !== "") getOpenAIResponse();
  }, [recognizedText]);

  const handleRecognition = (userMessage) => {
    setRecognizedText(userMessage);
    setMessages((prevMessages) => [...prevMessages, userMessage]);
  };

  return (
    <div className="App">
      <SpeechRecognizer onRecognition={handleRecognition} />
      <ChatDisplay messages={messages} />
      <SpeechSynthesizer response={response} />
    </div>
  );
}

export default App;
