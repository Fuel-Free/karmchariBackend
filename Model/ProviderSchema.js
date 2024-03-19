const mongoose = require("mongoose");

const ProviderSchema = new mongoose.Schema({
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
    type:String,
    // required: true,
  },
  City: {
    type: String,
    // required: true,
  },
  State: {
    type: String,
    // required: true,
  },
  Address: {
    type: String,
    // required: true,
  },
});

ProviderSchema.set("timestamps", true);

module.exports = mongoose.model("Provider", ProviderSchema);
