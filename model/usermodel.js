import mongoose from "mongoose";

const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  hashedpassword: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});
export const usermodel = mongoose.model("ashok", user);

//function for user registration

