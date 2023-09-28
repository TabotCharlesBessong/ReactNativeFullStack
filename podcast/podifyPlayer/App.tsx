import SignUp from "@views/auth/SignUp";
import { StyleSheet } from "react-native";
import colors from "./src/utils/colors";
import React = require("react");
import { StatusBar } from "expo-status-bar";
import SignIn from "@views/auth/SignIn";
import ForgotPassword from "@views/auth/ForgotPassword";

export default function App() {
  return (
    <>
    <ForgotPassword />
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
