import { useEffect, useCallback } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

function SpeechSynthesizer({ response, onError, LoadingComponent }) {
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
          }
          synthesizer.close();
        },
        (error) => {
          console.error("Erro ocorrido: " + error);
          if (onError) onError(error);
          synthesizer.close();
        }
      );
    },
    [onError]
  );

  useEffect(() => {
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

  return LoadingComponent ? <LoadingComponent /> : null;
}

export default SpeechSynthesizer;
