import AppInput from "@ui/AppInput";
import colors from "@utils/colors";
import { FC } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React = require("react");

interface Props {}

const SignUp: FC<Props> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <AppInput placeholder="John Doe" style={{ borderColor: "yellow" }} />
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="john@gmail.com"
          keyboardType="email-address"
          style={styles.input}
          autoCapitalize="none"
          autoComplete="email"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="*********"
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          style={styles.input}
          autoCapitalize="none"
          secureTextEntry={true}
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
