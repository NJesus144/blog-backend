import mongoose from "mongoose";
import User from "../models/User.js";

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String},
  imgPreview: {type: String, required: true},
  banner: {type: String, required: true},
  exercise: [
    {
      name: {
        type: String, 
       
      },
      image: {
        type: String, 
        },
        
      description: {
        type: String, 
       }
      
  },
  ],
  sections: [
    {
      title: {
        type: String, 
       
      },
      image: {
        type: String, 
        },
        
      text: {
        type: String, 
       }
      
  },
  ],
  comments: { type: Array, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const News = mongoose.model("News", NewsSchema);

export default News;
