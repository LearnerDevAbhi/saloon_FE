import { useGetAdminOverviewQuery } from '../../api/bookingsApi';
import { Loader } from '../../components/common/Loader';
import { formatDate, formatTime } from '../../utils/dateUtils';

const AdminDashboard = () => {
  const { data, isLoading } = useGetAdminOverviewQuery();

  if (isLoading || !data) {
    return <Loader fullScreen />;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today" value={data.todayAppointments.length} helper="appointments" />
        <StatCard label="Upcoming" value={data.upcomingAppointments.length} helper="next 7 days" />
        <StatCard label="Revenue" value={`$${data.totalRevenue.toFixed(2)}`} helper="completed bookings" />
        <StatCard
          label="Avg Utilization"
          value={`${Math.round(
            data.staffUtilization.reduce((sum, stat) => sum + stat.confirmedAppointments, 0) /
              Math.max(data.staffUtilization.length, 1),
          )} bookings`}
          helper="per staff"
        />
      </div>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Today&apos;s appointments</h3>
        <div className="mt-4 space-y-3">
          {data.todayAppointments.map((booking) => (
            <div key={booking.id} className="flex flex-wrap items-center justify-between rounded-xl bg-slate-50 p-4">
              <div>
                <p className="text-sm text-slate-500">{formatDate(booking.bookingDate)}</p>
                <p className="font-semibold text-slate-900">{booking.service.name}</p>
                <p className="text-sm text-slate-500">
                  {booking.customer?.name ?? 'Customer'} • {formatTime(booking.startTime)} with {booking.staff.name}
                </p>
              </div>
              <span className="text-sm font-semibold text-primary-600">
                ${Number(booking.amount).toFixed(2)}
              </span>
            </div>
          ))}
          {!data.todayAppointments.length && (
            <p className="text-sm text-slate-500">No appointments today.</p>
          )}
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ label, value, helper }: { label: string; value: string | number; helper?: string }) => (
  <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
    {helper && <p className="text-xs text-slate-400">{helper}</p>}
  </div>
);

export default AdminDashboard;

