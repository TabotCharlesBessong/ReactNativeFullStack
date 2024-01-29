const { Stack } = require("expo-router")

const Layout = () => {
  return (
    <Stack screenOptions={{headerShown:false}} >
      <Stack.Screen name="index" />
      <Stack.Screen name="employees" />
      <Stack.Screen name="adddetails" />
      <Stack.Screen name="markattendance" />
      <Stack.Screen name="summary" />
      {/* <Stack.Screen name="[user]" /> */}
    </Stack>
  )
}

export default Layout