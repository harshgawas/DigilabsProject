import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const NoticeSchema = new mongoose.Schema(
  {
    admin: {
      type: ObjectId,
      ref: "Admin",
    },
    notice: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notice", NoticeSchema);
