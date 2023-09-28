import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ForgotPassword from "@views/auth/ForgotPassword"
import SignIn from "@views/auth/SignIn"
import SignUp from "@views/auth/SignUp"
import Verification from "@views/auth/Verification"
import { AuthStackParamList } from "src/@types/navigation"
const React = require("react")

const Stack = createNativeStackNavigator<AuthStackParamList>()

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown:false
    }} >
      <Stack.Screen name="Signin" component={SignIn} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="Forgot" component={ForgotPassword} />
      <Stack.Screen name="Verification" component={Verification} />
    </Stack.Navigator>
  );
}

export default AuthNavigator