import express from "express";
import { route } from "../controller/maincontroller.js";
import mongoose from "mongoose";
const app = express();
app.use(express.json());
app.use("/", route);

async function connectdb() {
  try {
    const connect = await mongoose.connect("mongodb://localhost:27017/laptop");
    return "db connected successfully";
  } catch (error) {
    return "failed to connect db";
  }
}

connectdb().then(
  (val) => {
    app.listen(3000, () => {
      console.log(val + "   " + "server is listening");
    });
  },
  (val) => {
    console.log(error);
  }
);
