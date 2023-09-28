
import colors from '@utils/colors';
import React = require('react');
import { FC } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface Props {
  title:string
  onPress?():void
}

const AppLink: FC<Props> = ({title,onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.title} >{title}</Text>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  container: {},
  title: {
    color:colors.SECONDARY
  }
});

export default AppLink