export type TherapySpecialty =
  | 'Anxiety'
  | 'Depression'
  | 'Trauma'
  | 'Relationships'
  | 'Stress'
  | 'LGBTQIA+'
  | 'Addiction'
  | 'Grief';

export interface Therapist {
  id: string;
  name: string;
  title: string;
  specialties: TherapySpecialty[];
  rating: number;
  sessionsCompleted: number;
  hourlyRate: number;
  nextAvailable: string;
  bio: string;
  languages: string[];
  remoteOnly: boolean;
}

export interface Appointment {
  id: string;
  therapistId: string;
  dateISO: string;
  sessionType: 'Video' | 'Voice' | 'In-person';
  notes?: string;
}
