import { useCallback, useEffect, useMemo, useState } from 'react';
import { Doctor } from '@/models/doctor.model';
import { Slot } from '@/models/slot.model';
import { getDoctors} from '@/data/repositories/doctor.repo';
import {
  addSlot as createSlot,
  getSlots,
  removeSlot as deleteSlot,
} from '@/data/repositories/slot.repo';

const TIME_REGEX = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

function nextDays(count: number) {
  const startDate = new Date();
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return {
      key,
      label: date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
    };
  });
}

export function useDoctorSchedule() {
  const days = useMemo(() => nextDays(14), []);

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const [date, setDate] = useState<string>(days[0].key);
  const [slots, setSlots] = useState<Slot[]>([]);

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  
  useEffect(() => {
    (async () => {
      try {
        const list = await getDoctors();
        setDoctors(list);
        setDoctorId(list[0]?.id ?? null);
        if (list.length === 0) setLoading(false);
      } catch {
        setError('Could not load doctors.');
        setLoading(false);
      }
    })();
  }, []);

  
  const loadSlots = useCallback(async () => {
    if (!doctorId) return;
    try {
      setLoading(true);
      setError(null);
      setSlots(await getSlots(doctorId, date));
    } catch {
      setError('Could not load the schedule.');
    } finally {
      setLoading(false);
    }
  }, [doctorId, date]);

 
  const addSlot = async () => {
    if (!doctorId) return;
    const start = startTime.trim();
    const end = endTime.trim();

    if (!TIME_REGEX.test(start) || !TIME_REGEX.test(end)) {
      return setFormError('Use 24h format (e.g. 09:30).');
    }
    if (start >= end) return setFormError('End time must be after start time.');
    if (slots.some((s) => start < s.endTime && s.startTime < end)) {
      return setFormError('This slot overlaps an existing one.');
    }

    try {
      setSaving(true);
      setFormError(null);
      await createSlot({ doctorId, date, startTime: start, endTime: end });
      setStartTime('');
      setEndTime('');
      await loadSlots();
    } catch {
      setFormError('Could not add the slot.');
    } finally {
      setSaving(false);
    }
  };

  const removeSlot = async (slot: Slot) => {
    if (slot.status === 'booked') return setFormError('Booked slots cannot be removed. Cancel the appointment first.');
    try {
      setFormError(null);
      await deleteSlot(slot.id);
      await loadSlots();
    } catch {
      setFormError('Could not remove the slot.');
    }
  };

  return {
    days, doctors, doctorId, setDoctorId, date, setDate, slots,
    startTime, setStartTime, endTime, setEndTime, formError,
    loading, error, saving, reload: loadSlots, addSlot, removeSlot,
  };
}