import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetStaffMemberQuery, useGetStaffQuery } from '../../api/staffApi';
import { Loader } from '../../components/common/Loader';
import { selectCurrentUser } from '../auth/authSlice';

const StaffDetail = () => {
  const { id } = useParams<{ id: string }>();
  const user = useSelector(selectCurrentUser);

  const { data: staffMember, isLoading: loadingMember } = useGetStaffMemberQuery(id ?? '', {
    skip: !id,
  });

  const { data: staffList, isLoading: loadingList } = useGetStaffQuery(undefined, {
    skip: Boolean(id),
  });

  const resolvedStaff = useMemo(() => {
    if (id) return staffMember;
    return staffList?.find((member) => member.user?.id === user?.id);
  }, [id, staffMember, staffList, user]);

  if (loadingMember || loadingList) {
    return <Loader fullScreen />;
  }

  if (!resolvedStaff) {
    return <p className="text-center text-sm text-slate-500">Staff profile not found.</p>;
  }

  return (
    <section className="rounded-3xl bg-white p-8 shadow-card">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase text-primary-500">{resolvedStaff.role}</p>
          <h2 className="text-3xl font-semibold text-slate-900">{resolvedStaff.name}</h2>
          <p className="text-sm text-slate-500">{resolvedStaff.email}</p>
        </div>
        <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-600">
          Hours: {resolvedStaff.startTime} – {resolvedStaff.endTime}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-100 p-4">
          <h3 className="text-sm font-semibold text-slate-600">Specialties</h3>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
            {resolvedStaff.services.map((svc) => (
              <span key={svc.id} className="rounded-full bg-slate-100 px-3 py-1">
                {svc.name}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-100 p-4">
          <h3 className="text-sm font-semibold text-slate-600">Weekly schedule</h3>
          <p className="mt-3 text-sm text-slate-500">
            Off days: {resolvedStaff.weeklyOffDays.length ? resolvedStaff.weeklyOffDays.join(', ') : 'None'}
          </p>
          <p className="text-sm text-slate-500">Phone: {resolvedStaff.phone}</p>
        </div>
      </div>
    </section>
  );
};

export default StaffDetail;

