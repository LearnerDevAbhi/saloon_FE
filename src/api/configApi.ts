import { baseApi } from './baseApi';

export interface SalonConfig {
  id: string;
  openingTime: string;
  closingTime: string;
  weeklyOffDays: string[];
  holidayDates: string[];
}

export const configApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSalonConfig: build.query<SalonConfig, void>({
      query: () => ({ url: '/config', method: 'GET' }),
      providesTags: [{ type: 'Config', id: 'CURRENT' }],
    }),
    updateSalonConfig: build.mutation<
      SalonConfig,
      Partial<Omit<SalonConfig, 'id'>>
    >({
      query: (body) => ({
        url: '/config',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'Config', id: 'CURRENT' }],
    }),
  }),
});

export const { useGetSalonConfigQuery, useUpdateSalonConfigMutation } = configApi;

