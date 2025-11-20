import { baseApi } from './baseApi';
import type { StaffMember } from '../types/common';

interface StaffPayload {
  userId: string;
  role: string;
  name?: string;
  email?: string;
  phone?: string;
  startTime: string;
  endTime: string;
  weeklyOffDays: string[];
  serviceIds: string[];
}

export const staffApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStaff: build.query<StaffMember[], void>({
      query: () => ({ url: '/staff', method: 'GET' }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Staff' as const, id })),
              { type: 'Staff' as const, id: 'LIST' },
            ]
          : [{ type: 'Staff' as const, id: 'LIST' }],
    }),
    getStaffMember: build.query<StaffMember, string>({
      query: (id) => ({ url: `/staff/${id}`, method: 'GET' }),
      providesTags: (_res, _err, id) => [{ type: 'Staff' as const, id }],
    }),
    createStaff: build.mutation<StaffMember, StaffPayload>({
      query: (body) => ({
        url: '/staff',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Staff', id: 'LIST' }],
    }),
    updateStaff: build.mutation<StaffMember, { id: string; body: Partial<StaffPayload> }>({
      query: ({ id, body }) => ({
        url: `/staff/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_res, _err, { id }) => [
        { type: 'Staff', id },
        { type: 'Staff', id: 'LIST' },
      ],
    }),
    deleteStaff: build.mutation<void, string>({
      query: (id) => ({
        url: `/staff/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, id) => [
        { type: 'Staff', id },
        { type: 'Staff', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetStaffQuery,
  useGetStaffMemberQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} = staffApi;

