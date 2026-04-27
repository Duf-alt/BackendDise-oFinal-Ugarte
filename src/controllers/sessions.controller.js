import User from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { generateToken } from "../config/jwt.js";

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).send("Usuario ya existe");

        const newUser = await User.create({
            email,
            password: createHash(password)
        });

        res.send({ message: "Usuario creado", user: newUser });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).send("Usuario no encontrado");

        if (!isValidPassword(user, password)) {
            return res.status(401).send("Password incorrecto");
        }

        const token = generateToken(user);

        res.send({
            message: "Login exitoso",
            token
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const current = (req, res) => {
    res.send(req.user);
};