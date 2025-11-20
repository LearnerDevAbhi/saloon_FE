import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  useDeleteBookingMutation,
  useGetBookingsQuery,
  useUpdateBookingStatusMutation,
} from '../../api/bookingsApi';
import { selectCurrentUser } from '../auth/authSlice';
import { Loader } from '../../components/common/Loader';
import { Button } from '../../components/common/Button';
import { formatDate, formatTime } from '../../utils/dateUtils';
import type { BookingStatus } from '../../types/common';

const statusClasses: Record<BookingStatus, string> = {
  pending: 'bg-yellow-50 text-yellow-700',
  confirmed: 'bg-green-50 text-green-700',
  cancelled: 'bg-slate-100 text-slate-500',
  completed: 'bg-primary-50 text-primary-700',
};

const staffStatusActions: BookingStatus[] = ['confirmed', 'completed', 'cancelled'];

const MyBookings = () => {
  const user = useSelector(selectCurrentUser);
  const { data, isLoading } = useGetBookingsQuery();
  const [updateStatus, { isLoading: updating }] = useUpdateBookingStatusMutation();
  const [cancelBooking, { isLoading: canceling }] = useDeleteBookingMutation();

  const sortedBookings = useMemo(
    () =>
      data
        ?.slice()
        .sort((a, b) => a.bookingDate.localeCompare(b.bookingDate) || a.startTime.localeCompare(b.startTime)) ?? [],
    [data],
  );

  const handleStatusChange = (bookingId: string, status: BookingStatus) => {
    updateStatus({ id: bookingId, status });
  };

  const handleCancel = (bookingId: string) => {
    cancelBooking(bookingId);
  };

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-2xl font-semibold text-slate-900">Upcoming bookings</h2>
        <p className="text-sm text-slate-500">Manage and track all appointments in one place.</p>
      </header>
      <div className="space-y-4">
        {sortedBookings.map((booking) => (
          <article key={booking.id} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">{formatDate(booking.bookingDate)}</p>
                <h3 className="text-lg font-semibold text-slate-900">{booking.service.name}</h3>
                <p className="text-sm text-slate-500">
                  {formatTime(booking.startTime)} · {booking.staff.name}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[booking.status]}`}>
                {booking.status}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {user?.role === 'customer' && booking.status === 'pending' && (
                <Button
                  variant="secondary"
                  onClick={() => handleCancel(booking.id)}
                  isLoading={canceling}
                >
                  Cancel
                </Button>
              )}

              {user?.role !== 'customer' &&
                staffStatusActions.map((status) => (
                  <Button
                    key={status}
                    variant={booking.status === status ? 'primary' : 'secondary'}
                    onClick={() => handleStatusChange(booking.id, status)}
                    isLoading={updating}
                    disabled={booking.status === status}
                  >
                    Mark {status}
                  </Button>
                ))}
            </div>
          </article>
        ))}

        {!sortedBookings.length && (
          <p className="text-center text-sm text-slate-500">No bookings yet. Start by scheduling a service.</p>
        )}
      </div>
    </section>
  );
};

export default MyBookings;

