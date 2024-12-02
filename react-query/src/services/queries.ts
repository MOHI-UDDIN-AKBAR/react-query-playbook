import {
  keepPreviousData,
  useInfiniteQuery,
  useQueries,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import {
  fetchPostById,
  fetchPosts,
  fetchTodoById,
  fetchTodos,
  fetchTodosByPage,
  fetchTodosWithQueryParam,
} from './api';
import { PostType, TodoType } from '../types';

export const useFetchTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
};

export const useFetchTodoById = (todoId: number | string) => {
  return useQuery({
    queryKey: ['todos', todoId],
    queryFn: () => fetchTodoById(todoId),
  });
};

export const useFetchPaginatedTodos = (pageNumber: number) => {
  return useQuery({
    queryKey: ['paginated-todos', pageNumber],
    queryFn: () => fetchTodosByPage(pageNumber),
    placeholderData: keepPreviousData,
    enabled: !!pageNumber,
  });
};

export const useFetchUsingUIQ = () => {
  return useInfiniteQuery({
    queryKey: ['todos-pages'],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetchTodosWithQueryParam(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.hasNextPage) {
        return lastPageParam + 1;
      }
      return undefined;
    },
    getPreviousPageParam: (firstPage, _, firstPageParam) => {
      if (firstPage.hasPreviousPage) {
        return firstPageParam - 1;
      }
      return undefined;
    },
  });
};

export const useFetchTodosAndPosts = () => {
  return useQueries({
    queries: [
      {
        queryKey: ['todos-using-use-queries'],
        queryFn: fetchTodos,
      },
      {
        queryKey: ['posts-using-use-queries'],
        queryFn: fetchPosts,
      },
    ],
  }) as [UseQueryResult<TodoType[]>, UseQueryResult<PostType[]>];
};

export const useFetchPosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    gcTime: 30000,
    staleTime: 3000,
  });
};

export const useFetchPostById = (postIds: (number | string)[]) => {
  return useQueries({
    queries: postIds.map((postId) => {
      return {
        queryKey: ['post', postId],
        queryFn: () => fetchPostById(postId),
        enabled: !!postId,
      };
    }),
  }) as UseQueryResult<PostType>[];
};

export const useFetchSelectivePostFields = (postIds: (number | string)[]) => {
  return useQueries({
    queries: postIds.map((postId) => ({
      queryKey: ['post', postId],
      queryFn: () => fetchPostById(postId),
      enabled: !!postId,
    })),
    combine: (results) => {
      const isPending = results.map((result) => result.isPending);
      const isError = results.map((result) => result.isError);
      const errors = results.map((result) => result.error);
      const data = results.map((result) => result.data);
      return { isPending, isError, errors, data };
    },
  });
};

export const usePrefetch = () => {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
};
