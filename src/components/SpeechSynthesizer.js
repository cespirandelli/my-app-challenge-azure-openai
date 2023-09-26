import { useEffect, useCallback, useState } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import PropTypes from "prop-types";
import "./SpeechRecognizer.css";

function SpeechSynthesizer({ response, onError, LoadingComponent }) {
  const [error, setError] = useState(null); // Added state for error

  const speakText = useCallback(
    (response, synthesizer) => {
      if (typeof response !== "object" || !response.text) {
        console.error("Invalid response object:", response);
        if (onError) onError("Received invalid response object.");
        return;
      }

      synthesizer.speakTextAsync(
        response.text,
        (result) => {
          if (result.reason !== sdk.ResultReason.SynthesizingAudioCompleted) {
            console.error("Síntese de fala cancelada: " + result.errorDetails);
            if (onError) onError(result.errorDetails);
            setError(result.errorDetails); // Set the error state here
          }
          synthesizer.close();
        },
        (error) => {
          console.error("Erro ocorrido: " + error);
          if (onError) onError(error);
          setError(error.toString()); // Set the error state here
          synthesizer.close();
        }
      );
    },
    [onError]
  );

  useEffect(() => {
    console.log("Response Prop Value:", response); // Add this line
    if (response) {
      const speechConfig = sdk.SpeechConfig.fromSubscription(
        "fa58155756e94a60bdc515e3669b4416",
        "eastus"
      );

      speechConfig.speechSynthesisVoiceName = "pt-BR-AntonioNeural";
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
      {LoadingComponent ? <LoadingComponent /> : null}
      <div className="visually-hidden" aria-live="assertive">
        {error && <p>{error}</p>} {/* Changed from onError to error */}
      </div>
    </div>
  );
}

SpeechSynthesizer.propTypes = {
  onError: PropTypes.func,
  LoadingComponent: PropTypes.element,
};

export default SpeechSynthesizer;
