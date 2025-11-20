import { baseApi } from './baseApi';
import type { AuthUser } from '../features/auth/types';

interface UpdateProfilePayload {
  name?: string;
  phone?: string;
  address?: string;
}

export const customerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<AuthUser, void>({
      query: () => ({ url: '/customer/me', method: 'GET' }),
      providesTags: [{ type: 'Customer', id: 'ME' }],
    }),
    updateProfile: build.mutation<AuthUser, UpdateProfilePayload>({
      query: (body) => ({
        url: '/customer/me',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'Customer', id: 'ME' }],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = customerApi;

