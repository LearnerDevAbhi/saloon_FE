import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../api/authApi';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [signup, { isLoading, error }] = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
    },
  });

  const onSubmit = async (values: RegisterForm) => {
    try {
      const response = await signup(values).unwrap();
      navigate(response.user.role === 'customer' ? '/' : '/login', { replace: true });
    } catch {
      // handled by RTK Query error state
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-card">
      <h2 className="mb-6 text-2xl font-semibold text-slate-900">Create your account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full name"
          placeholder="Jane Doe"
          error={errors.name?.message}
          {...register('name', { required: 'Name is required' })}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email', { required: 'Email is required' })}
        />
        <Input
          label="Phone"
          placeholder="+1 555 000 0000"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <Input
          label="Password"
          type="password"
          placeholder="********"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 8, message: 'Minimum 8 characters' },
          })}
        />
        {error && (
          <p className="text-sm text-red-500">
            {'data' in error ? (error.data as { message?: string })?.message ?? 'Unable to register' : 'Unable to register'}
          </p>
        )}
        <Button type="submit" className="w-full" isLoading={isLoading}>
          Sign up
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-primary-600">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;

