import { useCallback, useEffect, useMemo, useState } from 'react';
import type {Appointment,AppointmentStatus} from '@/models/appointment.model';

import {getAllAppointments,completeAppointment,cancelAppointment} from '@/data/repositories/appointment.repo';

export type StatusFilter = 'all' | AppointmentStatus;

export const allowedTransitions: Record<
  AppointmentStatus,
  AppointmentStatus[]
> = {
  upcoming: ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
};

export function usePatientAppointments() {
  const [items, setItems] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const appointments = await getAllAppointments();
      setItems(appointments);
    } catch (err) {
      console.error('Failed to load appointments:', err);
      setError('Could not load appointments.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void load();
    }, 0);

    return () => clearTimeout(timer);
  }, [load]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    return items.filter(
      (appointment) =>
        (filter === 'all' || appointment.status === filter) &&
        (!q || appointment.patientId.toLowerCase().includes(q)),
    );
  }, [items, filter, query]);

  const changeStatus = async (
    id: string,
    status: AppointmentStatus,
  ) => {
    const appointment = items.find((item) => item.id === id);

    if (!appointment) {
      setError('Appointment not found.');
      return;
    }

    if (!allowedTransitions[appointment.status].includes(status)) {
      setError(
        `Cannot change an appointment from ${appointment.status} to ${status}.`,
      );
      return;
    }

    try {
      setUpdatingId(id);
      setError(null);

      if (status === 'completed') {
        await completeAppointment(id);
      } else if (status === 'cancelled') {
        await cancelAppointment(id);
      } else {
        return;
      }

      // Reload to reflect the updated repository status.
      const appointments = await getAllAppointments();
      setItems(appointments);
    } catch (err) {
      console.error('Failed to update appointment:', err);
      setError('Could not update the appointment.');
    } finally {
      setUpdatingId(null);
    }
  };

  return {
    visible,
    filter,
    setFilter,
    query,
    setQuery,
    loading,
    error,
    reload: load,
    updatingId,
    changeStatus,
  };
}
