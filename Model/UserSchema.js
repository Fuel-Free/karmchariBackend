const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  PhoneNO: {
    type: Number,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Email:{
    type :String,
    required: true,
  },
  Address:{
    type :String, 
  },
  City: {
    type: String,
  },
  Pincode: {
    type: Number,
  },
});

UserSchema.set("timestamps", true);

module.exports = mongoose.model("User", UserSchema);
