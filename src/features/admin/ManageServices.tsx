import { useState } from 'react';
import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useGetServicesQuery,
  useUpdateServiceMutation,
} from '../../api/servicesApi';
import { Loader } from '../../components/common/Loader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';

interface ServiceFormState {
  id?: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  isActive: boolean;
}

const emptyForm: ServiceFormState = {
  name: '',
  description: '',
  price: 0,
  duration: 30,
  category: 'General',
  isActive: true,
};

const ManageServices = () => {
  const { data, isLoading } = useGetServicesQuery();
  const [createService, { isLoading: creating }] = useCreateServiceMutation();
  const [updateService, { isLoading: updating }] = useUpdateServiceMutation();
  const [deleteService, { isLoading: deleting }] = useDeleteServiceMutation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState<ServiceFormState>(emptyForm);

  const openModal = (service?: ServiceFormState) => {
    if (service) {
      setFormState(service);
    } else {
      setFormState(emptyForm);
    }
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    const payload = {
      name: formState.name,
      description: formState.description,
      price: Number(formState.price),
      duration: Number(formState.duration),
      category: formState.category,
      isActive: formState.isActive,
    };
    if (formState.id) {
      await updateService({ id: formState.id, body: payload });
    } else {
      await createService(payload);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this service?')) {
      await deleteService(id);
    }
  };

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl/semi text-slate-900">Manage services</h2>
          <p className="text-sm text-slate-500">Create, edit, or pause services in your catalog.</p>
        </div>
        <Button onClick={() => openModal()}>Add service</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((service) => (
          <article key={service.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase text-primary-500">{service.category}</p>
                <h3 className="text-lg font-semibold text-slate-900">{service.name}</h3>
              </div>
              <span className="text-sm font-semibold text-primary-600">${Number(service.price).toFixed(2)}</span>
            </div>
            <p className="mt-3 text-sm text-slate-500 line-clamp-3">{service.description}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                variant="secondary"
                onClick={() =>
                  openModal({
                    id: service.id,
                    name: service.name,
                    description: service.description,
                    price: Number(service.price),
                    duration: service.duration,
                    category: service.category,
                    isActive: service.isActive,
                  })
                }
              >
                Edit
              </Button>
              <Button variant="ghost" onClick={() => handleDelete(service.id)} isLoading={deleting}>
                Delete
              </Button>
            </div>
          </article>
        ))}
      </div>

      <Modal
        title={formState.id ? 'Update service' : 'Create service'}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} isLoading={creating || updating}>
              Save
            </Button>
          </>
        }
      >
        <div className="grid gap-4">
          <Input
            label="Name"
            value={formState.name}
            onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
          />
          <Input
            label="Description"
            value={formState.description}
            onChange={(e) => setFormState((prev) => ({ ...prev, description: e.target.value }))}
          />
          <Input
            label="Category"
            value={formState.category}
            onChange={(e) => setFormState((prev) => ({ ...prev, category: e.target.value }))}
          />
          <Input
            label="Price"
            type="number"
            value={formState.price}
            onChange={(e) => setFormState((prev) => ({ ...prev, price: Number(e.target.value) }))}
          />
          <Input
            label="Duration (minutes)"
            type="number"
            value={formState.duration}
            onChange={(e) => setFormState((prev) => ({ ...prev, duration: Number(e.target.value) }))}
          />
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={formState.isActive}
              onChange={(e) => setFormState((prev) => ({ ...prev, isActive: e.target.checked }))}
            />
            Active
          </label>
        </div>
      </Modal>
    </section>
  );
};

export default ManageServices;

