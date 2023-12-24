const { Stack } = require("expo-router")

const Layout = () => {
  return (
    <Stack screenOptions={{headerShown:false}} >
      <Stack.Screen name="index" />
    </Stack>
  )
}

export default Layout