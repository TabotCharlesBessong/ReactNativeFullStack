import AppInput from "@ui/AppInput";
import colors from "@utils/colors";
import { FC } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React = require("react");
import AuthInputField from "src/component/AuthInputField";
import { Formik } from "formik";

interface Props {}

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const SignUp: FC<Props> = (props) => {
  const [userInfo, setUserInfo] = React.useState({
    name:'',
    email:'',
    password:''
  })
  // console.log(userInfo)
  return (
    <SafeAreaView style={styles.container}>
      <Formik initialValues={initialValues} onSubmit={(values) => {
        console.log(values)
      }} >

        {({handleSubmit,handleChange,values}) => {
          return (
            <View style={styles.formContainer}>
              <AuthInputField
                placeholder="John Doe"
                label="Name"
                autoComplete="name"
                // value={userInfo.name}
                onChangeText={handleChange("name")}
                value={values.name}
              />
              <AuthInputField
                keyboardType="email-address"
                placeholder="john@gmail.com"
                label="Email"
                autoCapitalize="none"
                autoComplete="email"
                containerStyle={{ marginVertical: 12, marginTop: 12 }}
                // value={userInfo.email}
                onChangeText={handleChange("email")}
                value={values.email}
              />
              <AuthInputField
                placeholder="*******"
                label="Password"
                autoCapitalize="none"
                secureTextEntry={true}
                containerStyle={{ marginTop: 12 }}
                // value={userInfo.password}
                onChangeText={handleChange("password")}
                value={values.password}
              />

              <Button
                onPress={() => {
                  console.log(userInfo);
                }}
                title="Sign up"
              />
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
