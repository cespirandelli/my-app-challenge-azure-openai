import { useEffect, useCallback, useState } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import PropTypes from "prop-types";
import "./SpeechSynthesizer.css";

const speechKey = process.env.REACT_APP_SPEECH_KEY;
const speechRegion = process.env.REACT_APP_SPEECH_REGION;
const speechLanguage = "pt-BR-AntonioNeural";

function SpeechSynthesizer({ response, onError, LoadingComponent }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const speakText = useCallback(
    (response, synthesizer) => {
      let textToSpeak = "";
      if (!response) {
        console.error("Invalid response object:", response.data);
        setError("Received invalid response object.");
        if (onError) onError("Received invalid response object.");
        return;
      }

      if (Array.isArray(response.products) && response.products.length > 0) {
        const productDetails = response.products
          .map(
            (product) =>
              `Nome: ${product.name}, Descrição: ${product.description}, Preço: R$${product.price}, Loja: ${product.store}`
          )
          .join(". ");
        textToSpeak = "Os produtos disponíveis são: " + productDetails;
      } else if (response.text) {
        textToSpeak = response.text;
      } else {
        console.error(
          "Invalid response object: missing text or products",
          response
        );
        setError("Received invalid response object.");
        if (onError) onError("Received invalid response object.");
        return;
      }

      setLoading(true);
      console.log("Text to Speak:", textToSpeak); // Adicione esta linha

      synthesizer.speakTextAsync(
        textToSpeak,
        (result) => {
          if (result.reason !== sdk.ResultReason.SynthesizingAudioCompleted) {
            const errorDetails =
              "Síntese de fala cancelada: " + result.errorDetails;
            console.error(errorDetails);
            setError(errorDetails);
            if (onError) onError(errorDetails);
          }
          synthesizer.close();
          setLoading(false);
        },
        (error) => {
          const errorMsg = "Erro ocorrido: " + error;
          console.error(errorMsg);
          setError(errorMsg);
          if (onError) onError(errorMsg);
          synthesizer.close();
          setLoading(false);
        }
      );
    },
    [onError]
  );

  useEffect(() => {
    if (response) {
      console.log("Response que SpeechSynthesizer está lendo:", response); // Adicione esta linha

      const speechConfig = sdk.SpeechConfig.fromSubscription(
        speechKey,
        speechRegion
      );
      speechConfig.speechSynthesisVoiceName = speechLanguage;
      const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
      speakText(response, synthesizer);
    }
  }, [response, speakText]);

  return (
    <div
      aria-live="assertive"
      aria-atomic="true"
      role="status"
      aria-relevant="additions text"
    >
      {/* {loading && <LoadingComponent />} */}
      <div className="visually-hidden" aria-live="assertive">
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

SpeechSynthesizer.propTypes = {
  response: PropTypes.object,
  onError: PropTypes.func,
  LoadingComponent: PropTypes.element,
};

export default SpeechSynthesizer;
