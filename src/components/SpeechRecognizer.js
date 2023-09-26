import { React, useState } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import "./SpeechRecognizer.css";
import PropTypes from "prop-types";
import { ClipLoader } from "react-spinners";

function SpeechRecognizer({ onRecognition }) {
  const [loading, setLoading] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  const startRecognition = () => {
    setLoading(true);
    setButtonPressed(true); // setting buttonPressed to true when recognition starts

    const speechConfig = sdk.SpeechConfig.fromSubscription(
      "63e2e8cdd3774328b2d020432cd2d8a8",
      "eastus"
    );

    console.log("Estou te ouvindo");

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
        setLoading(false);
        setButtonPressed(false);
        recognizer.close();
      },
      (error) => {
        console.error(error);
        setLoading(false);
        setButtonPressed(false);
        recognizer.close();
        // Informing the user that an error occurred during speech recognition.
        alert(
          "Ocorreu um erro durante o reconhecimento de fala. Por favor, tente novamente."
        );
      }
    );
  };

  return (
    <div className="speechRecognizerContainer">
      <button
        onClick={startRecognition}
        className="speechRecognizerButton"
        aria-pressed={buttonPressed}
        tabIndex={0}
      >
        Iniciar Assistente de Compras
      </button>
      {loading && <ClipLoader color="#000000" />}
      <div aria-live="assertive" className="visually-hidden">
        {loading && <p>Reconhecimento de fala está em progresso...</p>}
      </div>
    </div>
  );
}

SpeechRecognizer.propTypes = {
  onRecognition: PropTypes.func.isRequired,
};

export default SpeechRecognizer;
