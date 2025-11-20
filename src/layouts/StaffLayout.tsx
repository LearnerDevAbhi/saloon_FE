import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { Button } from '../components/common/Button';
import SiteFooter from '../components/common/SiteFooter';

const StaffLayout = () => {
  const dispatch = useDispatch();
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
        <h1 className="text-lg font-semibold text-slate-900">Staff Portal</h1>
        <nav className="flex items-center gap-4 text-sm text-slate-500">
          <NavLink
            to="/staff/bookings"
            className={({ isActive }) => (isActive ? 'font-semibold text-primary-600' : undefined)}
          >
            My bookings
          </NavLink>
          <NavLink
            to="/staff/profile"
            className={({ isActive }) => (isActive ? 'font-semibold text-primary-600' : undefined)}
          >
            Profile
          </NavLink>
          <Button variant="ghost" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};

export default StaffLayout;

