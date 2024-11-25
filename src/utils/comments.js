import { database } from "../index.js";
import { ObjectId } from "mongodb";
import { Router } from "express";

const commentRoutes = Router();

const addComment = async (req, res) => {
  try {
    const { comment, user } = req.body;
    const comments = database.collection("comments");
    const coment = await comments.findOneAndUpdate(
      { _id: 3 },
      {
        $push: {
          comments: {
            user,
            text: comment,
          },
        },
      }
    );
    if (coment) {
      return res.status(201).json({ message: "Comment added" });
    }
    return res.status(500).json({ message: "Fail to add comment" });
  } catch (error) {
    console.log("Error while adding comment : ", error.message);
  }
};

commentRoutes.post("/add", addComment);

const deleteComment = async (req, res) => {
  try {
    const comments = database.collection("comments");
    const comment = await comments.findOneAndUpdate(
      { _id: 3 },
      {
        $pull: {
          comments: {
            user: "Eva",
          },
        },
      }
    );
    if (comment) {
      return res.json({ message: "Comment deleted.", comment });
    }
  } catch (error) {
    console.log("Error while adding comment : ", error.message);
  }
};

commentRoutes.delete("/deletecomment", deleteComment);

const updateComment = async (req, res) => {
  try {
    const { updatedComment } = req.body;
    const comments = database.collection("comments");
    const comment = await comments.findOneAndUpdate(
      { _id: 7, "comments.text": "Thanks for sharing." },
      { $set: { "comments.user": updatedComment } }
    );
    if (comment) {
      return res.json({ message: "Comment updated" });
    }
    return res.json({ message: "Failed to update the comments" });
  } catch (error) {
    console.log("Error while adding comment : ", error.message);
  }
};
commentRoutes.put("/update", updateComment);

const updateAuthor = async (req, res) => {
  try {
    const { author } = req.body;
    const comments = database.collection("comments");
    const com = await comments.findOneAndUpdate(
      {
        _id: 7,
      },
      {
        $set: {
          author,
        },
      }
    );
    if (com) {
      return res.json({ message: "Author updated" });
    }
  } catch (error) {
    console.log("Error while adding comment : ", error.message);
  }
};
commentRoutes.put("/updateAuthor", updateAuthor);

export default commentRoutes;
