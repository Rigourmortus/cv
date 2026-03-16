import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { therapists } from '../data/therapists';
import { Appointment, Therapist, TherapySpecialty } from '../types';
import { loadAppointments, saveAppointments } from '../utils/storage';

interface AppContextValue {
  therapists: Therapist[];
  appointments: Appointment[];
  selectedSpecialty: TherapySpecialty | 'All';
  setSelectedSpecialty: (specialty: TherapySpecialty | 'All') => void;
  filteredTherapists: Therapist[];
  bookSession: (data: Omit<Appointment, 'id'>) => Promise<void>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<TherapySpecialty | 'All'>('All');

  useEffect(() => {
    loadAppointments().then(setAppointments);
  }, []);

  const filteredTherapists = useMemo(() => {
    if (selectedSpecialty === 'All') {
      return therapists;
    }

    return therapists.filter((therapist) => therapist.specialties.includes(selectedSpecialty));
  }, [selectedSpecialty]);

  async function bookSession(data: Omit<Appointment, 'id'>) {
    const appointment: Appointment = {
      id: `${Date.now()}`,
      ...data
    };

    const nextAppointments = [appointment, ...appointments];
    setAppointments(nextAppointments);
    await saveAppointments(nextAppointments);
  }

  const value = {
    therapists,
    appointments,
    selectedSpecialty,
    setSelectedSpecialty,
    filteredTherapists,
    bookSession
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
