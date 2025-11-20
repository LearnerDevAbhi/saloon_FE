import { useParams } from 'react-router-dom';
import { useGetServiceByIdQuery } from '../../api/servicesApi';
import { Loader } from '../../components/common/Loader';
import { ButtonLink } from '../../components/common/Button';

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetServiceByIdQuery(id ?? '', { skip: !id });

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (!data) {
    return <p className="text-center text-slate-500">Service not found.</p>;
  }

  return (
    <section className="space-y-6 rounded-2xl bg-white p-8 shadow-card">
      <div className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-wide text-primary-500">{data.category}</p>
        <h1 className="text-3xl font-semibold text-slate-900">{data.name}</h1>
        <p className="text-slate-600">{data.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
        <span className="rounded-full bg-primary-50 px-3 py-1 font-semibold text-primary-600">
          ${Number(data.price).toFixed(2)}
        </span>
        <span>Duration: {data.duration} min</span>
        <span>Status: {data.isActive ? 'Available' : 'Paused'}</span>
      </div>
      <ButtonLink to={`/bookings/new?serviceId=${data.id}`}>Book this service</ButtonLink>
    </section>
  );
};

export default ServiceDetail;

