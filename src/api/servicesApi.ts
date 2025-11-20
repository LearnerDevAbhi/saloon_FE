import { baseApi } from './baseApi';
import type { Service } from '../types/common';

interface ServicePayload {
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  isActive?: boolean;
}

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getServices: build.query<Service[], void>({
      query: () => ({
        url: '/services',
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Service' as const, id })),
              { type: 'Service' as const, id: 'LIST' },
            ]
          : [{ type: 'Service' as const, id: 'LIST' }],
    }),
    getServiceById: build.query<Service, string>({
      query: (id) => ({
        url: `/services/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _err, id) => [{ type: 'Service' as const, id }],
    }),
    createService: build.mutation<Service, ServicePayload>({
      query: (body) => ({
        url: '/services',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Service', id: 'LIST' }],
    }),
    updateService: build.mutation<Service, { id: string; body: Partial<ServicePayload> }>({
      query: ({ id, body }) => ({
        url: `/services/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_res, _err, { id }) => [
        { type: 'Service', id },
        { type: 'Service', id: 'LIST' },
      ],
    }),
    deleteService: build.mutation<void, string>({
      query: (id) => ({
        url: `/services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, id) => [
        { type: 'Service', id },
        { type: 'Service', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;

