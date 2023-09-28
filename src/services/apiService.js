import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const UNEXPECTED_ERROR_MESSAGE = "An unexpected error occurred";
const UNEXPECTED_RESPONSE_FORMAT_MESSAGE = "Unexpected response format";
const INVALID_VOICE_MESSAGE =
  "Não foi possível detectar nenhuma voz. Por favor, tente novamente.";

const isInvalidText = (text) =>
  !text?.trim() || text.trim().toLowerCase() === "undefined";

const processApiResponse = async (text, handleApiResponse, setError) => {
  if (isInvalidText(text)) {
    handleApiResponse({ text: INVALID_VOICE_MESSAGE });
    return;
  }

  try {
    const response = await axios.post(
      `${API_ENDPOINT}/api/receber-json`,
      {
        text,
      },
      { withCredentials: true }
    );
    console.log({ response });
    if (Array.isArray(response.data)) {
      handleApiResponse(transformResponseData(response.data));
    } else {
      console.warn(UNEXPECTED_RESPONSE_FORMAT_MESSAGE, response.data);
      setError(UNEXPECTED_RESPONSE_FORMAT_MESSAGE);
    }
  } catch (error) {
    console.error("API Error:", error);
    let errorMessage = UNEXPECTED_ERROR_MESSAGE;
    if (error.response?.data?.text) {
      errorMessage = error.response.data.text;
    }
    setError(errorMessage);
  }
};

const transformResponseData = (data) =>
  data.map((item) => ({
    score: item["@search.score"],
    code: item.Codigo,
    product: item.Product,
    description: item.Description,
    store: item.Store,
    price: parseFloat(item.Price),
    link: item.Link,
    address: item.Address,
    distance: item.Distance,
  }));

export { processApiResponse };
