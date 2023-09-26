import colors from "@utils/colors";
import { FC } from "react";
import React = require("react");
import { View, StyleSheet, Text, TextInput, SafeAreaView } from "react-native";

interface Props {}

const SignUp: FC<Props> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer} >
        <Text style={styles.label} >Name</Text>
        <TextInput placeholder="John Doe" style={styles.input} />
        <Text style={styles.label} >Email</Text>
        <TextInput placeholder="john@gmail.com" style={styles.input} />
        <Text style={styles.label} >Password</Text>
        <TextInput
          placeholder="*********"
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          style={styles.input}
        />

      </View>
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
    marginVertical:12
  },
  label:{
    color:colors.CONTRAST,
    left:8
  },
  formContainer:{
    width:'100%',
    paddingHorizontal:12
  }
});

export default SignUp;
