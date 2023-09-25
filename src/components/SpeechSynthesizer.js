import { useEffect } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

function SpeechSynthesizer({ response }) {
  useEffect(() => {
    if (response) {
      const speechConfig = sdk.SpeechConfig.fromSubscription(
        "fa58155756e94a60bdc515e3669b4416",
        "eastus"
      );

      speechConfig.speechSynthesisVoiceName = "pt-BR-AntonioNeural";
      const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

      synthesizer.speakTextAsync(
        response,
        function (result) {
          if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            console.log("Síntese concluída.");
          } else {
            console.error("Síntese de fala cancelada: " + result.errorDetails);
          }
          synthesizer.close();
        },
        function (error) {
          console.trace("Erro ocorrido: " + error);
          synthesizer.close();
        }
      );
    }
  }, [response]);

  return null;
}

export default SpeechSynthesizer;
