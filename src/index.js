import express from "express";
import { MongoClient } from "mongodb";
import {
  addProduct,
  getSpecificProduct,
  removeProduct,
  updateProduct,
} from "./utils/queries.js";
import commentRoutes from "./utils/comments.js";
import porductFilterRoute from "./utils/FilterProducts.js";
import aggergationPipelineRoutes from "./utils/aggregationPipeline.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection details
const uri = "mongodb://localhost:27017";
export const client = new MongoClient(uri);
export const database = client.db("Learning");

(async () => {
  try {
    await client.connect();

    app.get("/", (req, res) => {
      res.send("MongoDB revision");
    });

    app.get("/collection/:name", async (req, res) => {
      const collectionName = req.params.name;

      try {
        const collection = database.collection(collectionName);

        const documents = await collection.find({}).toArray();

        if (documents.length > 0) {
          res.json(documents);
        } else {
          res
            .status(404)
            .send(`No documents found in the collection: ${collectionName}`);
        }
      } catch (error) {
        res.status(500).send("Error fetching documents: " + error.message);
      }
    });

    app.post("/products/add", addProduct);
    app.delete("/products/remove/:productId", removeProduct);
    app.put("/products/edit/:productId", updateProduct);
    app.get("/getProduct/:productId", getSpecificProduct);

    // Comment Routes
    app.use("/comment", commentRoutes);
    app.use("/product", porductFilterRoute);
    app.use("/aggregation", aggergationPipelineRoutes);

    app.listen(3000, () => {
      console.log("App is listening on port: 3000");
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
})();
