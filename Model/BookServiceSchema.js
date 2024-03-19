const mongoose = require("mongoose");

const BookServiceSchema = new mongoose.Schema({
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ProviderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
  },
  Name: {
    type: String,
  },
  PreferredTime: {
    type: String,
  },
  Adddress: {
    type: String,
  },
  PhoneNO: {
    type: Number,
  },
});

BookServiceSchema.set("timestamps", true);

module.exports = mongoose.model("BookService", BookServiceSchema);
