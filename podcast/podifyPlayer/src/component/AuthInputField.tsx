import AppInput from "@ui/AppInput";
import colors from "@utils/colors";
import { FC } from "react";
import React = require("react");
import {
  View,
  StyleSheet,
  Text,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from "react-native";

interface Props {
  placeholder?: string;
  label?: string;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  secureTextEntry?: TextInputProps["secureTextEntry"];
  autoComplete?: TextInputProps["autoComplete"];
  containerStyle?: StyleProp<ViewStyle>;
  onChangeText?: (text: string) => void;
  value?: TextInputProps["value"];
}

const AuthInputField: FC<Props> = (props) => {
  const {
    label,
    placeholder,
    keyboardType,
    autoCapitalize,
    secureTextEntry,
    autoComplete,
    containerStyle,
    onChangeText,
    value,
  } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <AppInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        autoComplete={autoComplete}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    color: colors.CONTRAST,
    left: 8,
    padding: 5,
  },
});

export default AuthInputField;
