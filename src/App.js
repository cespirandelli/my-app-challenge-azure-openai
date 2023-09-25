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

        if (choices.length > 0) {
          setResponse(choices[0].text);
        }
      } catch (error) {
        console.error("Error connecting to Azure OpenAI:", error);
      }
    };

    if (recognizedText) getOpenAIResponse();
  }, [recognizedText]);

  useEffect(() => {
    if (response) {
      // Configuração da Speech SDK para sintetizar o texto
      const speechConfig = sdk.SpeechConfig.fromSubscription(
        "fa58155756e94a60bdc515e3669b4416",
        "eastus"
      );
      const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();

      speechConfig.speechSynthesisVoiceName = "pt-BR-AntonioNeural "; // Exemplo de voz em Português do Brasil

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
        function (err) {
          console.trace("Erro ocorrido: " + err);
          synthesizer.close();
        }
      );
    }
  }, [response]);

  return (
    <div className="App">
      <button onClick={startRecognition}>Start Recognition</button>
      <p>{recognizedText}</p>
      <p>{response}</p>
    </div>
  );
}

export default App;
