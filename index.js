import express from "express";
import connectDatabase from "./src/database/dbConnect.js";
import dotenv from 'dotenv'

import userRouter from "./src/routes/user.route.js";
import loginRouter from "./src/routes/login.route.js";
import postRouter from "./src/routes/post.route.js";
import authRouter from './src/routes/auth.route.js'
import postCategoryRouter from './src/routes/postCategory.route.js'
import cors  from 'cors'

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

connectDatabase();
app.use(cors())
app.use(express.json());
app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/post", postRouter);
app.use("/auth", authRouter);
app.use("/category", postCategoryRouter);

app.listen(port, () => console.log(`Server is running in port ${port}`));
