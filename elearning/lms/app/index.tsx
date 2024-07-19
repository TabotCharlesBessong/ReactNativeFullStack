// import useUser from "@/hooks/auth/useUser";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";
// import Loader from "@/components/loader/loader";

export default function TabsIndex() {
  // const { loading, user } = useUser();
  const [auth, setAuth] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    },3000)
  })
  return (
    <>
      {/* {loading ? (
        // <Loader />
        <Text>Loading...</Text>
      ) : ( */}
        <Redirect href={!auth ? "/(routes)/onboarding" : "/(tabs)"} />
      {/* )} */}
    </>
  );
}
