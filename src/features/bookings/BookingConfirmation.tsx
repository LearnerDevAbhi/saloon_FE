import { useSearchParams } from 'react-router-dom';
import { ButtonLink } from '../../components/common/Button';

const BookingConfirmation = () => {
  const [search] = useSearchParams();
  const bookingId = search.get('bookingId');

  return (
    <section className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-card">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
        ✓
      </div>
      <h2 className="text-3xl font-semibold text-slate-900">You&apos;re all set!</h2>
      <p className="mt-3 text-slate-500">
        Your appointment is confirmed. A confirmation email and reminders will follow shortly.
      </p>
      {bookingId && <p className="mt-4 text-sm text-slate-400">Reference: {bookingId}</p>}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <ButtonLink to="/bookings">View my bookings</ButtonLink>
        <ButtonLink variant="secondary" to="/">
          Back to home
        </ButtonLink>
      </div>
    </section>
  );
};

export default BookingConfirmation;

