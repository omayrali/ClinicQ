import { useCallback, useEffect, useMemo, useState } from 'react';
import { Appointment, AppointmentStatus } from '@/models/appointment.model';
import { getAppointments, updateAppointmentStatus } from '@/data/repositories/appointment.repo';
export type StatusFilter = 'all' | AppointmentStatus;


export const allowedTransitions: Record<AppointmentStatus, AppointmentStatus[]> = {
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
      setItems(await getAppointments());
    } catch {
      setError('Could not load appointments.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (a) =>
        (filter === 'all' || a.status === filter) &&
        (!q || a.patientId.toLowerCase().includes(q))
    );
  }, [items, filter, query]);

  const changeStatus = async (id: string, status: AppointmentStatus) => {
    try {
      setUpdatingId(id);
      const updated = await updateAppointmentStatus(id, status);
      setItems((prev) => prev.map((a) => (a.id === id ? updated : a)));
    } catch {
      setError('Could not update the appointment.');
    } finally {
      setUpdatingId(null);
    }
  };

  return { visible, filter, setFilter, query, setQuery, loading, error, reload: load, updatingId, changeStatus };
}