import { Router } from "express";
const router = Router();
import { create,
   findAll,findById, 
   addComment, deleteComment,
   editComment,
  erase,
  topNews } from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews);
router.get('/:id', authMiddleware, findById);
router.patch("/comment/:id", authMiddleware, addComment);
router.patch("/comment/:idPost/:idComment", authMiddleware, editComment);
router.delete("/comment/:idPost/:idComment", authMiddleware, deleteComment);
router.delete('/:id', authMiddleware, erase);


export default router;
 