
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Doctor } from '@/models/doctor.model';
import type {
  DoctorSchedule,
  WorkingDay,
} from '@/models/schedule.model';
import type { Slot } from '@/models/slot.model';

import { getDoctorById } from '@/data/repositories/doctor.repo';
import {
  getSchedule,
  updateSchedule,
} from '@/data/repositories/schedule.repo';
import {
  addSlot as addSlotRepo,
  getSlots,
  removeSlot as removeSlotRepo,
} from '@/data/repositories/slot.repo';

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function getNextDays(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return {
      date: `${year}-${month}-${day}`,
      dayName: DAY_NAMES[date.getDay()],
      dayNumber: date.getDate(),
      dayOfWeek: date.getDay(),
    };
  });
}

export function useManageDoctorScheduleViewModel(doctorId: string) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [schedule, setSchedule] = useState<DoctorSchedule | null>(null);
  const [draft, setDraft] = useState<DoctorSchedule | null>(null);

  const [selectedDate, setSelectedDate] = useState('');
  const [slots, setSlots] = useState<Slot[]>([]);

  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('09:30');

  const [loading, setLoading] = useState(true);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [savingSchedule, setSavingSchedule] = useState(false);
  const [savingSlot, setSavingSlot] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const days = useMemo(() => getNextDays(14), []);

  const selectedDay = days.find(
    (day) => day.date === selectedDate,
  );

  const selectedWorkingDay = draft?.workingDays.find(
    (day) => day.dayOfWeek === selectedDay?.dayOfWeek,
  );

  const hasScheduleChanges =
    schedule !== null &&
    draft !== null &&
    JSON.stringify(schedule) !== JSON.stringify(draft);

  const loadSchedule = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [doctorResult, scheduleResult] = await Promise.all([
        getDoctorById(doctorId),
        getSchedule(doctorId),
      ]);

      setDoctor(doctorResult);
      setSchedule(scheduleResult);
      setDraft({
        ...scheduleResult,
        workingDays: scheduleResult.workingDays.map((day) => ({
          ...day,
        })),
      });
    } catch (err) {
      console.error('Failed to load doctor schedule:', err);
      setError('Could not load the assigned doctor or their schedule.');
    } finally {
      setLoading(false);
    }
  }, [doctorId]);

  const loadSlots = useCallback(async () => {
    if (!selectedDate) {
      setSlots([]);
      return;
    }

    try {
      setSlotsLoading(true);
      setError(null);

      const result = await getSlots(doctorId, selectedDate);
      setSlots(result);
    } catch (err) {
      console.error('Failed to load slots:', err);
      setError('Could not load appointment slots.');
    } finally {
      setSlotsLoading(false);
    }
  }, [doctorId, selectedDate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadSchedule();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadSchedule]);

useEffect(() => {
  if (!selectedDate && days.length > 0) {
    const timer = setTimeout(() => {
      setSelectedDate(days[0].date);
    }, 0);

    return () => clearTimeout(timer);
  }
}, [days, selectedDate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadSlots();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadSlots]);

  const selectDate = (date: string) => {
    setSelectedDate(date);
    setFormError(null);
    setError(null);
    setSuccessMessage(null);
  };

  const updateSlotDuration = (minutes: number) => {
    if (!draft || !Number.isFinite(minutes) || minutes <= 0) {
      setFormError('Slot duration must be greater than zero.');
      return;
    }

    setDraft({ ...draft, slotMinutes: minutes });
    setFormError(null);
    setSuccessMessage(null);
  };

  const updateWorkingDay = (
    dayOfWeek: number,
    changes: Partial<Omit<WorkingDay, 'dayOfWeek'>>,
  ) => {
    if (!draft) return;

    const exists = draft.workingDays.some(
      (day) => day.dayOfWeek === dayOfWeek,
    );

    const workingDays = exists
      ? draft.workingDays.map((day) =>
          day.dayOfWeek === dayOfWeek
            ? { ...day, ...changes }
            : day,
        )
      : [
          ...draft.workingDays,
          {
            dayOfWeek,
            startTime: changes.startTime ?? '09:00',
            endTime: changes.endTime ?? '17:00',
          },
        ];

    setDraft({ ...draft, workingDays });
    setFormError(null);
    setSuccessMessage(null);
  };

  const toggleWorkingDay = (dayOfWeek: number) => {
    if (!draft) return;

    const isWorking = draft.workingDays.some(
      (day) => day.dayOfWeek === dayOfWeek,
    );

    const workingDays = isWorking
      ? draft.workingDays.filter(
          (day) => day.dayOfWeek !== dayOfWeek,
        )
      : [
          ...draft.workingDays,
          {
            dayOfWeek,
            startTime: '09:00',
            endTime: '17:00',
          },
        ];

    setDraft({ ...draft, workingDays });
    setFormError(null);
    setSuccessMessage(null);
  };

  const saveSchedule = async () => {
    if (!draft) {
      setError('No schedule is available to save.');
      return;
    }

    if (
      !Number.isInteger(draft.slotMinutes) ||
      draft.slotMinutes <= 0
    ) {
      setFormError('Slot duration must be a positive whole number.');
      return;
    }

    const invalidDay = draft.workingDays.some(
      (day) =>
        !day.startTime ||
        !day.endTime ||
        day.startTime >= day.endTime,
    );

    if (invalidDay) {
      setFormError('Each working day must have a valid start and end time.');
      return;
    }

    try {
      setSavingSchedule(true);
      setError(null);
      setFormError(null);
      setSuccessMessage(null);

      const updatedSchedule = {
        ...draft,
        doctorId,
        workingDays: draft.workingDays.map((day) => ({ ...day })),
      };

      await updateSchedule(updatedSchedule);

      setSchedule(updatedSchedule);
      setDraft({
        ...updatedSchedule,
        workingDays: updatedSchedule.workingDays.map((day) => ({
          ...day,
        })),
      });

      setSuccessMessage('Doctor schedule updated successfully.');
    } catch (err) {
      console.error('Failed to save doctor schedule:', err);
      setError('Could not save the schedule. Please try again.');
    } finally {
      setSavingSchedule(false);
    }
  };

  const resetSchedule = () => {
    if (!schedule) return;

    setDraft({
      ...schedule,
      workingDays: schedule.workingDays.map((day) => ({ ...day })),
    });

    setFormError(null);
    setError(null);
    setSuccessMessage(null);
  };

  const addSlot = async () => {
    if (!draft || !selectedDate || !selectedDay) {
      setFormError('Select a date before adding a slot.');
      return;
    }

    if (!selectedWorkingDay) {
      setFormError('The doctor does not work on the selected day.');
      return;
    }

    if (
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(startTime) ||
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(endTime) ||
      startTime >= endTime
    ) {
      setFormError('Enter a valid start time and end time.');
      return;
    }

    const toMinutes = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const start = toMinutes(startTime);
    const end = toMinutes(endTime);
    const workingStart = toMinutes(selectedWorkingDay.startTime);
    const workingEnd = toMinutes(selectedWorkingDay.endTime);

    if (start < workingStart || end > workingEnd) {
      setFormError('The slot must be within the doctor’s working hours.');
      return;
    }

    if (end - start !== draft.slotMinutes) {
      setFormError(
        `Each slot must be exactly ${draft.slotMinutes} minutes long.`,
      );
      return;
    }

    const overlaps = slots.some((slot) => {
      const existingStart = toMinutes(slot.startTime);
      const existingEnd = toMinutes(slot.endTime);

      return start < existingEnd && end > existingStart;
    });

    if (overlaps) {
      setFormError('This slot overlaps an existing slot.');
      return;
    }

    try {
      setSavingSlot(true);
      setFormError(null);
      setError(null);
      setSuccessMessage(null);

      await addSlotRepo({
        doctorId,
        date: selectedDate,
        startTime,
        endTime,
      });

      await loadSlots();
      setSuccessMessage('Appointment slot added successfully.');
    } catch (err) {
      console.error('Failed to add slot:', err);
      setFormError(
        err instanceof Error ? err.message : 'Could not add the slot.',
      );
    } finally {
      setSavingSlot(false);
    }
  };

  const removeSlot = async (slotId: string) => {
    try {
      setSavingSlot(true);
      setError(null);
      setFormError(null);
      setSuccessMessage(null);

      await removeSlotRepo(slotId);
      await loadSlots();

      setSuccessMessage('Appointment slot removed successfully.');
    } catch (err) {
      console.error('Failed to remove slot:', err);
      setFormError(
        err instanceof Error ? err.message : 'Could not remove the slot.',
      );
    } finally {
      setSavingSlot(false);
    }
  };

  return {
    doctor,
    schedule,
    draft,
    days,
    selectedDate,
    selectedDay,
    selectedWorkingDay,
    slots,
    startTime,
    endTime,
    loading,
    slotsLoading,
    savingSchedule,
    savingSlot,
    error,
    formError,
    successMessage,
    hasScheduleChanges,
    setStartTime,
    setEndTime,
    selectDate,
    updateSlotDuration,
    updateWorkingDay,
    toggleWorkingDay,
    saveSchedule,
    resetSchedule,
    addSlot,
    removeSlot,
    reloadSchedule: loadSchedule,
    reloadSlots: loadSlots,
  };
}
