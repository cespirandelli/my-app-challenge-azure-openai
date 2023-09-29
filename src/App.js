import React, { useState, useEffect, useCallback } from "react";
import SpeechRecognizer from "./components/SpeechRecognizer/SpeechRecognizer";
import SpeechSynthesizer from "./components/SpeechSynthesizer/SpeechSynthesizer";
import ChatDisplay from "./components/ChatDisplay/ChatDisplay";
import Title from "./components/Title/Title";
import ToggleContrast from "./components/ToggleContrast/ToggleContrast";
import Cart from "./components/Cart/Cart";
import ProductList from "./components/ProductList/ProductList";
import PurchaseConfirmation from "./components/PurchaseConfirmation/PurchaseConfirmation";
import { useError } from "./context/ErrorContext";
import { processApiResponse } from "./services/apiService";
import ChatSubtitle from "./components/ChatSubtitle";
import "./App.css";

function App() {
  const { setError } = useError();
  const [response, setResponse] = useState(null); // Modificado para null
  const [messages, setMessages] = useState([]);
  const [recognizedText, setRecognizedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [lastAddedItem, setLastAddedItem] = useState(null);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [isRestart, setIsRestart] = useState(false);

  const restartApp = () => {
    setResponse(null);
    setMessages([]);
    setRecognizedText("");
    setLoading(false);
    setProducts([]);
    setCart([]);
    setItemCount(0);
    setLastAddedItem(null);
    setPurchaseCompleted(false);
    setIsRestart(true);
  };

  const handleAddToCart = useCallback((product, index) => {
    setCart((prevCart) => [...prevCart, product]);
    setItemCount((prevCount) => prevCount + 1);
    setLastAddedItem(product);
    setResponse({
      specialText: `Item ${product.description} adicionado ao carrinho.`,
    });
  }, []);

  useEffect(() => {
    if(!response) return; 
    setResponse(null)
  }, [response])

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
    if (isRestart) {
      setResponse({
        text: "Que bom tê-lo de volta! O que gostaria de buscar agora?",
      });
      setIsRestart(false);
    }
  }, [isRestart]);


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

  useEffect(() => {
    if(purchaseCompleted) {
     setResponse({text:  "Obrigado pela sua preferencia. Seu produto já está indo até você"})
    }

  }, [purchaseCompleted])

  const handleRecognition = (userMessage) => {
    const timestamp = new Date().toLocaleTimeString();
    setRecognizedText(userMessage);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userMessage, timestamp, type: "user" },
    ]);
  };

  const handleFinishSpeaking = () => {
    console.log("Terminou de falar");
  };


  const chatSubtitle =
    "Para selecionar o assistente de voz para compras, aperte TAB e em seguida Enter para confirmar e começar a falar. Para começar pergunte por exemplo 'qual é o preço da carne?'. Evite buscar palavras individuais, a pesquisa pode ser feita a pesquisa de um item por vez. Exemplos de itens: [arroz, carne, farinha de trigo]";
  return (
    <div className="app-container" role="main">
      <h1 className="visually-hidden">Aplicativo de Compras</h1>

      <Title />
      <ToggleContrast />
      <SpeechSynthesizer
        response={response}
        onError={setError}
        onFinishSpeaking={handleFinishSpeaking}
        aria-live="assertive"
      />

      {!purchaseCompleted && (
        <ChatSubtitle text={chatSubtitle} aria-live="polite" />
      )}

      {purchaseCompleted ? (
        <PurchaseConfirmation onRestart={restartApp} tabIndex="0" />
      ) : (
        <>
          <ChatDisplay
            messages={messages}
            onClick={(message) => 
              handleAddToCart(message, message.productId)
            }
            tabIndex="0"
          />
          <Cart
            cart={cart}
            itemCount={itemCount}
            lastAddedItem={lastAddedItem}
            onFinalizePurchase={() => setPurchaseCompleted(true)}
            tabIndex="0"
          />
          <SpeechRecognizer
            onRecognition={handleRecognition}
            tabIndex="0"
            aria-label="Iniciar reconhecimento de voz"
          />
        </>
      )}
    </div>
  );
}

export default App;
