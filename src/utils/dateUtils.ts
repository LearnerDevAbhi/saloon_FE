import type { Booking } from '../types/common';

export const formatDate = (date: string | Date) =>
  new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(
    typeof date === 'string' ? new Date(date) : date,
  );

export const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
};

export const generateDateOptions = (days = 14) => {
  const today = new Date();
  return Array.from({ length: days }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return {
      label: formatDate(date),
      value: date.toISOString().split('T')[0],
    };
  });
};

export const generateTimeSlots = (
  startTime: string,
  endTime: string,
  durationMinutes: number,
  existingBookings: Booking[] = [],
) => {
  const start = toMinutes(startTime);
  const end = toMinutes(endTime);
  const slots: string[] = [];

  for (let time = start; time + durationMinutes <= end; time += durationMinutes) {
    const slotStart = toTimeString(time);
    const slotEnd = toTimeString(time + durationMinutes);

    const overlaps = existingBookings.some(
      (booking) => booking.startTime < slotEnd && booking.endTime > slotStart,
    );

    if (!overlaps) {
      slots.push(slotStart);
    }
  }

  return slots;
};

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const toTimeString = (minutes: number) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

