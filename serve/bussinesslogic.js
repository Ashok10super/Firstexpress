import bcrypt from "bcrypt";
import { usermodel } from "../model/usermodel.js";
import mongoose from "mongoose";

export function returnHomePage() {
  return "Welcome to the homepage";
}

export async function HashingPass(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    return "Hashing failed";
  }
}

export async function registration(username, password, hashedpassword) {
  //check if the username already exists in the db

  //console.log(usermodel.findOne({ username: username }));\
  const imsexist = await usermodel.findOne({ username: username });
  console.log(typeof imsexist);
  if (!imsexist) {
    try {
      const data = new usermodel({
        username,
        hashedpassword,
        password,
      });
      const save = await usermodel.create(data);
      return "user sucessfully registered";
    } catch (error) {
      return;
    }
  } else {
    return "user already registered";
  }
}

export async function getUser(username) {
    const isuserExist = await usermodel.findOne({username})
    console.log(isuserExist);
    if(isuserExist!=null){
        return isuserExist
    }else{
        return "username not exist"
    }
}

export async function isPassMatching(password,user) {
        if(user ==='username not exist'){
            return "No Accounts found"
        }else{
            console.log(password);
            const data ={user}
            console.log(data.user.hashedPassword);
    const isPassMatching = await bcrypt.compare(password,data.user.hashedpassword)
    if(isPassMatching){
        return "Login successfull"
    }else{
        return "Password is wrong click on forget password"
    }
}
}
