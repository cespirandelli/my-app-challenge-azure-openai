import React, { useState, useEffect, useRef } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

function ChatDisplay({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ overflowY: "scroll", maxHeight: "200px" }}>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

function App() {
  const [recognizedText, setRecognizedText] = useState("");
  const [response, setResponse] = useState("");
  const [messages, setMessages] = useState([]);

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
        setRecognizedText(result.text);
        setMessages((prevMessages) => [
          ...prevMessages,
          `Usuário: ${result.text}`,
        ]);
        recognizer.close();
      },
      (error) => {
        console.error(error);
        recognizer.close();
      }
    );
  };

  useEffect(() => {
    const getOpenAIResponse = async () => {
      try {
        // Log the recognizedText to debug the input
        console.log("Input to OpenAI:", recognizedText);

        const client = new OpenAIClient(
          "https://openai-instance-challenge-pcdata.openai.azure.com/",
          new AzureKeyCredential("46e6b1a583bc42238e25d2129ff70933")
        );

        const { choices } = await client.getCompletions(
          "teste-de-conexao-gpt-azure",
          [recognizedText]
        );

        // Log the entire choices array to debug the output
        console.log("Output from OpenAI:", choices);
        console.log("Resposta completa da OpenAI:", choices[0]);

        if (choices.length > 0) {
          const delta = choices[0].text;
          setResponse(delta);
          setMessages((prevMessages) => [...prevMessages, `IA: ${delta}`]);
        }
      } catch (error) {
        console.error("Erro ao conectar ao Azure OpenAI:", error);
      }
    };

    if (recognizedText) getOpenAIResponse();
  }, [recognizedText]);

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

  return (
    <div className="App">
      <button onClick={startRecognition}>Iniciar Reconhecimento</button>
      <ChatDisplay messages={messages} />
    </div>
  );
}

export default App;
