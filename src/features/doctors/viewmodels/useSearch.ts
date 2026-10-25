import { getDoctors } from "@/data/repositories/doctor.repo";
import { searchDoctors } from "@/features/doctors/viewmodels/searchDoctors";
import type { Doctor } from "@/models/doctor.model";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export function useSearch() {
  const router = useRouter();
  const { specialty } = useLocalSearchParams<{ specialty?: string }>();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [query, setQuery] = useState("");
  const [priceIndex, setPriceIndex] = useState(0);
  const [ratingIndex, setRatingIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadDoctors() {
      try {
        setDoctors(await getDoctors());
      } catch {
        setError(true);
      }
      setLoading(false);
    }

    loadDoctors();
  }, []);

  const specialties = doctors
    .map((doctor) => doctor.specialty)
    .filter((name, index, all) => all.indexOf(name) === index);

  const results = searchDoctors(doctors, {
    query,
    specialty,
    priceIndex,
    ratingIndex,
  });

  const activeFilters = (priceIndex > 0 ? 1 : 0) + (ratingIndex > 0 ? 1 : 0);

  function resetFilters() {
    setPriceIndex(0);
    setRatingIndex(0);
  }

  function selectSpecialty(name?: string) {
    router.setParams({ specialty: name });
  }

  return {
    query,
    setQuery,
    specialty,
    specialties,
    selectSpecialty,
    priceIndex,
    setPriceIndex,
    ratingIndex,
    setRatingIndex,
    activeFilters,
    resetFilters,
    results,
    loading,
    error,
  };
}
