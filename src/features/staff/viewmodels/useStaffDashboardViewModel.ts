import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

import { useSession } from '@/context/SessionContext';
import { getDoctorByClinicId, getDoctors } from '@/data/repositories/doctor.repo';
import { getClinicById } from '@/data/repositories/clinic.repo';
import { getAllAppointments } from '@/data/repositories/appointment.repo';
import type { Clinic } from '@/models/clinic.model';
import type { Doctor } from '@/models/doctor.model';

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

export function useStaffDashboardViewModel() {
  const router = useRouter();
  const clinicId = useSession().user?.clinicId;
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [clinic, setClinic] = useState<Clinic | null>(null);
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

      if (clinicId) {
        setDoctor(await getDoctorByClinicId(clinicId));
        setClinic(await getClinicById(clinicId));
      }

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
  }, [clinicId]);

  function openDoctorProfile() {
    router.navigate('/doctor-profile');
  }



useEffect(() => {
  const timer = setTimeout(() => {
    void loadDashboard();
  }, 0);

  return () => clearTimeout(timer);
}, [loadDashboard]);


  return {
    stats,
    doctor,
    clinic,
    openDoctorProfile,
    loading,
    error,
    reload: loadDashboard,
  };
}