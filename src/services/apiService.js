import axios from "axios";

const API_ENDPOINT = "http://localhost:5000";

export const getApiResponse = async (text) => {
  try {
    console.log("API_ENDPOINT:", API_ENDPOINT);
    const response = await axios.post(`${API_ENDPOINT}/api/get-response`, {
      text,
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
