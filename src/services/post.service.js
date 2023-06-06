import News from "../models/News.js";

const createService = (body) => News.create(body);

const findByIdService = (id) => News.findById(id)

const findAllService = (offset, limit) => News.find().sort({_id: -1}).skip(offset).limit(limit).populate("user");

const findAllCategoryService = (category) => News.find({category: category})

const topNewsService = () => News.findOne().sort({ _id: -1 }).populate("user");

const addCommentService = (idPost, comment, userId) => {
  const idComment = Math.floor(Date.now() * Math.random()).toString(36);
  
  return News.findOneAndUpdate(
    {_id: idPost}, 
    {
      $push: {
        comments: {idComment, userId, comment,
        createdAt: new Date() },
     },
    }
  )
}

const deleteCommentService = (idPost, idComment, userId ) => 
 News.findOneAndUpdate(
  {_id: idPost}, 
  {$pull: {comments:{ idComment, userId  }}

});

const eraseService = (id) => News.findByIdAndDelete({_id: id});


const editCommentPostService = (idPost, idComment, comment) => {
  return News.findOneAndUpdate(
    {_id: idPost, "comments.idComment": idComment},  
    {$set: {"comments.$.comment": comment}},
    {
      new: true,
    }
  )
}

export { createService, 
  findAllService,
  findAllCategoryService,
  findByIdService,
  topNewsService,
  addCommentService,
  deleteCommentService,
  eraseService,
  editCommentPostService
 };
