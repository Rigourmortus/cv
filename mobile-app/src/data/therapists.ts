import { Therapist } from '../types';

export const therapists: Therapist[] = [
  {
    id: 't1',
    name: 'Dr. Maya Patel',
    title: 'Licensed Clinical Psychologist',
    specialties: ['Anxiety', 'Stress', 'Trauma'],
    rating: 4.9,
    sessionsCompleted: 920,
    hourlyRate: 140,
    nextAvailable: 'Today 6:30 PM',
    bio: 'Trauma-informed therapist focused on practical coping skills and compassionate care.',
    languages: ['English', 'Hindi'],
    remoteOnly: true
  },
  {
    id: 't2',
    name: 'Jordan Kim, LCSW',
    title: 'Licensed Clinical Social Worker',
    specialties: ['Depression', 'Relationships', 'LGBTQIA+'],
    rating: 4.8,
    sessionsCompleted: 610,
    hourlyRate: 120,
    nextAvailable: 'Tomorrow 9:00 AM',
    bio: 'Supports adults and teens with identity, relationships, and emotional resilience.',
    languages: ['English', 'Korean'],
    remoteOnly: false
  },
  {
    id: 't3',
    name: 'Arianna Wells, LMFT',
    title: 'Marriage & Family Therapist',
    specialties: ['Relationships', 'Grief', 'Stress'],
    rating: 4.7,
    sessionsCompleted: 500,
    hourlyRate: 110,
    nextAvailable: 'Friday 2:00 PM',
    bio: 'Collaborative therapy for couples and families navigating major life transitions.',
    languages: ['English', 'Spanish'],
    remoteOnly: false
  },
  {
    id: 't4',
    name: 'Samir Nasser, LPC',
    title: 'Licensed Professional Counselor',
    specialties: ['Addiction', 'Anxiety', 'Depression'],
    rating: 4.8,
    sessionsCompleted: 700,
    hourlyRate: 130,
    nextAvailable: 'Today 8:15 PM',
    bio: 'Evidence-based approaches for addiction recovery and mood stabilization.',
    languages: ['English', 'Arabic'],
    remoteOnly: true
  }
];
