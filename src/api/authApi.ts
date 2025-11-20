import { baseApi } from './baseApi';
import type { AuthResponse } from '../features/auth/types';
import { setCredentials } from '../features/auth/authSlice';

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest extends LoginRequest {
  name: string;
  phone?: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setCredentials(data));
      },
    }),
    signup: build.mutation<AuthResponse, SignupRequest>({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setCredentials(data));
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;

