import React from "react";
import "./index.css";

export default function ChatSubtitle() {
  return (
    <small className="chatsubtitle" role="contentinfo" aria-live="polite">
      <p>Para selecionar o assistente de voz para compras:</p>
      <ol>
        <li>Aperte TAB.</li>
        <li>Pressione Enter para confirmar e começar a falar.</li>
      </ol>
      <p>Para começar pergunte, por exemplo, 'qual é o preço da carne?'.</p>
      <p>
        Evite buscar palavras individuais, a pesquisa pode ser feita de um item
        por vez. Exemplos de itens: [arroz, carne, farinha de trigo]
      </p>
    </small>
  );
}
