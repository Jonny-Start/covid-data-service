import { Schema, model, Document } from "mongoose";

/**
 * Representa los datos de un territorio específico relacionado con el COVID-19.
 */
interface ICovidData extends Document {
  nom_territorio: string;
  cantidad_dosis_aplicadas: number;
}

/**
 * Representa el esquema de la colección CovidData.
 */
const covidDataSchema = new Schema({
  nom_territorio: { type: String, required: true },
  cantidad_dosis_aplicadas: { type: Number, required: true },
});

export const CovidData = model<ICovidData>("CovidData", covidDataSchema);
