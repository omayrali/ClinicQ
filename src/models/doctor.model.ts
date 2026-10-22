export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  photoKey?: string;
  consultationFee: number;
  yearsOfExperience: number;
  location: string;
  rating?: number;
}