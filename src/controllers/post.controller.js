// import { createService } from "../services/news.service.js";
import { 
  findAllService, 
  createService,
  findAllCategoryService,
  findByIdService, 
  topNewsService,
  addCommentService,
  deleteCommentService,
  editCommentPostService,
  eraseService
   } from "../services/post.service.js";

const create = async (req, res) => {
  try {
    const { title, subtitle, exercise, banner, imgPreview, sections, category  } = req.body;

    if (!title || !banner || !imgPreview || !category) {
      res.status(400).send({ message: "submit all fields" });
    }

    await createService({
      title,
      subtitle,
      imgPreview,
      banner,
      exercise,
      sections,
      category,
      user: req.userId,
    });

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try{
    const {id} = req.params;

    const post = await findByIdService(id)


    return res.send({
     
        id: post._id,
        title: post.title,
        subtitle: post.subtitle,
        banner: post.banner,
        exercise: post.exercise,
        imgPreview: post.imgPreview,
        sections: post.sections,
        category: post.category,
        comments: post.comments,
        createdAt: post.createdAt
 
    })

  }catch(err){
    res.status(500).send({message: err.message})
  }
}

const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;
  
    limit = Number(limit)
    offset = Number(offset)
    
    if(!limit){
      limit = 5;
    }
    if(!offset) {
      offset = 0;
    }
    const post = await findAllService(offset, limit);


    if (post.length === 0) {
      return res.status(400).send({
        message: "There are no registered post",
      });
    } 
    res.send(post);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const topNews = async (req, res) => {
  try {
      const news = await topNewsService();

      if (!news) {
          return res
              .status(400)
              .send({ message: "There is no registered post" });
      }

      res.send({
          news: {
              id: news._id,
              title: news.title,
              text: news.text,
              imgPreview: news.imgPreview,
              banner: news.banner,
              comments: news.comments,
              category: news.category,
              name: news.user.name,
              username: news.user.username
          },
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAllCategory = async (req, res) => {
  const {category} = req.params;
 
  try{ 
    const posts = await findAllCategoryService(category)

    if (posts.length === 0) {
      return res
        .status(404)
        .send({ message: "There are no registered posts." });
    }

    res.send(posts)

  }catch(err){
    res.status(500).send({message: err.message})
  }
}

const addComment = async (req, res) => {
  try{
    const {id} = req.params;
    const userId = req.userId;
    const {comment} = req.body;

    if(!comment) {
      return res.status(400).send({ message: "Write a message to comment" })
    }

    await addCommentService(id, comment, userId)

    res.send({ message: "Comment successfully completed!"})
  }catch(err){
    res.status(500).send({ message: err.message })
  }
}

const deleteComment = async(req, res) => {
  try{
    const {idPost, idComment } = req.params;
    const userId = req.userId;
  
    const commentDeleted = await deleteCommentService(idPost, idComment, userId )
  
    const commentFinder = commentDeleted.comments.find(
      (comment) => comment.idComment === idComment);

  
    if(!commentFinder) return res.status(404).send({ message: "comment not found"});
      
    if (String(commentFinder.userId) !== String(userId)){
      return res.status(400).send({ message: "You can't delete this comment"});
    }

  res.send({ message: "Comment successfully removed!"})
  }catch(err){
    res.status(500).send({ message: err.message })
  }
}

const editComment = async(req, res) => {
  try{
    const {idPost, idComment } = req.params;
    const {comment} = req.body;


    if(!comment) {
      return res.status(400).send({ message: "Write a message to comment" })
    }

    const editCommentPost = await editCommentPostService(idPost, idComment, comment)
  
    if(!editCommentPost) return res.status(400).send({message: 'Post not found'})

    res.send({ message: "Successfully edited comment!"})
  }catch(err){
    res.status(500).send({ message: err.message })
  }
}

const erase = async(req,res) => {
  try{
    const {id} = req.params;

    const post = await findByIdService(id)

    
    if(String(post.user._id) !== String(req.userId)){
      return res.status(400).send({
        message: "You didn't delete this post"
      })
    }

    await eraseService(id)

    return res.send({message: "Post deleted successfully!"})
  }catch(err){
    res.status(500).send({ message: err.message })
  }
}



export { create, 
    findAll, 
    findAllCategory, 
    findById, 
    addComment,
    deleteComment,
    erase,
    editComment,
    topNews
  };
