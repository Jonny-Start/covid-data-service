import { CovidData } from "../models/covidData";
import mongoose from "mongoose";

/**
 * Guarda los datos de COVID en la base de datos.
 * @param data: una serie de objetos que contienen los datos de COVID que se guardarán.
 */
export const saveCovidData = async (
  data: { nom_territorio: string; cantidad_dosis_aplicadas: number }[]
) => {
  await CovidData.insertMany(data);
};

/**
 * Recupera todos los registros de CovidData de la base de datos.
 * @returns {Promise<CovidData[]>} Una promesa que se resuelve en una matriz de objetos CovidData.
 */
export const getAllCovidData = async () => {
  return await CovidData.find();
};

/**
 * Recupera datos de COVID-19 para un departamento específico.
 * @param departamento: el nombre del departamento para el que se recuperarán los datos.
 * @returns Una promesa que se resuelve en una serie de objetos de datos de COVID-19 que coinciden con el departamento especificado.
 */
export const getCovidDataByDepartment = async (department: string) => {
  return await CovidData.find({ nom_territorio: department });
};

/**
 * Representa el esquema de datos de Covid.
 */
const CovidDataSchema = new mongoose.Schema({
  fecha_aplicaci_n: Date,
  a_o: String,
  cod_territorio: String,
  nom_territorio: String,
  cantidad_dosis_aplicadas: Number,
  fecha_corte: Date,
});

/**
 * Representa el CovidDataModel utilizado para interactuar con la colección CovidData en la base de datos.
 * Si el modelo ya existe, se utiliza; de lo contrario, se crea un nuevo modelo.
 */
export const CovidDataModel =
  mongoose.models.CovidData || mongoose.model("CovidData", CovidDataSchema);
