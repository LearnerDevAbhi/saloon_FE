import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetServicesQuery } from '../../api/servicesApi';
import { useGetStaffQuery } from '../../api/staffApi';
import {
  useCreateBookingMutation,
  useGetBookingsQuery,
} from '../../api/bookingsApi';
import { Button } from '../../components/common/Button';
import { Select } from '../../components/common/Select';
import { Loader } from '../../components/common/Loader';
import { generateDateOptions, generateTimeSlots } from '../../utils/dateUtils';
import type { BookingStatus } from '../../types/common';

interface BookingForm {
  serviceId: string;
  staffId: string;
  bookingDate: string;
  startTime: string;
}

const CreateBooking = () => {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const defaultService = search.get('serviceId') ?? '';

  const { data: services, isLoading: loadingServices } = useGetServicesQuery();
  const { data: staff, isLoading: loadingStaff } = useGetStaffQuery();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingForm>({
    defaultValues: {
      serviceId: defaultService,
      staffId: '',
      bookingDate: generateDateOptions(14)[0]?.value ?? '',
      startTime: '',
    },
  });

  const serviceId = watch('serviceId');
  const staffId = watch('staffId');
  const bookingDate = watch('bookingDate');

  const { data: bookings } = useGetBookingsQuery(
    bookingDate ? { bookingDate } : undefined,
  );
  const [createBooking, { isLoading }] = useCreateBookingMutation();

  const availableSlots = useMemo(() => {
    if (!serviceId || !staffId || !bookingDate) {
      return [];
    }
    const service = services?.find((svc) => svc.id === serviceId);
    const staffMember = staff?.find((member) => member.id === staffId);
    if (!service || !staffMember) {
      return [];
    }
    const staffBookings =
      bookings?.filter(
        (booking) =>
          booking.staff.id === staffId && booking.bookingDate === bookingDate,
      ) ?? [];

    return generateTimeSlots(
      staffMember.startTime,
      staffMember.endTime,
      service.duration,
      staffBookings,
    );
  }, [serviceId, staffId, bookingDate, services, staff, bookings]);

  const onSubmit = async (values: BookingForm) => {
    try {
      const service = services?.find((svc) => svc.id === values.serviceId);
      const payload = {
        ...values,
        status: 'pending' as BookingStatus,
        amount: service ? Number(service.price) : undefined,
      };
      const booking = await createBooking(payload).unwrap();
      navigate(`/bookings/confirmation?bookingId=${booking.id}`, { replace: true });
    } catch {
      // handled by mutation state
    }
  };

  if (loadingServices || loadingStaff) {
    return <Loader fullScreen />;
  }

  return (
    <section className="rounded-2xl bg-white p-8 shadow-card">
      <header className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">Book an appointment</h2>
        <p className="text-sm text-slate-500">
          Choose a service, your preferred expert, and a convenient time.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Select label="Service" error={errors.serviceId?.message} {...register('serviceId', { required: 'Select a service' })}>
          <option value="">Choose a service</option>
          {services?.map((svc) => (
            <option key={svc.id} value={svc.id}>
              {svc.name} (${Number(svc.price).toFixed(2)})
            </option>
          ))}
        </Select>

        <Select label="Preferred Staff" error={errors.staffId?.message} {...register('staffId', { required: 'Select a staff member' })}>
          <option value="">Choose a professional</option>
          {staff?.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name} • {member.role}
            </option>
          ))}
        </Select>

        <Select label="Date" error={errors.bookingDate?.message} {...register('bookingDate', { required: 'Pick a date' })}>
          {generateDateOptions(14).map((date) => (
            <option key={date.value} value={date.value}>
              {date.label}
            </option>
          ))}
        </Select>

        <Select label="Time" error={errors.startTime?.message} {...register('startTime', { required: 'Pick a start time' })} disabled={!availableSlots.length}>
          <option value="">{availableSlots.length ? 'Choose a time slot' : 'No slots available'}</option>
          {availableSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </Select>

        <Button type="submit" isLoading={isLoading} className="w-full">
          Confirm booking
        </Button>
      </form>
    </section>
  );
};

export default CreateBooking;

