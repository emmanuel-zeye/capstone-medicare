import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {prepareHeaders} from "../utils";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders,
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'users/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        signup: builder.mutation({
            query: (data) => ({
                url: 'users',
                method: 'POST',
                body: data,
            }),
        }),
    }),
})

export const {useLoginMutation, useSignupMutation} = authApi