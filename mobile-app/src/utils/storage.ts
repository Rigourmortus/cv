import AsyncStorage from '@react-native-async-storage/async-storage';

import { Appointment } from '../types';

const APPOINTMENTS_KEY = 'mindbridge:appointments';

export async function loadAppointments(): Promise<Appointment[]> {
  const raw = await AsyncStorage.getItem(APPOINTMENTS_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as Appointment[];
  } catch {
    return [];
  }
}

export async function saveAppointments(appointments: Appointment[]): Promise<void> {
  await AsyncStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
}
