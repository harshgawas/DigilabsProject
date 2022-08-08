import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const GallerySchema = new mongoose.Schema(
  {
    admin: {
      type: ObjectId,
      ref: "Admin",
    },
    imagelink: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Gallery", GallerySchema);
