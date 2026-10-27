
import { useCallback, useEffect, useState } from 'react';

import type { Doctor } from '@/models/doctor.model';
import { getDoctors, updateDoctor} from '@/data/repositories/doctor.repo';

type EditableDoctorFields = Partial<Omit<Doctor, 'id' | 'clinicId'>>;

export function useManageDoctorProfileViewModel() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(
    null,
  );
  const [draft, setDraft] = useState<EditableDoctorFields>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const selectedDoctor =
    doctors.find((doctor) => doctor.id === selectedDoctorId) ?? null;

  const loadDoctors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      const result = await getDoctors();

      setDoctors(result);

      setSelectedDoctorId((currentId) => {
        const exists = result.some((doctor) => doctor.id === currentId);
        return exists ? currentId : result[0]?.id ?? null;
      });

      const currentDoctor = result.find(
        (doctor) => doctor.id === selectedDoctorId,
      ) ?? result[0];

      setDraft(currentDoctor ? { ...currentDoctor } : {});
    } catch (err) {
      console.error('Failed to load doctors:', err);
      setError('Could not load doctor profiles.');
    } finally {
      setLoading(false);
    }
  }, [selectedDoctorId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadDoctors();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadDoctors]);

  const selectDoctor = (doctorId: string) => {
    const doctor = doctors.find((item) => item.id === doctorId);

    if (!doctor) {
      setError('Doctor profile not found.');
      return;
    }

    setSelectedDoctorId(doctorId);
    setDraft({ ...doctor });
    setError(null);
    setSuccessMessage(null);
  };

  const updateDraft = <K extends keyof EditableDoctorFields>(
    field: K,
    value: EditableDoctorFields[K],
  ) => {
    setDraft((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError(null);
    setSuccessMessage(null);
  };

  const resetChanges = () => {
    if (!selectedDoctor) return;

    setDraft({ ...selectedDoctor });
    setError(null);
    setSuccessMessage(null);
  };

  const saveChanges = async () => {
    if (!selectedDoctor) {
      setError('Select a doctor before saving.');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccessMessage(null);

      const updatedDoctor = await updateDoctor(
        selectedDoctor.id,
        draft,
      );

      setDoctors((previous) =>
        previous.map((doctor) =>
          doctor.id === updatedDoctor.id ? updatedDoctor : doctor,
        ),
      );

      setDraft({ ...updatedDoctor });
      setSuccessMessage('Doctor profile updated successfully.');
    } catch (err) {
      console.error('Failed to update doctor profile:', err);
      setError('Could not save the doctor profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const hasChanges =
    selectedDoctor !== null &&
    Object.keys(draft).some((key) => {
      const field = key as keyof Doctor;
      return draft[field as keyof EditableDoctorFields] !== selectedDoctor[field];
    });

  return {
    doctors,
    selectedDoctor,
    selectedDoctorId,
    draft,
    loading,
    saving,
    error,
    successMessage,
    hasChanges,
    selectDoctor,
    updateDraft,
    saveChanges,
    resetChanges,
    reload: loadDoctors,
  };
}
