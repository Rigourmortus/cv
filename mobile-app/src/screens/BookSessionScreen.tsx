import React, { useMemo, useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAppContext } from '../context/AppContext';
import { RootStackParamList } from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'BookSession'>;

const sessionTypes: Array<'Video' | 'Voice' | 'In-person'> = ['Video', 'Voice', 'In-person'];

export function BookSessionScreen({ navigation, route }: Props) {
  const { therapists, bookSession } = useAppContext();
  const therapist = therapists.find((t) => t.id === route.params.therapistId);

  const [selectedType, setSelectedType] = useState<'Video' | 'Voice' | 'In-person'>('Video');
  const [dateISO, setDateISO] = useState('2026-04-01T18:00:00.000Z');
  const [notes, setNotes] = useState('I would like support with anxiety and sleep issues.');

  const sessionLabel = useMemo(() => new Date(dateISO).toLocaleString(), [dateISO]);

  async function onBook() {
    if (!therapist) {
      return;
    }

    await bookSession({
      therapistId: therapist.id,
      dateISO,
      sessionType: selectedType,
      notes
    });

    Alert.alert('Session booked', `You are scheduled with ${therapist.name} on ${sessionLabel}.`);
    navigation.navigate('Appointments');
  }

  if (!therapist) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Therapist not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Book with {therapist.name}</Text>
      <Text style={styles.caption}>Start with one session and continue as needed.</Text>

      <Text style={styles.label}>Session Type</Text>
      <View style={styles.row}>
        {sessionTypes.map((type) => {
          const selected = selectedType === type;
          return (
            <Pressable key={type} onPress={() => setSelectedType(type)} style={[styles.chip, selected && styles.selectedChip]}>
              <Text style={[styles.chipText, selected && styles.selectedChipText]}>{type}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.label}>Session Date & Time (ISO)</Text>
      <TextInput value={dateISO} onChangeText={setDateISO} style={styles.input} autoCapitalize="none" />
      <Text style={styles.helper}>Preview: {sessionLabel}</Text>

      <Text style={styles.label}>What do you want help with?</Text>
      <TextInput
        value={notes}
        onChangeText={setNotes}
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={5}
      />

      <Pressable style={styles.button} onPress={onBook}>
        <Text style={styles.buttonText}>Confirm Booking</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FC', padding: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#12203B' },
  caption: { marginTop: 8, color: '#5A688A', marginBottom: 20 },
  label: { marginTop: 14, fontWeight: '600', color: '#273A65' },
  row: { marginTop: 8, flexDirection: 'row', gap: 8 },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#E7ECF8'
  },
  selectedChip: {
    backgroundColor: '#3559E0'
  },
  chipText: { color: '#273A65', fontWeight: '600' },
  selectedChipText: { color: '#FFFFFF' },
  input: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CFD8EE',
    backgroundColor: '#FFF',
    padding: 12,
    color: '#1A2138'
  },
  textArea: { height: 120, textAlignVertical: 'top' },
  helper: { marginTop: 8, color: '#5A688A' },
  button: {
    marginTop: 24,
    backgroundColor: '#3559E0',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonText: { color: '#FFF', fontWeight: '700', fontSize: 16 }
});
