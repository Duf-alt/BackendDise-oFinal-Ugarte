import { Router } from "express";
import {
  register,
  login,
  current
} from "../controllers/sessions.controller.js";

import { authMiddleware } from "../config/jwt.js";

const router = Router();

// Registro de usuario
router.post("/register", register);

// Login (devuelve token)
router.post("/login", login);

// Ruta protegida (requiere token)
router.get("/current", authMiddleware, current);

export default router;