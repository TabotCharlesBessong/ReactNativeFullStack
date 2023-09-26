import colors from "@utils/colors";
import { FC } from "react";
import React = require("react");
import { View, StyleSheet, Text, TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {}

const AppInput: FC<Props> = (props) => {
  return (
    <TextInput
    {...props}
      placeholderTextColor={colors.CONTRAST}
      style={[styles.input,props.style]}
    />
  );
};

const styles = StyleSheet.create({
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
});

export default AppInput;
