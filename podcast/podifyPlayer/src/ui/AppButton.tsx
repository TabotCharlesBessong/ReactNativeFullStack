import colors from '@utils/colors';
import React = require('react');
import {FC} from 'react';
import {View, StyleSheet,Text, Pressable} from 'react-native';

interface Props {
  title:string,
  onPress?(): void
}

const AppButton: FC<Props> = ({title,onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.title} >{title}</Text>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:45,
    backgroundColor:colors.SECONDARY,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:25
  },
  title:{
    color:colors.CONTRAST,
    fontSize:18
  }
});

export default AppButton