import { emptySplitApi } from "./emptyApi";
import { PostTodo, ReturnPostData } from "./types";
interface Todo {
    id: number,
    title: string;
    done: boolean;
  }

  export const TodoApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
      getTodo: builder.query<Todo, void>({
        query: () => '/todo/',
        providesTags: ['GETDATA']
      }),

      updateTodo: builder.mutation<Todo, Partial<Todo>>({
        query: (body) => {
          return {
          url: `/todo/${body.id}/`,
          method: 'PATCH',
          body,
          }
        },
        invalidatesTags: ['GETDATA']
      }),

      deleteTodo: builder.mutation<void, number>({
        query: (id) => {
          return {
          url: `/todo/${id}/`,
          method: 'DELETE',
          }
        },
        invalidatesTags: ['GETDATA']
      }),

      postTodo: builder.mutation<ReturnPostData, PostTodo>({
        query: (body) => {
          return {
          url: `/todo/`,
          method: 'POST',
          body,
          }
        },
        invalidatesTags: ['GETDATA']
      }),



    }),
    overrideExisting: false
  })
  
  export const { useGetTodoQuery, useUpdateTodoMutation, useDeleteTodoMutation, usePostTodoMutation } = TodoApi;