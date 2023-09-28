import colors from "@utils/colors";
import React = require("react");
import { FC } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
} from "react-native";

interface Props extends TextInputProps {}

const OTPField: FC<Props> = (props) => {
  return (
    <TextInput
      {...props}
      placeholder="*"
      placeholderTextColor={colors.INACTIVE_CONTRAST}
      style={[styles.input, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: colors.SECONDARY,
    borderWidth: 2,
    marginBottom: 12,
    textAlign: "center",
    color: colors.CONTRAST,
    fontSize: 18,
    lineHeight: 0,
  },
});

export default OTPField;
