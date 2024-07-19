import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { Text, View } from "react-native";
import Onboarding from "./(routes)/onboarding";
import { Stack } from "expo-router";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <View>
      {isLoggedIn ? (
        <View>
          <Text>Hello</Text>
        </View>
      ) : (
        <Stack screenOptions={{
          headerShown:false
        }} >
          <Stack.Screen name="index" />
          <Stack.Screen name="(routes)/onboarding/index"  />
          <Stack.Screen name="(routes)/welcome-intro/index"  />
        </Stack>
      )}
    </View>
  );
}
