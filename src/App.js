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
    // {
    //   text: "default",
    //   timestamp: new Date().toLocaleTimeString(),
    //   type: "ia",
    // },
    // {
    //   text: "default",
    //   timestamp: new Date().toLocaleTimeString(),
    //   type: "user",
    // },
    // {
    //   product: {
    //     codigo: "1",
    //     product: "default",
    //     description: "default",
    //     store: "default",
    //     price: "default",
    //     link: "default",
    //     distance: "default",
    //   },
    //   timestamp: new Date().toLocaleTimeString(),
    //   type: "product",
    // },
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
      console.log({ apiResponse });
      setLoading(false);
      if (
        !apiResponse ||
        (Array.isArray(apiResponse) && apiResponse.length === 0)
      ) {
        console.error("Invalid response object received:", apiResponse);
        setError("Received invalid response from the server.");
        return;
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
        setResponse(apiResponse);
        return;
      }

      console.log("Produtos recebidos:", apiResponse);
      setProducts(
        apiResponse.map((product, id) => ({ ...product, productId: id }))
      );
    },
    [setError]
  );

  useEffect(() => {
    if (!products || products.length === 0) return;
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: "Encontrei essa lista de produtos para você:",
        timestamp: new Date().toLocaleTimeString(),
        type: "ia",
      },
      ...products.map((product) => ({
        product,
        timestamp: new Date().toLocaleTimeString(),
        type: "product",
      })),
    ]);
  }, [products]);

  useEffect(() => {
    if (products && products.length > 0) {
      let resposta = "Encontrei esses produtos para você: ";

      products.forEach((product, index) => {
        const nome = product.product ?? "Nome indisponível";
        const descricao = product.description ?? "Descrição indisponível";

        let preco = product.price ?? "Valor indisponível";
        // Se o preço é um número, converta para string e substitua o ponto por vírgula.
        if (typeof preco === "number") {
          preco = preco.toString().replace(".", ",");
        }

        resposta += `Item ${
          index + 1
        }: ${nome}, ${descricao}, por ${preco} reais. `;
      });

      console.log("Resposta construída:", resposta);
      setResponse({ text: resposta });
    }
  }, [products]);

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
      <SpeechSynthesizer response={response} onError={setError} />
      <ChatSubtitle text={chatSubtitle} />

      {/* <ErrorDisplay /> */}
      {/* <ToggleContrast /> */}
      <ChatDisplay
        messages={messages}
        onClick={(message) => console.log("cliquei na message:", { message })}
      />
      {/* <ProductList products={[]} onAddToCart={handleAddToCart} /> */}

      {/* <Cart cart={cart} /> */}

      <SpeechRecognizer onRecognition={handleRecognition} />
    </div>
  );
}

export default App;
