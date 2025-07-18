import mongoose from "mongoose";

const revisionSchema = new mongoose.Schema({
  content: String,
  title: String,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  summary: String,
  revisions: [revisionSchema],
});

export default mongoose.model("Article", articleSchema);
