import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostType, TodoType } from '../types';
import { addPost, addTodo, deleteTodo, updateTodo } from './api';

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['add-todo'],
    mutationFn: ({ newTodo }: { newTodo: Omit<TodoType, 'id'> }) =>
      addTodo(newTodo),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-todo'],
    mutationFn: ({
      todoId,
      modifiedTodo,
    }: {
      todoId: number | string;
      modifiedTodo: TodoType;
    }) => updateTodo(todoId, modifiedTodo),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['delete-todo'],
    mutationFn: ({ todoId }: { todoId: number | string }) => deleteTodo(todoId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['add-post'],
    mutationFn: ({ postInput }: { postInput: Omit<PostType, 'id'> }) =>
      addPost(postInput),

    onMutate: async ({ postInput }: { postInput: Omit<PostType, 'id'> }) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      const previousPosts =
        queryClient.getQueryData<PostType[]>(['posts']) || [];

      queryClient.setQueryData(['posts'], (posts: PostType[] = []) => {
        const updatedPosts = [
          { ...postInput, id: Math.floor(Math.random() * 10000) },
          ...posts,
        ];
        return updatedPosts;
      });

      return { previousPosts };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['posts'], context?.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
