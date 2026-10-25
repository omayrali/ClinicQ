import {
  priceOptions,
  ratingOptions,
} from "@/features/doctors/viewmodels/searchFilters";
import type { Doctor } from "@/models/doctor.model";

type SearchFilters = {
  query: string;
  specialty?: string;
  priceIndex: number;
  ratingIndex: number;
};

export function searchDoctors(doctors: Doctor[], filters: SearchFilters) {
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
