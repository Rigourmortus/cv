import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAppContext } from '../context/AppContext';
import { RootStackParamList } from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'TherapistDetail'>;

export function TherapistDetailScreen({ navigation, route }: Props) {
  const { therapists } = useAppContext();
  const therapist = therapists.find((t) => t.id === route.params.therapistId);

  if (!therapist) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Therapist not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.name}>{therapist.name}</Text>
        <Text style={styles.title}>{therapist.title}</Text>

        <View style={styles.metaCard}>
          <Text style={styles.metaText}>⭐ {therapist.rating} rating</Text>
          <Text style={styles.metaText}>{therapist.sessionsCompleted}+ sessions completed</Text>
          <Text style={styles.metaText}>${therapist.hourlyRate}/hour</Text>
          <Text style={styles.metaText}>Languages: {therapist.languages.join(', ')}</Text>
          <Text style={styles.metaText}>Format: {therapist.remoteOnly ? 'Remote only' : 'Remote + in-person'}</Text>
        </View>

        <Text style={styles.sectionTitle}>Specialties</Text>
        <Text style={styles.body}>{therapist.specialties.join(' • ')}</Text>

        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.body}>{therapist.bio}</Text>

        <Text style={styles.sectionTitle}>Next availability</Text>
        <Text style={styles.body}>{therapist.nextAvailable}</Text>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => navigation.navigate('BookSession', { therapistId: therapist.id })}
        >
          <Text style={styles.primaryButtonText}>Book Session</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FC' },
  content: { padding: 16, paddingBottom: 120 },
  name: { fontSize: 24, fontWeight: '700', color: '#111C34' },
  title: { marginTop: 4, color: '#516188' },
  metaCard: {
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    gap: 8
  },
  metaText: { color: '#2F3E62' },
  sectionTitle: { marginTop: 20, fontSize: 16, fontWeight: '700', color: '#1A2138' },
  body: { marginTop: 8, color: '#48597F', lineHeight: 21 },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16
  },
  primaryButton: {
    backgroundColor: '#3559E0',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  primaryButtonText: { color: '#FFF', fontWeight: '700', fontSize: 16 }
});
