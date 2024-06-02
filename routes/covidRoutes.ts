import { Router } from "express";
import {
  updateCovidData,
  getCovidDataHandler,
} from "../controllers/covidController";

/**
 * Instancia de enrutador Express para manejar rutas COVID.
 */
const router = Router();

router.get("/update", updateCovidData);
router.get("/vacunas", getCovidDataHandler);

export default router;
