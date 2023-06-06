import { Router } from "express";
const router = Router();

import { auth } from "../controllers/auth.controller.js";

router.get('/', auth)

export default router;