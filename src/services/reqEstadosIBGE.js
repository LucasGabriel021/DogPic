import api from "../config/apiIBGE";

export default async function reqEstadosIBGE() {
    try {
        const resultados = await api.get('');
        return resultados.data;
    } catch (error) {
        console.error("Erro ao fazer requisição à API: ", error);
    }
}
