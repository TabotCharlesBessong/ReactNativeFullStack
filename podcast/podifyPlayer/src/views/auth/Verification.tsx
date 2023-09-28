import AuthFormContainer from "@components/AuthFormContainer";
import AppButton from "@ui/AppButton";
import AppLink from "@ui/AppLink";
import OTPField from "@ui/OTPField";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import React = require("react");



interface Props {}



const otpFields = new Array(6).fill("");

const Verification: FC<Props> = (props) => {
  return (
    <AuthFormContainer
      heading="Please check your email"
      children={
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            {otpFields.map((_, index) => (
              <OTPField key={index} />
            ))}
          </View>
          <AppButton title="Verify Account" />
          <View style={styles.linkContainer}>
            <AppLink title="resend otp" />
          </View>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    paddingHorizontal: 15, // padding in the x direction (left and the right)
  },
  marginBottom: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },
  linkContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "flex-end",
  },
});

export default Verification;
