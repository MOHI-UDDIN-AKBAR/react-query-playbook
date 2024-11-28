import { Request, Response } from "express";
import { v4 as generateUniqueId } from "uuid";
import { hasAllPropertiesValue } from "../utils";
import { posts } from "../data/posts";
import { PostType } from "../models/PostType";

export const getPosts = (req: Request, res: Response) => {
  res.status(200).json(posts);
};

export const getPostItem = (req: Request, res: Response) => {
  const { postId } = req.params;

  if (!postId) {
    return res.status(400).json({ message: "Post ID is required." });
  }

  const postItem = posts.find((post) => post.id === postId);

  if (!postItem) {
    return res.status(404).json({ message: "Post Item is not found." });
  }

  res.status(200).json(postItem);
};

export const createPost = (req: Request, res: Response) => {
  const postData = req.body;

  if (!hasAllPropertiesValue<Omit<PostType, "id">>(postData)) {
    return res.status(400).json({ message: "Invalid Post Data." });
  }

  const newPost: PostType = { ...postData, id: generateUniqueId() };

  posts.unshift(newPost);

  res.status(201).json(newPost);
};
