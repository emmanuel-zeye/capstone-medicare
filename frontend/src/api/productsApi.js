import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {prepareHeaders} from "../utils";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const productsApi = createApi({
  reducerPath:'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (pager) =>( {
        url: '/products',
        method: 'GET',
        params: pager
      }),
    }),
    addProduct: builder.mutation({
      query: (data) =>( {
        url: '/products',
        method: 'POST',
        body: data
      }),
    }),
  }),
})

export const {
  useGetCallsQuery,
  useCreateCallMutation
} = productsApi