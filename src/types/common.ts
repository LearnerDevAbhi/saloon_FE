export type UserRole = 'admin' | 'staff' | 'customer';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  isActive: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  services: Service[];
  startTime: string;
  endTime: string;
  weeklyOffDays: string[];
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface Booking {
  id: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  amount: number;
  customer?: {
    id: string;
    name: string;
    email?: string;
  };
  service: Service;
  staff: StaffMember;
}

