// src/models/cart.model.js
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: []
});

export const CartModel = mongoose.model("carts", cartSchema);