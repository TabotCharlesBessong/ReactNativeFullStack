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
      onChangeText={(text) => console.log(text)}
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
    paddingLeft:12
  }
});

export default AppInput;