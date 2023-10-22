import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {prepareHeaders} from "../utils";

export const defaultApi = createApi({
    reducerPath: 'defaultApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders
    }),
    tagTypes: ['data'],
    endpoints: (builder) => ({
        read: builder.query({
            query: ([url, pager]) => {
                console.log({url, pager})
                return {
                    url,
                    method: 'GET',
                    params: pager
                }

            },
            providesTags: ['data']
        }),
        readOne: builder.query({
            query: (url, id) => ({
                url: `${url}/${id}`,
                method: 'GET'
            }),
        }),
        create: builder.mutation({
            query: ({url, data}) => {
                console.log("Data is ", data)
                return {
                    url,
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['data']
        }),
        update: builder.mutation({
            query: ({url, id, data}) => {
                console.log({url, id, data})
                return {
                    url: `/${url}/${id}`,
                    method: 'PUT',
                    body: data
                }
            },
            invalidatesTags: ['data']
        }),
        delete: builder.mutation({
            query: ({url, id}) => ({
                url: `/${url}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['data']
        }),
    }),
})


export const {
    useReadQuery, useCreateMutation, useReadOneQuery, useDeleteMutation, useUpdateMutation
} = defaultApi