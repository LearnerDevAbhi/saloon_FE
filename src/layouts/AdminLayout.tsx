import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../components/common/Button';
import { selectCurrentUser, logout } from '../features/auth/authSlice';
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
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">

      {/* ----------- ADMIN HEADER ----------- */}
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link to="/admin/dashboard" className="text-xl font-semibold text-slate-900">
            Salon<span className="text-primary-700">Flow</span> Admin
          </Link>

          <Button variant="ghost" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      {/* ----------- BODY (SIDEBAR + CONTENT) ----------- */}
      <div className="flex flex-1">

        {/* Sidebar */}
        <aside className="hidden w-64 flex-shrink-0 bg-white p-6 shadow-xl lg:block">
          <nav className="mt-4 flex flex-col gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <Button className="mt-10 w-full" variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-10">
          <Outlet />
        </main>
      </div>

      {/* ----------- FOOTER ----------- */}
      <SiteFooter />
    </div>
  );
};

export default AdminLayout;
