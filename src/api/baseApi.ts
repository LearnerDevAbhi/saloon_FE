import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../app/store';
import { setCredentials, logout, selectRefreshToken } from '../features/auth/authSlice';
import type { AuthResponse } from '../features/auth/types';

const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.accessToken ?? localStorage.getItem('salon_access');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await rawBaseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshToken =
      selectRefreshToken(api.getState() as RootState) ?? localStorage.getItem('salon_refresh');

    if (refreshToken) {
      const refreshResult = await rawBaseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const data = refreshResult.data as AuthResponse;
        api.dispatch(setCredentials(data));
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Service', 'Staff', 'Booking', 'Config', 'Customer', 'Dashboard'],
  endpoints: () => ({}),
});

