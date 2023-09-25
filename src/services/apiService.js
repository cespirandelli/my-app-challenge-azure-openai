import axios from "axios";

const API_ENDPOINT = "http://localhost:5000";

export const getApiResponse = async (text) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/api/get-response`, {
      text,
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    let errorMessage = "An unexpected error occurred";
    if (error.response && error.response.data && error.response.data.text) {
      errorMessage = error.response.data.text;
    }
    throw new Error(errorMessage);
  }
};
