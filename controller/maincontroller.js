import express from "express";
import { getUser, isPassMatching, returnHomePage } from "../serve/bussinesslogic.js";
import { HashingPass } from "../serve/bussinesslogic.js";
import { registration } from "../serve/bussinesslogic.js";
//main route for handling the specific route ('/')
export const route = express.Router();
const app = express();
app.use(express.json());

route.get("/", (req, res) => {
  res.send(returnHomePage());
});

route.post("/registration", (req, res) => {
  const user = req.body;
  console.log(user);
  HashingPass(user.password).then((hashedpass) => {
    console.log(user.username, user.password, hashedpass);
    registration(user.username, user.password, hashedpass).then((result) => {
      res.send(result);
    });
  });
});

route.post("/login", (req, res) => {
    const user = req.body
    getUser(user.username).then((users)=>{
        isPassMatching(user.password,users).then((final)=>{
            res.send(final)
        })
    })
});
