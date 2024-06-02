import express from "express";
import mongoose from "mongoose";
import covidRoutes from "./routes/covidRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Middleware para permitir CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose.set("strictQuery", false);

app.use("/api", covidRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});

const PORT = process.env.PORT || 3000;

/**
 * El URI de conexión de MongoDB.
 * Se obtiene de la variable de entorno MONGO_URI, o de una cadena vacía si no se proporciona.
 */
const MONGO_URI = process.env.MONGO_URI || "";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

export { app };
