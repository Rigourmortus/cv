import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { useAppContext } from '../context/AppContext';

export function AppointmentsScreen() {
  const { appointments, therapists } = useAppContext();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Sessions</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const therapist = therapists.find((t) => t.id === item.therapistId);
          return (
            <View style={styles.card}>
              <Text style={styles.name}>{therapist?.name ?? 'Unknown Therapist'}</Text>
              <Text style={styles.meta}>{new Date(item.dateISO).toLocaleString()}</Text>
              <Text style={styles.meta}>Type: {item.sessionType}</Text>
              <Text style={styles.notes}>{item.notes}</Text>
            </View>
          );
        }}
        ListEmptyComponent={<Text style={styles.empty}>No sessions yet. Book your first appointment.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FC' },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#12203B',
    paddingHorizontal: 16,
    paddingTop: 12
  },
  list: {
    padding: 16,
    paddingBottom: 120
  },
  card: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 12
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
    color: '#1A2138'
  },
  meta: {
    marginTop: 6,
    color: '#4C5A7F'
  },
  notes: {
    marginTop: 8,
    color: '#273A65'
  },
  empty: {
    paddingTop: 24,
    textAlign: 'center',
    color: '#5A688A'
  }
});
