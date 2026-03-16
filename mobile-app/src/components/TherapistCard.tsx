import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Therapist } from '../types';

interface Props {
  therapist: Therapist;
  onPress: () => void;
}

export function TherapistCard({ therapist, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{therapist.name}</Text>
        <Text style={styles.rating}>⭐ {therapist.rating}</Text>
      </View>
      <Text style={styles.title}>{therapist.title}</Text>
      <Text style={styles.meta}>{therapist.sessionsCompleted}+ sessions • ${therapist.hourlyRate}/hr</Text>
      <Text style={styles.specialties}>{therapist.specialties.join(' • ')}</Text>
      <Text style={styles.availability}>Next available: {therapist.nextAvailable}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A2138'
  },
  rating: {
    fontWeight: '600',
    color: '#3D4A72'
  },
  title: {
    marginTop: 4,
    color: '#404A63'
  },
  meta: {
    marginTop: 8,
    color: '#5A688A'
  },
  specialties: {
    marginTop: 8,
    fontWeight: '500',
    color: '#1F7A8C'
  },
  availability: {
    marginTop: 10,
    color: '#0D6EFD',
    fontWeight: '600'
  }
});
