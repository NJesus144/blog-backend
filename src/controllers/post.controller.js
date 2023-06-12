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
  eraseService,
  countPost
   } from "../services/post.service.js";

const create = async (req, res) => {
  try {
    const { title, description,  banner,  text  } = req.body;
    console.log(title,description, text, banner )
    if (!title || !banner || !text || !description) {
      res.status(400).send({ message: "submit all fields" });
    }

    await createService({
      title,
      description,
      text,
      banner,
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
        description: post.description,
        text: post.text,
        banner: post.banner,   
        comments: post.comments,
        createdAt: post.createdAt,
        user: req.userId,
 
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
      limit = 6;
    }
    if(!offset) {
      offset = 0;
    }
    const post = await findAllService(offset, limit);
    const total = await countPost(); 
    const currentUrl = req.baseUrl;
  
    const next = offset + limit;
    const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}`: null;


    if (post.length === 0) {
      return res.status(400).send({
        message: "There are no registered post",
      });
    } 
    console.log(post)
    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,

      results: post.map(item => ({
        id: item._id,
        title: item.title,
        subtitle: item.subtitle,
        imgPreview: item.imgPreview,
        banner: item.banner,
        sections: item.sections,
        comments: item.comments,
        category: item.category,
        name: item.user.name,
        username: item.user.username,
      }))
    });
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
              description: news.description,
              text: news.text,          
              banner: news.banner,
              comments: news.comments,          
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

    res.status(201).send({ message: "Comment successfully completed!"})
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
