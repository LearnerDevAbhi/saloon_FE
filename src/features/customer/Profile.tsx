import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Loader } from '../../components/common/Loader';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../api/customerApi';
import { useDispatch } from 'react-redux';
import { updateUser } from '../auth/authSlice';

interface ProfileForm {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

const Profile = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: saving, isSuccess }] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileForm>();

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
    }
  }, [data, reset]);

  const onSubmit = async (values: ProfileForm) => {
    const payload = await updateProfile(values).unwrap();
    dispatch(updateUser(payload));
  };

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <section className="rounded-2xl bg-white p-8 shadow-card">
      <header className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">My profile</h2>
        <p className="text-sm text-slate-500">Keep your contact details fresh so we can reach you easily.</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
        <Input
          label="Full name"
          error={errors.name?.message}
          {...register('name', { required: 'Name is required' })}
        />
        <Input
          label="Email"
          type="email"
          disabled
          {...register('email')}
        />
        <Input label="Phone" {...register('phone')} />
        <Input label="Address" {...register('address')} />

        <div className="md:col-span-2 flex items-center gap-4">
          <Button type="submit" isLoading={saving}>
            Save changes
          </Button>
          {isSuccess && <span className="text-sm text-green-600">Profile updated!</span>}
        </div>
      </form>
    </section>
  );
};

export default Profile;

