import { getDoctors } from "@/data/repositories/doctor.repo";
import type { Doctor } from "@/models/doctor.model";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

const priceOptions = [
  { label: "Any price", min: 0, max: Infinity },
  { label: "Under 400 EGP", min: 0, max: 399 },
  { label: "400 - 500 EGP", min: 400, max: 500 },
  { label: "Over 500 EGP", min: 501, max: Infinity },
];

const ratingOptions = [
  { label: "Any rating", min: 0 },
  { label: "4.5 and up", min: 4.5 },
  { label: "4.0 and up", min: 4 },
];

type SearchFilters = {
  query: string;
  specialty?: string;
  priceIndex: number;
  ratingIndex: number;
};

function searchDoctors(doctors: Doctor[], filters: SearchFilters) {
  const text = filters.query.trim().toLowerCase();
  const price = priceOptions[filters.priceIndex];
  const minRating = ratingOptions[filters.ratingIndex].min;

  return doctors
    .filter((doctor) => !filters.specialty || doctor.specialty === filters.specialty)
    .filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(text) ||
        doctor.specialty.toLowerCase().includes(text),
    )
    .filter(
      (doctor) =>
        doctor.consultationFee >= price.min &&
        doctor.consultationFee <= price.max,
    )
    .filter((doctor) => (doctor.rating ?? 0) >= minRating)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
}

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
    priceLabels: priceOptions.map((option) => option.label),
    ratingLabels: ratingOptions.map((option) => option.label),
    results,
    loading,
    error,
  };
}
