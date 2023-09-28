import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import AuthNavigator from "src/navigation/AuthNavigator";
import colors from "./src/utils/colors";
import React = require("react");

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
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
