import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '../components/common/Button';
import { logout } from '../features/auth/authSlice';
import SiteFooter from '../components/common/SiteFooter';

const links = [
  { to: '/admin/dashboard', label: 'Overview' },
  { to: '/admin/services', label: 'Services' },
  { to: '/admin/staff', label: 'Staff' },
  { to: '/admin/bookings', label: 'Bookings' },
  { to: '/admin/config', label: 'Salon Config' },
];

const AdminLayout = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-64 flex-shrink-0 bg-white p-6 shadow-xl lg:block">
        <p className="text-xl font-bold text-slate-900">SalonFlow Admin</p>
        <nav className="mt-8 flex flex-col gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-primary-50 text-primary-600' : 'text-slate-500 hover:text-slate-900'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Button className="mt-10 w-full" variant="secondary" onClick={() => dispatch(logout())}>
          Logout
        </Button>
      </aside>
      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-6 lg:p-10">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
};

export default AdminLayout;

