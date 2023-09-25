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

    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert(
        "O serviço de reconhecimento de fala não está disponível neste navegador."
      );
      return;
    }

    recognizer.recognizeOnceAsync(
      (result) => {
        const userMessage = `${result.text}`;
        onRecognition(userMessage); // Informing the parent component about the recognized text.
        recognizer.close();
      },
      (error) => {
        console.error(error);
        recognizer.close();
        // Informing the user that an error occurred during speech recognition.
        alert(
          "Ocorreu um erro durante o reconhecimento de fala. Por favor, tente novamente."
        );
      }
    );
  };

  return (
    <button onClick={startRecognition} style={buttonStyle}>
      Iniciar Reconhecimento
    </button>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  background: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
};

export default SpeechRecognizer;
