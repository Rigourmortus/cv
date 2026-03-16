import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { AppProvider } from './context/AppContext';
import { AppointmentsScreen } from './screens/AppointmentsScreen';
import { BookSessionScreen } from './screens/BookSessionScreen';
import { HomeScreen } from './screens/HomeScreen';
import { TherapistDetailScreen } from './screens/TherapistDetailScreen';
import { RootStackParamList } from './screens/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'MindBridge' }} />
          <Stack.Screen name="TherapistDetail" component={TherapistDetailScreen} options={{ title: 'Therapist Profile' }} />
          <Stack.Screen name="BookSession" component={BookSessionScreen} options={{ title: 'Book Session' }} />
          <Stack.Screen name="Appointments" component={AppointmentsScreen} options={{ title: 'Appointments' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
