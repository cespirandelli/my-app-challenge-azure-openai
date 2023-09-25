import React from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

function SpeechRecognizer({ onRecognition }) {
  const startRecognition = () => {
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      "63e2e8cdd3774328b2d020432cd2d8a8",
      "eastus"
    );

    speechConfig.speechRecognitionLanguage = "pt-BR";
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync(
      (result) => {
        const userMessage = `Usuário: ${result.text}`;
        onRecognition(userMessage); // Aqui informamos ao componente pai sobre o texto reconhecido.
        recognizer.close();
      },
      (error) => {
        console.error(error);
        recognizer.close();
      }
    );
  };

  return <button onClick={startRecognition}>Iniciar Reconhecimento</button>;
}

export default SpeechRecognizer;
