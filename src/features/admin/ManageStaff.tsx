import { useMemo, useState } from 'react';
import {
  useCreateStaffMutation,
  useDeleteStaffMutation,
  useGetStaffQuery,
  useUpdateStaffMutation,
} from '../../api/staffApi';
import { useGetServicesQuery } from '../../api/servicesApi';
import { Loader } from '../../components/common/Loader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';

const defaultOffDays = ['sunday'];

interface StaffFormState {
  id?: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  startTime: string;
  endTime: string;
  weeklyOffDays: string[];
  serviceIds: string[];
}

const defaultForm: StaffFormState = {
  userId: '',
  name: '',
  email: '',
  phone: '',
  role: 'Expert',
  startTime: '09:00',
  endTime: '17:00',
  weeklyOffDays: defaultOffDays,
  serviceIds: [],
};

const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const ManageStaff = () => {
  const { data: staff, isLoading } = useGetStaffQuery();
  const { data: services } = useGetServicesQuery();
  const [createStaff, { isLoading: creating }] = useCreateStaffMutation();
  const [updateStaff, { isLoading: updating }] = useUpdateStaffMutation();
  const [deleteStaff, { isLoading: deleting }] = useDeleteStaffMutation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState<StaffFormState>(defaultForm);

  const serviceOptions = useMemo(
    () => services?.map((svc) => ({ label: svc.name, value: svc.id })) ?? [],
    [services],
  );

  const openModal = (staffMember?: StaffFormState) => {
    setFormState(
      staffMember ?? {
        ...defaultForm,
        serviceIds: [],
      },
    );
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    const payload = {
      userId: formState.userId,
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      role: formState.role,
      startTime: formState.startTime,
      endTime: formState.endTime,
      weeklyOffDays: formState.weeklyOffDays,
      serviceIds: formState.serviceIds,
    };

    if (formState.id) {
      await updateStaff({ id: formState.id, body: payload });
    } else {
      await createStaff(payload);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Remove this staff member?')) {
      await deleteStaff(id);
    }
  };

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Team members</h2>
          <p className="text-sm text-slate-500">Assign services, manage availability, and keep profiles updated.</p>
        </div>
        <Button onClick={() => openModal()}>Add staff</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {staff?.map((member) => (
          <article key={member.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <header className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-primary-500">{member.role}</p>
                <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
                <p className="text-sm text-slate-500">{member.email}</p>
              </div>
              <span className="text-sm text-slate-500">{member.phone}</span>
            </header>
            <p className="mt-3 text-sm text-slate-500">
              {member.startTime} – {member.endTime} · Off: {member.weeklyOffDays.join(', ') || 'None'}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
              {member.services.map((svc) => (
                <span key={svc.id} className="rounded-full bg-slate-100 px-3 py-1">
                  {svc.name}
                </span>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <Button
                variant="secondary"
                onClick={() =>
                  openModal({
                    id: member.id,
                    userId: member.user?.id ?? '',
                    name: member.name,
                    email: member.email,
                    phone: member.phone,
                    role: member.role,
                    startTime: member.startTime,
                    endTime: member.endTime,
                    weeklyOffDays: member.weeklyOffDays,
                    serviceIds: member.services.map((svc) => svc.id),
                  })
                }
              >
                Edit
              </Button>
              <Button variant="ghost" onClick={() => handleDelete(member.id)} isLoading={deleting}>
                Remove
              </Button>
            </div>
          </article>
        ))}
      </div>

      <Modal
        title={formState.id ? 'Update team member' : 'Add team member'}
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
        widthClass="max-w-3xl"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="User ID" value={formState.userId} onChange={(e) => setFormState((prev) => ({ ...prev, userId: e.target.value }))} />
          <Input label="Display name" value={formState.name} onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))} />
          <Input label="Email" value={formState.email} onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))} />
          <Input label="Phone" value={formState.phone} onChange={(e) => setFormState((prev) => ({ ...prev, phone: e.target.value }))} />
          <Input label="Role" value={formState.role} onChange={(e) => setFormState((prev) => ({ ...prev, role: e.target.value }))} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start time" type="time" value={formState.startTime} onChange={(e) => setFormState((prev) => ({ ...prev, startTime: e.target.value }))} />
            <Input label="End time" type="time" value={formState.endTime} onChange={(e) => setFormState((prev) => ({ ...prev, endTime: e.target.value }))} />
          </div>
          <div className="md:col-span-2">
            <p className="mb-2 text-sm font-semibold text-slate-600">Weekly off days</p>
            <div className="flex flex-wrap gap-2">
              {weekDays.map((day) => (
                <label key={day} className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs capitalize">
                  <input
                    type="checkbox"
                    checked={formState.weeklyOffDays.includes(day)}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        weeklyOffDays: e.target.checked
                          ? [...prev.weeklyOffDays, day]
                          : prev.weeklyOffDays.filter((d) => d !== day),
                      }))
                    }
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="mb-2 text-sm font-semibold text-slate-600">Services</p>
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map((option) => (
                <label key={option.value} className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs">
                  <input
                    type="checkbox"
                    checked={formState.serviceIds.includes(option.value)}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        serviceIds: e.target.checked
                          ? [...prev.serviceIds, option.value]
                          : prev.serviceIds.filter((id) => id !== option.value),
                      }))
                    }
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default ManageStaff;

