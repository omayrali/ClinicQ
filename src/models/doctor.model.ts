export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  motto?: string;
  photoUrl?: string;
  consultationFee: number;
  yearsOfExperience: number;
  clinicId: string;
  rating?: number;
}