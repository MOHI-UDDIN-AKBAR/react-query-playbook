import { Router } from "express";
import {
  getPosts,
  getPostItem,
  createPost,
} from "../controllers/postController";

const postRouter = Router();

postRouter.get("/", getPosts);
postRouter.get("/:postId", getPostItem);
postRouter.post("/", createPost);

export default postRouter;
