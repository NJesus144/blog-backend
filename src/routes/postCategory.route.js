import { Router } from "express";
const router = Router();
import { findAllCategory } from "../controllers/post.controller.js";


router.get("/:category", findAllCategory);

export default router;