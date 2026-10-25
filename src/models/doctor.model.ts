export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  motto?: string;
  photoKey?: string;
  consultationFee: number;
  yearsOfExperience: number;
  clinicId: string;
  rating?: number;
}