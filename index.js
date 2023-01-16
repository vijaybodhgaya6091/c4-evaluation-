const express = require("express");
const { authentication } = require("./middleware/auth.middleware");
const { UserModel } = require("./model/user.model");
const { postRouter } = require("./route/post.route");
const { userRouter } = require("./route/user.route");
const { connection } = require("./script/db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/users", userRouter);

app.use(authentication);

app.use("/posts", postRouter);

app.listen(4500, async () => {
  try {
    await connection;
    console.log("Connected To DB");
  } catch (error) {
    console.log(error);
  }
  console.log("Running On Post 4500");
});
