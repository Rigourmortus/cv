import React from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { TherapistCard } from '../components/TherapistCard';
import { useAppContext } from '../context/AppContext';
import { TherapySpecialty } from '../types';
import { RootStackParamList } from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const specialties: Array<TherapySpecialty | 'All'> = [
  'All',
  'Anxiety',
  'Depression',
  'Trauma',
  'Relationships',
  'Stress',
  'LGBTQIA+',
  'Addiction',
  'Grief'
];

export function HomeScreen({ navigation }: Props) {
  const { filteredTherapists, selectedSpecialty, setSelectedSpecialty } = useAppContext();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Find your therapist</Text>
      <Text style={styles.subtitle}>Licensed professionals for video, voice, or in-person care.</Text>

      <FlatList
        horizontal
        data={specialties}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterList}
        renderItem={({ item }) => {
          const selected = item === selectedSpecialty;
          return (
            <Pressable
              onPress={() => setSelectedSpecialty(item)}
              style={[styles.filterChip, selected && styles.selectedFilterChip]}
            >
              <Text style={[styles.filterText, selected && styles.selectedFilterText]}>{item}</Text>
            </Pressable>
          );
        }}
      />

      <FlatList
        data={filteredTherapists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.results}
        renderItem={({ item }) => (
          <TherapistCard therapist={item} onPress={() => navigation.navigate('TherapistDetail', { therapistId: item.id })} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No therapists match this filter yet.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5FA',
    paddingTop: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#121A2A',
    paddingHorizontal: 16
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#5A688A',
    paddingHorizontal: 16
  },
  filterList: {
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 14
  },
  filterChip: {
    backgroundColor: '#E7ECF8',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8
  },
  selectedFilterChip: {
    backgroundColor: '#3559E0'
  },
  filterText: {
    color: '#273A65',
    fontWeight: '600'
  },
  selectedFilterText: {
    color: '#FFFFFF'
  },
  results: {
    paddingHorizontal: 16,
    paddingBottom: 120
  },
  emptyState: {
    padding: 24,
    alignItems: 'center'
  },
  emptyText: {
    color: '#5A688A'
  }
});
