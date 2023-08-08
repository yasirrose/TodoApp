import { Register, LoginInput, RegisterResponse, LoginResponse } from './types'
import { emptySplitApi } from './emptyApi'


export const authApi = emptySplitApi.injectEndpoints({
  
  endpoints: (builder) => ({
    registerUser: builder.mutation<Register, RegisterResponse>({
      query(data) {
        return {
          url: '/signup/',
          method: 'POST',
          body: data,
        }
      },
    }),

    checkTokenValidation: builder.query<void, {valid: boolean}>({
      query: () => {
        return {
          url: 'api/token/verify/',
          method: 'GET'
        }
        
      },
    }),

    loginUserCheck: builder.mutation<LoginInput, LoginResponse>({
      query(data) {
        return {
          url: '/api/token/',
          method: 'POST',
          body: data
        }
      },
      
      invalidatesTags: ['GETDATA'],
      transformResponse: (response: {'access': string, 'refresh': string}) => {
        try {
          localStorage.setItem('accessToken', response.access)
          localStorage.setItem('refreshToken', response.refresh)
          return true
        }
        catch(error){
          return false
        }
      }
    }),

  }),
  overrideExisting: false
})

export const {
  useLoginUserCheckMutation,
  useRegisterUserMutation,
  useCheckTokenValidationQuery
} = authApi
