import { Routes, Route, Navigate } from 'react-router-dom';
import CustomerLayout from '../layouts/CustomerLayout';
import AdminLayout from '../layouts/AdminLayout';
import StaffLayout from '../layouts/StaffLayout';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import Home from '../features/customer/Home';
import ServicesList from '../features/services/ServicesList';
import ServiceDetail from '../features/services/ServiceDetail';
import CreateBooking from '../features/bookings/CreateBooking';
import MyBookings from '../features/bookings/MyBookings';
import BookingConfirmation from '../features/bookings/BookingConfirmation';
import Profile from '../features/customer/Profile';
import About from '../features/customer/About';
import StaffList from '../features/staff/StaffList';
import StaffDetail from '../features/staff/StaffDetail';
import AdminDashboard from '../features/admin/AdminDashboard';
import ManageServices from '../features/admin/ManageServices';
import ManageStaff from '../features/admin/ManageStaff';
import ManageBookings from '../features/admin/ManageBookings';
import SalonConfig from '../features/admin/SalonConfig';
import { AuthGuard } from '../utils/authGuard';

const AppRoutes = () => (
  <Routes>
    <Route element={<CustomerLayout />}>
      <Route index element={<Home />} />
      <Route path="services" element={<ServicesList />} />
      <Route path="services/:id" element={<ServiceDetail />} />
      <Route path="about" element={<About />} />
      <Route path="team" element={<StaffList />} />
      <Route path="staff/:id" element={<StaffDetail />} />
      <Route
        path="bookings/new"
        element={
          <AuthGuard roles="customer">
            <CreateBooking />
          </AuthGuard>
        }
      />
      <Route
        path="bookings"
        element={
          <AuthGuard roles={['customer', 'staff', 'admin']}>
            <MyBookings />
          </AuthGuard>
        }
      />
      <Route
        path="bookings/confirmation"
        element={
          <AuthGuard roles={['customer', 'staff', 'admin']}>
            <BookingConfirmation />
          </AuthGuard>
        }
      />
      <Route
        path="profile"
        element={
          <AuthGuard roles="customer">
            <Profile />
          </AuthGuard>
        }
      />
    </Route>

    <Route path="/admin" element={<AuthGuard roles="admin"><AdminLayout /></AuthGuard>}>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="services" element={<ManageServices />} />
      <Route path="staff" element={<ManageStaff />} />
      <Route path="bookings" element={<ManageBookings />} />
      <Route path="config" element={<SalonConfig />} />
      <Route index element={<Navigate to="dashboard" replace />} />
    </Route>

    <Route path="/staff" element={<AuthGuard roles={['staff', 'admin']}><StaffLayout /></AuthGuard>}>
      <Route path="bookings" element={<MyBookings />} />
      <Route path="profile" element={<StaffDetail />} />
      <Route index element={<Navigate to="bookings" replace />} />
    </Route>

    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;

