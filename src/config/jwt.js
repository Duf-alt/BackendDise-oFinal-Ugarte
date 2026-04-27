import jwt from "jsonwebtoken";

export const PRIVATE_KEY = "supersecreto"; // 🔐 luego lo pasamos a .env

// 🔥 GENERAR TOKEN
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    PRIVATE_KEY,
    { expiresIn: "1h" }
  );
};

// 🔐 MIDDLEWARE (LEE DESDE COOKIES)
export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send("No autenticado");
    }

    const user = jwt.verify(token, PRIVATE_KEY);

    req.user = user;
    next();

  } catch (error) {
    return res.status(403).send("Token inválido");
  }
};