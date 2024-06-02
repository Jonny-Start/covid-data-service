import { CovidDataModel } from "../repositories/covidRepository";
import axios from "axios";

const COVID_API_URL = "https://www.datos.gov.co/resource/prrv-jnta.json";

/**
 * Obtiene datos de COVID de la API y los almacena en la base de datos.
 * @returns {Promise<void>} Una promesa que se resuelve cuando los datos se almacenan correctamente.
 */
export const fetchAndStoreCovidData = async () => {
  const response = await axios.get(COVID_API_URL);
  const data = response.data.map((item: any) => ({
    fecha_aplicaci_n: item.fecha_aplicaci_n,
    a_o: item.a_o,
    cod_territorio: item.cod_territorio,
    nom_territorio: item.nom_territorio,
    cantidad_dosis_aplicadas: Number(item.cantidad_dosis_aplicadas),
    fecha_corte: item.fecha_corte,
  }));
  await CovidDataModel.insertMany(data);
};

/**
 * Recupera datos de COVID-19.
 * @param departamento - Opcional. El nombre del departamento por el que filtrar los datos.
 * @returns Una matriz de objetos que contiene el nombre del departamento y la cantidad de dosis administradas.
 */
export const getCovidData = async (departamento?: string) => {
  const query = departamento ? { nom_territorio: departamento } : {};
  const data = await CovidDataModel.find(query);
  return data.map((item) => ({
    departamento: item.nom_territorio,
    dosis_aplicadas: item.cantidad_dosis_aplicadas,
  }));
};
