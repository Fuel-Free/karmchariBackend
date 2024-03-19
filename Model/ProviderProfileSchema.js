const mongoose = require("mongoose");

const ProviderProfileSchema = new mongoose.Schema({
  ProviderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
  },
  // Logo: {
  //   type: String,
  // },
  Name :{
    type : String
  },
  Number :{
    type : Number
  },
  Email: {
    type: String,
  },
  City:{
    type :String
  },
  Profession: {
    type: String, // electric, Oprater,
  },
  Pincode :{
    type : Number
  },
  Address :{
    type : String
  },
  AvailabilityFrom :{
    type : String
  },
  AvailabilityIn :{
    type : String
  },
  ServiceCharge :{
    type : String
  },
});

ProviderProfileSchema.set("timestamps", true);

module.exports = mongoose.model("ProviderProfile", ProviderProfileSchema);
