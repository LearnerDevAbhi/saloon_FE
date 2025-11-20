import { useGetStaffQuery } from '../../api/staffApi';
import { Loader } from '../../components/common/Loader';
import { ButtonLink } from '../../components/common/Button';

const StaffList = () => {
  const { data, isLoading } = useGetStaffQuery();

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <section className="space-y-6">
      <header className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary-500">Our experts</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900">Meet the team</h2>
        <p className="mt-2 text-slate-500">Select a specialist to learn more or book directly.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {data?.map((member) => (
          <article key={member.id} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-primary-500">{member.role}</p>
                <h3 className="text-xl font-semibold text-slate-900">{member.name}</h3>
                <p className="text-sm text-slate-500">{member.email}</p>
              </div>
              <span className="text-sm text-slate-500">
                {member.startTime} - {member.endTime}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
              {member.services.map((svc) => (
                <span key={svc.id} className="rounded-full bg-slate-100 px-3 py-1">
                  {svc.name}
                </span>
              ))}
            </div>
            <ButtonLink className="mt-4" variant="secondary" to={`/staff/${member.id}`}>
              View profile
            </ButtonLink>
          </article>
        ))}
      </div>
    </section>
  );
};

export default StaffList;

