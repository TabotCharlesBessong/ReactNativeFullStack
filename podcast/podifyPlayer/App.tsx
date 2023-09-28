import SignUp from "@views/auth/SignUp";
import { StyleSheet } from "react-native";
import colors from "./src/utils/colors";
import React = require("react");
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
    <SignUp />
    <StatusBar style="auto" />
    </>
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
