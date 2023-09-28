
import CircleUI from '@ui/CircleUI';
import colors from '@utils/colors';
import React = require('react');
import {FC} from 'react';
import {View, StyleSheet,Text, Image} from 'react-native';
import images from 'src/constant/image';

interface Props {
  heading:string
  subHeading?:string
  children:React.ReactNode
}

const AuthFormContainer: FC<Props> = ({heading,subHeading,children}) => {
  return (
    <View style={styles.container}>
      <CircleUI size={100} position="top-right" />
      <CircleUI size={200} position="bottom-right" />
      <CircleUI size={200} position="top-left" />
      <CircleUI size={100} position="bottom-left" />

      <View style={styles.headerContainer}>
        <Image source={images.logo} />
        <Text
          style={styles.heading}
        >
          {heading}
        </Text>
        <Text style={styles.subHeading}>
          {subHeading}
        </Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical:15
  },
  heading: {
    color: colors.SECONDARY,
    fontSize: 25,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  subHeading: { color: colors.CONTRAST, fontSize: 16 },
  headerContainer:{
    width:"100%",
    marginBottom:20,
    paddingHorizontal:20
  }
});

export default AuthFormContainer