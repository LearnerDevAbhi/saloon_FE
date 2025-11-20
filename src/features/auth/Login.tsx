import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import type { Location } from 'react-router-dom';
import { useLoginMutation } from '../../api/authApi';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './authSlice';

interface LoginForm {
  email: string;
  password: string;
}

const roleRedirectMap: Record<string, string> = {
  admin: '/admin/dashboard',
  staff: '/staff/bookings',
  customer: '/',
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectCurrentUser);
  const from = (location.state as { from?: Location })?.from?.pathname ?? null;
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (user) {
      navigate(from ?? roleRedirectMap[user.role], { replace: true });
    }
  }, [user, navigate, from]);

  const onSubmit = async (values: LoginForm) => {
    try {
      const response = await login(values).unwrap();
      const target = from ?? roleRedirectMap[response.user.role];
      navigate(target, { replace: true });
    } catch {
      // handled by RTK Query error state
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-card">
      <h2 className="mb-6 text-2xl font-semibold text-slate-900">Welcome back</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email', { required: 'Email is required' })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="********"
          error={errors.password?.message}
          {...register('password', { required: 'Password is required' })}
        />
        {error && (
          <p className="text-sm text-red-500">
            {'data' in error ? (error.data as { message?: string })?.message ?? 'Unable to login' : 'Unable to login'}
          </p>
        )}
        <Button type="submit" className="w-full" isLoading={isLoading}>
          Sign in
        </Button>
      </form>
      {isSuccess && (
        <p className="mt-4 text-center text-sm text-green-600">Login successful. Redirecting...</p>
      )}
      <p className="mt-6 text-center text-sm text-slate-500">
        New to the salon?{' '}
        <Link to="/register" className="font-semibold text-primary-600">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;

