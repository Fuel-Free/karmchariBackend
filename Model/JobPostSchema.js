const mongoose = require("mongoose");

const JobPostSchema = new mongoose.Schema({
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  JobTitle: {
    type: String,
  },
  JobAddress: {
    type: String,
  },
  State: {
    type: String,
  },
  City: {
    type: String,
  },
  Area: {
    type: String,
  },
  Pincode: {
    type: String,
  },
  JobDescription: {
    type: String,
  },
  WorkType: {
    type: String,
  },
  workDone: {
    type: String,
    default : false
  },
  WorkDoneBy : {
    type :String,
    default : false
  }
});

JobPostSchema.set("timestamps", true);

module.exports = mongoose.model("JobPost", JobPostSchema);
