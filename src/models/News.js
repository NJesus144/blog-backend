import mongoose from "mongoose";
import User from "../models/User.js";

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true},
  text: { type: String, required: true },
  banner: {type: String, required: true},
  comments: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const News = mongoose.model("News", NewsSchema);

export default News;
