import { database } from "../index.js";
import { ObjectId } from "mongodb";

const addProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock, imageUrl } = req.body;
    const product = {
      title,
      description,
      price,
      category,
      stock,
      imageUrl,
    };
    const products = database.collection("products");
    await products.insertOne(product);
    return res.json({ message: "Product added", success: true });
  } catch (error) {
    console.log("Error while adding product : ", error.message);
  }
};

const removeProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const products = database.collection("products");
    const prod = await products.findOneAndDelete({
      _id: new ObjectId(productId),
    });
    if (prod) {
      return res.json({ message: "Product deleted", prod });
    }
    return res.json({ message: "Product not founded" });
  } catch (error) {
    console.log("Error while deleting product : ", error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, company, price, colors, stock, image, isFeatured } = req.body;
    const products = database.collection("products");
    const reqPro = await products.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      {
        $set: {
          name,
          company,
          price,
          colors,
          stock,
          image,
          isFeatured,
        },
      }
    );
    if (reqPro) {
      return res.json({ message: "Product updated", reqPro });
    }
  } catch (error) {
    console.log("Error while updating product : ", error.message);
  }
};

const getSpecificProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const products = database.collection("products");
    const pro = await products.findOne({ _id: new ObjectId(productId) });
    if (pro) {
      return res.json({ message: "Product founded", product: pro });
    }
    return res.json({ message: "Product not founded" });
  } catch (error) {}
};
export { addProduct, removeProduct, updateProduct, getSpecificProduct };
