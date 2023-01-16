const express = require("express");
const jwt = require("jsonwebtoken");
const { PostModel } = require("../model/post.model");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const querry = req.query;

  let search = {
    $or: [{ device: "mobile" }, { device: "pc" }, { device: "tablet" }],
  };

  if (querry.device) {
    search = { $or: [{ device: querry.device }] };
  } else if (querry.device1 && querry.device2) {
    search = { $or: [{ device: querry.device1 }, { device: querry.device2 }] };
  }

  try {
    const token = req.headers.token;
    var decoded = jwt.verify(token, "vijay");

    let data = await PostModel.find({
      $and: [{ user_id: decoded.user_id }, search],
    });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send("Something wrong");
  }
});

postRouter.post("/add", async (req, res) => {
  const payload = req.body;

  try {
    let post = new PostModel(payload);
    await post.save();
    res.send("Post Uploaded");
  } catch (error) {
    console.log(error);
    res.send("Something Wrong");
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findOne({ _id: id });
    const token = req.headers.token;
    var decoded = jwt.verify(token, "vijay");

    if (post.user_id == decoded.user_id) {
      await PostModel.findByIdAndDelete({ _id: id });
      res.send("Deleted Successfully");
    } else {
      res.send("Not Autherized");
    }
  } catch (error) {
    console.log(error);
    res.send("Something Wrong");
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const post = await PostModel.findOne({ _id: id });
    const token = req.headers.token;
    var decoded = jwt.verify(token, "vijay");

    if (post.user_id == decoded.user_id) {
      await PostModel.findByIdAndUpdate({ _id: id }, payload);
      res.send("Updated Successfully");
    } else {
      res.send("Not Autherized");
    }
  } catch (error) {
    console.log(error);
    res.send("Something Wrong");
  }
});

module.exports = {
  postRouter,
};
