import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IBook, IBorrowSummary, CreateBookDto, UpdateBookDto, CreateBorrowDto } from '../../types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Books', 'Borrows'],
  endpoints: (builder) => ({
    getBooks: builder.query<IBook[], void>({
      query: () => '/books',
      providesTags: ['Books'],
    }),
    
    createBook: builder.mutation<IBook, CreateBookDto>({
      query: (book) => ({
        url: '/books',
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Books'],
    }),
    
    updateBook: builder.mutation<IBook, { id: string; data: UpdateBookDto }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Books'],
    }),
    
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),
    
    createBorrow: builder.mutation<any, CreateBorrowDto>({
      query: (borrow) => ({
        url: '/borrows',
        method: 'POST',
        body: borrow,
      }),
      invalidatesTags: ['Books', 'Borrows'],
    }),
    
    getBorrowSummary: builder.query<IBorrowSummary[], void>({
      query: () => '/borrows/summary',
      providesTags: ['Borrows'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useCreateBorrowMutation,
  useGetBorrowSummaryQuery,
} = apiSlice;