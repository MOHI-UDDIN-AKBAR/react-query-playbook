import { Request, Response } from "express";
import { v4 as generateUniqueId } from "uuid";
import { hasAllPropertiesValue } from "../utils";
import { todos } from "../data/todos";
import { TodoType } from "../models/TodoType";

export const getTodos = (req: Request, res: Response) => {
  res.status(200).json(todos);
};

export const getTodoItem = (req: Request, res: Response) => {
  const { todoId } = req.params;

  if (!todoId) {
    return res.status(400).json({ message: "Invalid Todo ID." });
  }

  const todoItem = todos.find((todo) => todo.id === todoId);

  if (!todoItem) {
    return res.status(404).json({ message: "Todo item not found." });
  }

  res.status(200).json(todoItem);
};

export const getTodosByPage = (req: Request, res: Response) => {
  const { page, limit } = req.query;

  if (!page || !limit) {
    return res.status(400).json({
      message: "Page and Limit are required.",
    });
  }

  const pageNumber = parseInt(page as string, 10);
  const todoLimitPerPage = parseInt(limit as string, 10);

  if (
    isNaN(todoLimitPerPage) ||
    isNaN(pageNumber) ||
    pageNumber <= 0 ||
    todoLimitPerPage <= 0
  ) {
    return res.status(400).json({
      message: "Invalid page or limit values",
    });
  }

  //   const startIndex = (pageNumber - 1) * todoLimitPerPage;
  //   const endIndex = startIndex + todoLimitPerPage;

  //   const paginatedTodos = todos.slice(startIndex, endIndex);
  //   const hasNextPage = endIndex < todos.length - 1;
  //   const hasPreviousPage = pageNumber > 1;

  const totalTodos = todos.length;
  const totalPages = Math.ceil(totalTodos / todoLimitPerPage);
  const startIndex = (pageNumber - 1) * todoLimitPerPage;
  const paginatedTodos = todos.slice(startIndex, startIndex + todoLimitPerPage);
  const hasNextPage = pageNumber < totalPages;
  const hasPreviousPage = pageNumber > 1;
  res.status(200).json({ paginatedTodos, hasNextPage, hasPreviousPage });
};

export const getTodosForInfiniteScroll = (req: Request, res: Response) => {
  const { page, limit } = req.query;

  if (!page || !limit) {
    return res.status(400).json({
      message: "Page and Limit are required.",
    });
  }

  const pageNumber = parseInt(page as string, 10);
  const todoLimitPerPage = parseInt(limit as string, 10);

  if (isNaN(pageNumber) || todoLimitPerPage <= 0 || isNaN(todoLimitPerPage)) {
    return res.status(400).json({
      message: "Invalid Page or Limit values",
    });
  }

  const midPointIndex = Math.ceil(todos.length / 2);
  const offsetIndex = pageNumber * todoLimitPerPage;
  const startIndex =
    pageNumber === 0 ? midPointIndex : midPointIndex + offsetIndex;
  const endIndex = startIndex + todoLimitPerPage;

  const paginatedTodos = todos.slice(startIndex < 0 ? 0 : startIndex, endIndex);
  const hasNextPage = endIndex < todos.length - 1;
  const hasPreviousPage = startIndex > 0;

  res
    .status(200)
    .json({ infiniteTodos: paginatedTodos, hasNextPage, hasPreviousPage });
};

export const createTodo = (req: Request, res: Response) => {
  const todoData = req.body;

  if (!hasAllPropertiesValue<Omit<TodoType, "id">>(todoData)) {
    return res.status(400).json({ message: "Invalid todo data." });
  }

  const newTodo: TodoType = {
    ...todoData,
    id: generateUniqueId(),
  };

  todos.unshift(newTodo);

  res.status(201).json(newTodo);
};

export const updateExistingItem = (req: Request, res: Response) => {
  const { todoId } = req.params;
  const updatedData = req.body;

  if (!todoId) {
    return res.status(400).json({ message: "Invalid Todo ID." });
  }

  if (!hasAllPropertiesValue<TodoType>(updatedData)) {
    return res.status(400).json({ message: "Invalid todo data." });
  }

  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Failed to find todo in todos." });
  }

  todos.splice(todoIndex, 1, updatedData);
  return res.status(200).json(todos[todoIndex]);
};

export const deleteTodoItem = (req: Request, res: Response) => {
  const { todoId } = req.params;

  if (!todoId) {
    return res.status(400).json({ message: "Invalid Todo ID." });
  }

  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo item not found." });
  }

  const [deletedTodo] = todos.splice(todoIndex, 1);

  return res.status(200).json(deletedTodo);
};
