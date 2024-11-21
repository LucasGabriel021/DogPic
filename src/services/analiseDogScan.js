import { PAT, USER_ID, APP_ID, MODEL_ID, MODEL_VERSION_ID } from "../config/clarifai"; 

export const analiseDogClarifai = async (base64Image) => {
     const raw = JSON.stringify({
        "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
        },
        "inputs": [
          {
               "data": {
                    "image": {
                         "base64": base64Image
                    }
               }
          }
        ]  
     });

     const requestOptions = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT,
            'Content-Type': 'application/json'
          },
          body: raw
     };

     // Requisição a API
     try {
          const response = await fetch(
            `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
            requestOptions
          );
          const result = await response.json();
          return result;
     } catch (error) {
          console.error("Erro ao analisar a imagem com Clarifai:", error);
          throw error;
     }
}
