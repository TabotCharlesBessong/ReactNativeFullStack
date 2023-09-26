import SignUp from "@views/auth/Signup";
import { StyleSheet } from "react-native";
import colors from "./src/utils/colors";
import React = require("react");

export default function App() {
  return (
    <SignUp />
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
