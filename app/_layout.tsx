import { Stack } from 'expo-router';
import { UserProvider } from './UserContext';

export default function Layout() {
  return (
    <UserProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
          gestureEnabled: false,  // Deshabilita el gesto de retroceso
          gestureDirection: 'horizontal'
        }}
      />
    </UserProvider>
  );
}