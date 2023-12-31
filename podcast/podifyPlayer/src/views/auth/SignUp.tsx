import AuthFormContainer from "@components/AuthFormContainer";
import Form from "@components/form";
import AuthInputField from "@components/form/AuthInputField";
import SubmitBtn from "@components/form/SubmitBtn";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import AppLink from "@ui/AppLink";
import PasswordVisibilityIcon from "@ui/PasswordVisibilityIcon";
import { FormikHelpers } from "formik";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { AuthStackParamList } from "src/@types/navigation";
import * as yup from "yup";
import React = require("react");
import axios from "axios";

const signupSchema = yup.object({
  name: yup
    .string()
    .trim("Name is missing!")
    .min(3, "Invalid name!")
    .required("Name is required!"),
  email: yup
    .string()
    .trim("Email is missing!")
    .email("Invalid email!")
    .required("Email is required!"),
  password: yup
    .string()
    .trim("Password is missing!")
    .min(8, "Password is too short!")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      "Password is too simple!"
    )
    .required("Password is required!"),
});

interface Props {}

interface NewUser {
  name:string
  email:string
  password:string
}

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const SignUp: FC<Props> = (props) => {
  const [secureEntry, setSecureEntry] = React.useState(true);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleSubmit = async (values:NewUser,actions:FormikHelpers<NewUser>) => {
    // send the information to the api
    // fetch()
    try {
      const responsne = await axios.post('http://localhost:5000/auth/create',{
        ...values
      })
      console.log(responsne)
      navigation.navigate("Signin");
      
    } catch (error) {
      console.log("Signup error",error)
    }
  }

  return (  
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={signupSchema}
    >
      <AuthFormContainer
        heading="Welcome!"
        subHeading="Let's get started by creating your account !"
        children={
          <View style={styles.formContainer}>
            <AuthInputField
              name="name"
              placeholder="John Doe"
              label="Name"
              containerStyle={styles.marginBottom}
            />
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
            <SubmitBtn title="Sign up" />

            <View style={styles.linkContainer}>
              <AppLink
                onPress={() => {
                  navigation.navigate("Forgot");
                }}
                title="I lost my password"
              />
              <AppLink
                onPress={() => {
                  navigation.navigate("Signin");
                }}
                title="sign in"
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

export default SignUp;
