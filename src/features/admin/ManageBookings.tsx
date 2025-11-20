import { useState } from 'react';
import {
  useGetBookingsQuery,
  useUpdateBookingStatusMutation,
} from '../../api/bookingsApi';
import { Loader } from '../../components/common/Loader';
import type { BookingStatus } from '../../types/common';
import { formatDate, formatTime } from '../../utils/dateUtils';

const statusOptions: BookingStatus[] = ['pending', 'confirmed', 'cancelled', 'completed'];

const ManageBookings = () => {
  const { data, isLoading } = useGetBookingsQuery();
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | 'all'>('all');
  const [updateStatus, { isLoading: updating }] = useUpdateBookingStatusMutation();

  if (isLoading) {
    return <Loader fullScreen />;
  }

  const filtered =
    selectedStatus === 'all' ? data ?? [] : (data ?? []).filter((booking) => booking.status === selectedStatus);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Bookings</h2>
          <p className="text-sm text-slate-500">Monitor and update appointment statuses.</p>
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as BookingStatus | 'all')}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700"
        >
          <option value="all">All statuses</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filtered.map((booking) => (
          <article key={booking.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">{formatDate(booking.bookingDate)}</p>
                <h3 className="text-lg font-semibold text-slate-900">{booking.service.name}</h3>
                <p className="text-sm text-slate-500">
                  {formatTime(booking.startTime)} • {booking.customer?.name ?? 'Customer'} with {booking.staff.name}
                </p>
              </div>
              <select
                value={booking.status}
                onChange={(e) => updateStatus({ id: booking.id, status: e.target.value as BookingStatus })}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600"
                disabled={updating}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </article>
        ))}

        {!filtered.length && <p className="text-center text-sm text-slate-500">No bookings match the selected filter.</p>}
      </div>
    </section>
  );
};

export default ManageBookings;

