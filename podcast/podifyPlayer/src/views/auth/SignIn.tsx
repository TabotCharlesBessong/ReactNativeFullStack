import AuthFormContainer from "@components/AuthFormContainer";
import Form from "@components/form";
import AuthInputField from "@components/form/AuthInputField";
import SubmitBtn from "@components/form/SubmitBtn";
import AppLink from "@ui/AppLink";
import PasswordVisibilityIcon from "@ui/PasswordVisibilityIcon";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import * as yup from "yup";
import React = require("react");
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "src/@types/navigation";

const signupSchema = yup.object({
  email: yup
    .string()
    .trim("Email is missing!")
    .email("Invalid email!")
    .required("Email is required!"),
  password: yup
    .string()
    .trim("Password is missing!")
    .min(8, "Password is too short!")
    .required("Password is required!"),
});

interface Props {}

const initialValues = {
  email: "",
  password: "",
};

const SignIn: FC<Props> = (props) => {
  const [secureEntry, setSecureEntry] = React.useState(true);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>()
  return (
    <Form
      onSubmit={(values) => {
        console.log(values);
      }}
      initialValues={initialValues}
      validationSchema={signupSchema}
    >
      <AuthFormContainer
        heading="Welcome back!"
        subHeading="Jump back right where you left"
        children={
          <View style={styles.formContainer}>
            <AuthInputField
              name="email"
              placeholder="john@email.com"
              label="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              containerStyle={styles.marginBottom}
            />
            <AuthInputField
              name="password"
              placeholder="********"
              label="Password"
              autoCapitalize="none"
              secureTextEntry={secureEntry}
              containerStyle={styles.marginBottom}
              rightIcon={<PasswordVisibilityIcon privateIcon={secureEntry} />}
              onRightIconPress={() => {
                setSecureEntry(!secureEntry); 
              }}
            />
            <SubmitBtn title="Sign in" />

            <View style={styles.linkContainer}>
              <AppLink
                title="I lost my password"
                onPress={() => {
                  navigation.navigate("Forgot");
                }}
              />
              <AppLink
                title="create your account"
                onPress={() => {
                  navigation.navigate("Signup");
                }}
              />
            </View>
          </View>
        }
      />
    </Form>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: colors.PRIMARY,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  formContainer: {
    width: "100%",
    paddingHorizontal: 15, // padding in the x direction (left and the right)
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default SignIn;
