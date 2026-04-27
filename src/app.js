import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import sessionsRouter from "./routes/sessions.router.js";

// Configuración de variables de entorno
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api/sessions", sessionsRouter);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo conectado 🚀"))
  .catch(err => console.error("Error Mongo:", err));

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});