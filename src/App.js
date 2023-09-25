import React, { useState, useEffect } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

function App() {
  const [recognizedText, setRecognizedText] = useState("");
  const [response, setResponse] = useState("");

  const startRecognition = () => {
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      "63e2e8cdd3774328b2d020432cd2d8a8",
      "eastus"
    );

    speechConfig.speechRecognitionLanguage = "pt-BR";

    let audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync(
      (result) => {
        setRecognizedText(result.text);
        recognizer.close();
      },
      (err) => {
        console.error(err);
        recognizer.close();
      }
    );
  };

  useEffect(() => {
    const getOpenAIResponse = async () => {
      try {
        const client = new OpenAIClient(
          "https://openai-instance-challenge-pcdata.openai.azure.com/",
          new AzureKeyCredential("46e6b1a583bc42238e25d2129ff70933")
        );

        const { choices } = await client.getCompletions(
          "teste-de-conexao-gpt-azure",
          [recognizedText]
        );

        for (const choice of choices) {
          setResponse(choice.text);
        }
      } catch (error) {
        console.error("Erro ao conectar à Azure OpenAI:", error);
      }
    };

    if (recognizedText) getOpenAIResponse();
  }, [recognizedText]);

  return (
    <div className="App">
      <button onClick={startRecognition}>Start Recognition</button>
      <p>{recognizedText}</p>
      <p>{response}</p>
    </div>
  );
}

export default App;
