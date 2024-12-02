import axios from 'axios';
import { PostType, TodoType } from '../types';

const apiClient = axios.create({ baseURL: 'http://localhost:3000/api/' });

type PaginatedQueryResponse = {
  paginatedTodos: TodoType[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type InfiniteQueryResponse = {
  infiniteTodos: TodoType[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export const fetchTodos = async () => {
  const { data } = await apiClient.get<TodoType[]>('todos');
  return data;
};

export const fetchTodoById = async (todoId: number | string) => {
  const { data } = await apiClient.get<TodoType>(`todos/${todoId}`);
  return data;
};

export const fetchTodosByPage = async (pageNumber: number) => {
  const { data } = await apiClient.get<PaginatedQueryResponse>(
    `todos/per/page?page=${pageNumber}&limit=3`,
  );
  return data;
};

export const fetchTodosWithQueryParam = async (pageNumber: number) => {
  const { data } = await apiClient.get<InfiniteQueryResponse>(
    `todos/infinite/page?page=${pageNumber}&limit=3`,
  );
  return data;
};

export const addTodo = async (newTodo: Omit<TodoType, 'id'>) => {
  const { data } = await apiClient.post<TodoType>('todos', newTodo);
  return data;
};

export const updateTodo = async (
  todoId: number | string,
  updatedTodo: TodoType,
) => {
  const { data } = await apiClient.put<TodoType>(
    `todos/${todoId}`,
    updatedTodo,
  );
  return data;
};

export const deleteTodo = async (todoId: number | string) => {
  const { data } = await apiClient.delete<TodoType>(`todos/${todoId}`);
  return data;
};

export const fetchPosts = async () => {
  const { data } = await apiClient.get<PostType[]>('posts');
  return data;
};

export const fetchPostById = async (postId: number | string) => {
  const { data } = await apiClient.get<PostType>(`posts/${postId}`);
  return data;
};

export const addPost = async (postInput: Omit<PostType, 'id'>) => {
  const { data } = await apiClient.post<PostType>('posts', postInput);
  return data;
};
