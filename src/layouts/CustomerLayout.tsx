import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonLink } from '../components/common/Button';
import { selectCurrentUser, logout } from '../features/auth/authSlice';
import SiteFooter from '../components/common/SiteFooter';

const CustomerLayout = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between border-b border-slate-200 px-4 py-6">
        <Link to="/" className="text-xl font-semibold text-slate-900">
          Salon<span className="text-primary-700">Flow</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/team">Artists</Link>
          <Link to="/bookings/new">Book</Link>
          <Link to="/bookings">My bookings</Link>
          {user ? (
            <>
              <Link to="/profile">Hi, {user.name.split(' ')[0]}</Link>
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <ButtonLink to="/login">Login</ButtonLink>
          )}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl space-y-12 px-4 pb-16">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};

export default CustomerLayout;

