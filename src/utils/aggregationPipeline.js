import { Router } from "express";
import { database } from "../index.js";

const aggergationPipelineRoutes = Router();

const getProducts = async (req, res) => {
  try {
    const products = database.collection("products");
    const randomProducts = await products
      .aggregate([
        {
          $match: {
            price: { $lt: 500 }, // Filter products with price less than 500
          },
        },
        {
          $group: {
            _id: "$name", // Group by the "name" field
            totalPrice: { $sum: "$price" },
          },
        },
      ])
      .toArray();

    return res.json({
      message: "Mongodb aggregation pipeline",
      count: randomProducts.length,
      randomProducts,
    });
  } catch (error) {
    console.log("Error on mongodb aggregation pipeline file : ", error.message);
  }
};

aggergationPipelineRoutes.get("/aggregate", getProducts);

export default aggergationPipelineRoutes;
