
import { useCallback, useEffect, useState } from 'react';

import { getDoctors } from '@/data/repositories/doctor.repo';
import { getAllAppointments } from '@/data/repositories/appointment.repo';

type DashboardStats = {
  doctorsManaged: number;
  completedAppointments: number;
  upcomingAppointments: number;
};

const initialStats: DashboardStats = {
  doctorsManaged: 0,
  completedAppointments: 0,
  upcomingAppointments: 0,
};

export function useStaffDashboard() {
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [doctors, appointments] = await Promise.all([
        getDoctors(),
        getAllAppointments(),
      ]);

      setStats({
        doctorsManaged: doctors.length,
        completedAppointments: appointments.filter(
          (appointment) => appointment.status === 'completed',
        ).length,
        upcomingAppointments: appointments.filter(
          (appointment) => appointment.status === 'upcoming',
        ).length,
      });
    } catch (err) {
      console.error('Failed to load dashboard:', err);
      setError('Could not load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  

useEffect(() => {
  const timer = setTimeout(() => {
    void loadDashboard();
  }, 0);

  return () => clearTimeout(timer);
}, [loadDashboard]);


  return {
    stats,
    loading,
    error,
    reload: loadDashboard,
  };
}
