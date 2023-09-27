import React, { useState, useEffect, useCallback } from "react";
import SpeechRecognizer from "./components/SpeechRecognizer/SpeechRecognizer";
import SpeechSynthesizer from "./components/SpeechSynthesizer/SpeechSynthesizer";
import ChatDisplay from "./components/ChatDisplay/ChatDisplay";
import ErrorDisplay from "./components/ErrorDisplay/ErrorDisplay";
import Title from "./components/Title/Title";
import ToggleContrast from "./components/ToggleContrast/ToggleContrast";
import Cart from "./components/Cart/Cart";
import ProductList from "./components/ProductList/ProductList";
import { useError } from "./context/ErrorContext";
import { processApiResponse } from "./services/apiService";
import ChatSubtitle from "./components/ChatSubtitle";
import "./App.css";

function App() {
  const { setError } = useError();
  const [response, setResponse] = useState(null); // Modificado para null
  const [messages, setMessages] = useState([
    {
      text: "default",
      timestamp: new Date().toLocaleTimeString(),
      type: "ia",
    },
    {
      text: "default",
      timestamp: new Date().toLocaleTimeString(),
      type: "user",
    },
  ]);
  const [recognizedText, setRecognizedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const handleAddToCart = useCallback((product) => {
    setCart((prevCart) => [...prevCart, product]);
  }, []);

  const handleApiResponse = useCallback(
    (apiResponse) => {
      setLoading(false);
      if (apiResponse) {
        if (apiResponse.text || apiResponse.products) {
          setResponse(apiResponse); // Modificado para armazenar a resposta da API
        }
        if (apiResponse.text) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: apiResponse.text,
              timestamp: new Date().toLocaleTimeString(),
              type: "ia",
            },
          ]);
        }
        if (apiResponse.products) {
          console.log("Produtos recebidos:", apiResponse.products);
          setProducts(apiResponse.products);
        }
      } else {
        console.error("Invalid response object received:", apiResponse);
        setError("Received invalid response from the server.");
      }
    },
    [setError]
  );

  useEffect(() => {
    if (recognizedText.trim()) {
      setLoading(true);
      processApiResponse(recognizedText, handleApiResponse, setError);
    }
  }, [recognizedText, handleApiResponse, setError]);

  const handleRecognition = (userMessage) => {
    const timestamp = new Date().toLocaleTimeString();
    setRecognizedText(userMessage);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userMessage, timestamp, type: "user" },
    ]);
  };

  const chatSubtitle =
    'Clique no botão ou selecione com TAB em seguida ENTER para inicializar seu assistente pessoal de compras. Toda interação pode ser feita com voz. Para começar pergunte por exemplo "qual é o preço da carne?"';

  return (
    <div className="app-container">
      <Title />
      <ChatSubtitle text={chatSubtitle} />

      {/* <ErrorDisplay /> */}
      {/* <ToggleContrast /> */}
      <ChatDisplay messages={messages} />
      <SpeechRecognizer onRecognition={handleRecognition} />

      {/* 
      <div>
        {products.length > 0 && (
          <ProductList products={products} onAddToCart={handleAddToCart} />
        )}
        <Cart cart={cart} />
      </div> */}
    </div>
  );
}

export default App;
