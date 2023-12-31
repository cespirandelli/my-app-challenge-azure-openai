import React, { useState, useRef, useEffect } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import "./SpeechRecognizer.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";

function SpeechRecognizer({ onRecognition }) {
  const [loading, setLoading] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!loading && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [loading]);

  const startRecognition = () => {
    setLoading(true);
    setButtonPressed(true);

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
        "Infelizmente, o serviço de reconhecimento de fala não está disponível neste navegador. Tente usar um navegador diferente que suporte essa funcionalidade."
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
      {loading && <ClipLoader color="#000000" />}
      <div aria-live="assertive" className="visually-hidden">
        {loading && <p>Reconhecimento de fala está em progresso...</p>}
      </div>
      <button
        onClick={startRecognition}
        className="speechRecognizerButton"
        aria-pressed={buttonPressed}
        tabIndex="0"
        aria-label="Iniciar reconhecimento de voz"
        ref={buttonRef}
      >
        <FontAwesomeIcon icon={faMicrophone} />
      </button>
    </div>
  );
}

SpeechRecognizer.propTypes = {
  onRecognition: PropTypes.func.isRequired,
};

export default SpeechRecognizer;
