import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Test } from "./src/component";
import colors from "./src/utils/colors";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Test />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ERROR,
    alignItems: "center",
    justifyContent: "center",
  },
});
