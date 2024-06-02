import { Request, Response } from "express";
import { getCovidData, fetchAndStoreCovidData } from "../domain/covidDomain";

/**
 * Actualiza los datos de COVID obteniendo y almacenando la información más reciente.
 *
 * @param req: el objeto de solicitud.
 * @param res: el objeto de respuesta.
 */
export const updateCovidData = async (req: Request, res: Response) => {
  try {
    await fetchAndStoreCovidData();
    res.status(200).json({ message: "Data updated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Función de controlador para obtener datos de COVID-19 para un departamento específico.
 *
 * @param req: el objeto de solicitud.
 * @param res: el objeto de respuesta.
 */
export const getCovidDataHandler = async (req: Request, res: Response) => {
  try {
    const { departamento } = req.query;
    const data = await getCovidData(departamento as string | undefined);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
