import { Router } from "express";
import {
  getTodos,
  getTodoItem,
  getTodosByPage,
  getTodosForInfiniteScroll,
  createTodo,
  updateExistingItem,
  deleteTodoItem,
} from "../controllers/todoController";

const todoRoute = Router();

todoRoute.get("/", getTodos);
todoRoute.get("/:todoId", getTodoItem);
todoRoute.get("/per/page", getTodosByPage);
todoRoute.get("/infinite/page", getTodosForInfiniteScroll);

todoRoute.post("/", createTodo);
todoRoute.put("/:todoId", updateExistingItem);
todoRoute.delete("/:todoId", deleteTodoItem);

export default todoRoute;
