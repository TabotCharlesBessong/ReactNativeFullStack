import AppInput from "@ui/AppInput";
import colors from "@utils/colors";
import { Formik } from "formik";
import { FC, useState } from "react";
import React = require("react");
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AuthInputField from "src/component/AuthInputField";
import * as yup from "yup";

const signupSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, "Name is short")
    .required("Name is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .trim()
    .min(8,"Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      "Password is too simple!"
      )
    .required("Password is required")
});

interface Props {}

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const SignUp: FC<Props> = (props) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        onSubmit={(values) => {
          console.log(values);
        }}
        initialValues={initialValues}
        validationSchema={signupSchema}
      >
        {({ handleSubmit, handleChange, errors, values }) => {
          return (
            <View style={styles.formContainer}>
              <AuthInputField
                placeholder="John Doe"
                label="Name"
                containerStyle={styles.marginBottom}
                onChange={handleChange("name")}
                value={values.name}
                errorMsg={errors.name}
              />
              <AuthInputField
                placeholder="john@email.com"
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                containerStyle={styles.marginBottom}
                onChange={handleChange("email")}
                value={values.email}
                errorMsg={errors.email}
              />
              <AuthInputField
                placeholder="********"
                label="Password"
                autoCapitalize="none"
                secureTextEntry
                onChange={handleChange("password")}
                value={values.password}
                errorMsg={errors.password}
              />
              <Button onPress={handleSubmit} title="Sign up" />
            </View>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 15, // padding in the x direction (left and the right)
  },
  marginBottom: {
    marginBottom: 20,
  },
});

export default SignUp;
