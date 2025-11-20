import { baseApi } from './baseApi';
import type { Booking, BookingStatus } from '../types/common';

export interface CreateBookingPayload {
  serviceId: string;
  staffId: string;
  bookingDate: string;
  startTime: string;
  status?: BookingStatus;
  amount?: number;
}

export interface DashboardOverview {
  todayAppointments: Booking[];
  upcomingAppointments: Booking[];
  totalRevenue: number;
  staffUtilization: Array<{
    staffId: string;
    staffName: string;
    totalAppointments: number;
    confirmedAppointments: number;
    todayAppointments: number;
  }>;
}

export const bookingsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBookings: build.query<Booking[], { bookingDate?: string } | void>({
      query: (params) => ({
        url: '/bookings',
        method: 'GET',
        ...(params ? { params } : {}),
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Booking' as const, id })),
              { type: 'Booking' as const, id: 'LIST' },
            ]
          : [{ type: 'Booking' as const, id: 'LIST' }],
    }),
    getBookingById: build.query<Booking, string>({
      query: (id) => ({ url: `/bookings/${id}`, method: 'GET' }),
      providesTags: (_res, _err, id) => [{ type: 'Booking' as const, id }],
    }),
    createBooking: build.mutation<Booking, CreateBookingPayload>({
      query: (body) => ({
        url: '/bookings',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Booking', id: 'LIST' }],
    }),
    updateBookingStatus: build.mutation<
      Booking,
      { id: string; status: BookingStatus }
    >({
      query: ({ id, status }) => ({
        url: `/bookings/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (_res, _err, { id }) => [
        { type: 'Booking', id },
        { type: 'Booking', id: 'LIST' },
        { type: 'Dashboard', id: 'OVERVIEW' },
      ],
    }),
    deleteBooking: build.mutation<void, string>({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, id) => [
        { type: 'Booking', id },
        { type: 'Booking', id: 'LIST' },
        { type: 'Dashboard', id: 'OVERVIEW' },
      ],
    }),
    getAdminOverview: build.query<DashboardOverview, void>({
      query: () => ({
        url: '/admin/dashboard/overview',
        method: 'GET',
      }),
      providesTags: [{ type: 'Dashboard', id: 'OVERVIEW' }],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useCreateBookingMutation,
  useUpdateBookingStatusMutation,
  useDeleteBookingMutation,
  useGetAdminOverviewQuery,
} = bookingsApi;

