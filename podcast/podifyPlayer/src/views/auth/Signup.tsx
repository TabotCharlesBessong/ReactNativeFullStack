import AppInput from "@ui/AppInput";
import colors from "@utils/colors";
import { FC } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React = require("react");
import AuthInputField from "src/component/AuthInputField";

interface Props {}

const SignUp: FC<Props> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <AuthInputField
          placeholder="John Doe"
          label="Name"
          autoComplete="name"
        />
        <AuthInputField
          keyboardType="email-address"
          placeholder="john@gmail.com"
          label="Email"
          autoCapitalize="none"
          autoComplete="email"
          containerStyle={{ marginVertical: 12,marginTop:12 }}
        />
        <AuthInputField
          placeholder="*******"
          label="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          containerStyle={{ marginTop: 12 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    height: 45,
    borderRadius: 25,
    color: colors.CONTRAST,
    marginVertical: 12,
  },
  label: {
    color: colors.CONTRAST,
    left: 8,
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 12,
  },
});

export default SignUp;
