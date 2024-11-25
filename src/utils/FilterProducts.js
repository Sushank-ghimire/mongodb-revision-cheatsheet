import { Router } from "express";
import { database } from "../index.js";

const porductFilterRoute = Router();

const filterProductPriceLess = async (req, res) => {
  try {
    const { price } = req.params;
    // Ensure price is a valid number
    const parsedPrice = parseInt(price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({ message: "Invalid price value." });
    }

    const products = database.collection("products");
    const filteredProducts = await products
      .find({ price: { $lt: parsedPrice } })
      .sort({ price: 1 })
      .toArray();
    return res.json({
      message: "Filtered by the lessprice than you entered.",
      count: filteredProducts.length,
      filteredProducts,
    });
  } catch (error) {
    console.log("Error while filtering products : ", error.message);
  }
};

porductFilterRoute.get("/lessprice/:price", filterProductPriceLess);

const filterProductPriceGreat = async (req, res) => {
  try {
    const { price } = req.params;
    // Ensure price is a valid number
    const parsedPrice = parseInt(price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({ message: "Invalid price value." });
    }

    const products = database.collection("products");
    const filteredProducts = await products
      .find({ price: { $gt: parsedPrice } })
      .sort({ price: 1 })
      .toArray();
    return res.json({
      message: "Filtered by the greater price than you entered.",
      count: filteredProducts.length,
      filteredProducts,
    });
  } catch (error) {
    console.log("Error while filtering products : ", error.message);
  }
};

porductFilterRoute.get("/greaterprice/:price", filterProductPriceGreat);

export default porductFilterRoute;
