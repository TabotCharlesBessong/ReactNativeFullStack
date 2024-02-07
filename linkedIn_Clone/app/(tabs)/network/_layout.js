import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerTitle: "Networks" }} />
      <Stack.Screen name="connections" />
    </Stack>
  );
}
