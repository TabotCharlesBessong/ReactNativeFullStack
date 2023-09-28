
import { Entypo } from '@expo/vector-icons'
import colors from '@utils/colors'
import React = require('react')
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  privateIcon:boolean
}

const PasswordVisibilityIcon: React.FC<Props> = ({privateIcon}) => {
  return (
    <View>
      {
        privateIcon ? (
          <Entypo name="eye" color={colors.SECONDARY} size={30} />
        ) : (
          <Entypo name="eye-with-line" color={colors.SECONDARY} size={30} />
        )
      }
    </View>
  )
}

export default PasswordVisibilityIcon

const styles = StyleSheet.create({})