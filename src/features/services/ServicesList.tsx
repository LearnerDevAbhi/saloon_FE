import { Link } from 'react-router-dom';
import { useGetServicesQuery } from '../../api/servicesApi';
import { Loader } from '../../components/common/Loader';

const ServicesList = () => {
  const { data, isLoading } = useGetServicesQuery();

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 text-center">
        <p className="text-sm uppercase tracking-wide text-primary-500">Our services</p>
        <h2 className="text-3xl font-semibold text-slate-900">Curated treatments for every guest</h2>
        <p className="text-slate-500">
          Browse hair, spa, and beauty services. Book instantly with your preferred specialist.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((service) => (
          <article key={service.id} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-primary-500">{service.category}</p>
                <h3 className="text-xl font-semibold text-slate-900">{service.name}</h3>
              </div>
              <span className="text-lg font-bold text-primary-600">${Number(service.price).toFixed(2)}</span>
            </div>
            <p className="mt-3 text-sm text-slate-600 line-clamp-2">{service.description}</p>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
              <span>Duration: {service.duration} min</span>
              <Link to={`/services/${service.id}`} className="font-semibold text-primary-600">
                View details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ServicesList;

