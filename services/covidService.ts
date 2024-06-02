import axios from "axios";

/**
 * Obtiene datos de COVID desde una API remota.
 * @returns {Promise<any>} Una promesa que se resuelve en los datos de COVID obtenidos.
 */
export const fetchCovidData = async () => {
  const response = await axios.get(
    "https://www.datos.gov.co/resource/prrv-jnta.json"
  );
  return response.data;
};
