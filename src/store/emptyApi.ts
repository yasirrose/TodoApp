import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const getAccessToken = () => localStorage.getItem('accessToken')
const BASE_URL = 'http://localhost:8000'


export const emptySplitApi = createApi({
    reducerPath: 'emptySplitApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders(headers) {
          const accessToken = getAccessToken()
          if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`)
          }
          return headers
        },
      }),
      tagTypes: ['GETDATA'],
  endpoints: () => ({}),
})