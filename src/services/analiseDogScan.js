import axios from "axios";

const API_KEY = "AIzaSyC11_1ZmrVCQKLctTELIsd3pfFCzqZhruI"; // Credencial do Google Vision API
const BASE_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

export const analiseDogScan = async (base64Image) => {
     try {
          const resposta = await axios.post(BASE_URL, {
               requests: [
                    {
                         image: {
                              content: base64Image,
                         },
                         features: [
                              {
                                   type: "LABEL_DETECTION",
                                   maxResults: 6,
                              }
                         ]
                    }
               ]
          });

          console.log("Resultado da análise: ", response.data);
          return response.data;
     } catch (error) {
          console.error("Erro ao analisar a imagem: ", error);
          throw error;
     }
}