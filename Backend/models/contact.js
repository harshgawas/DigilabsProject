import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  query: {
    type: String,
  },
});

module.exports = mongoose.model("Contact", ContactSchema);
