export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  motto?: string;
  photoKey?: number;
  consultationFee: number;
  yearsOfExperience: number;
  clinicId: string;
  rating?: number;
}