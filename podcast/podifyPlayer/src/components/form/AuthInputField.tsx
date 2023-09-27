import AppInput from '@ui/AppInput';
import colors from '@utils/colors';
import {useFormikContext} from 'formik';
import {FC} from 'react';
import React = require('react');
import {
  View,
  StyleSheet,
  Text,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated,{useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming} from 'react-native-reanimated';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  secureTextEntry?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const AuthInputField: FC<Props> = props => {
  const inputStyleValue = useSharedValue(0)
  const {handleChange, values, errors, handleBlur, touched} = useFormikContext<{
    [key: string]: string;
  }>();

  const {
    label,
    placeholder,
    autoCapitalize,
    keyboardType,
    secureTextEntry,
    containerStyle,
    name,
  } = props;

  const errorMsg = touched[name] && errors[name] ? errors[name] : '';

  const shakeUI = () => {
    inputStyleValue.value = withSequence(
      withTiming(-10,{
        duration:150
      }),
      withSpring(0,{
        damping:8,
        mass:0.5,
        stiffness:1000,
        restDisplacementThreshold:0.1
      })
    )
  }

  const inputStyle = useAnimatedStyle(() => {
    return {
      // backgroundColor:''
      transform:[{translateX:inputStyleValue.value}]
    }
  })

  React.useEffect(() => {
    if(errorMsg) shakeUI()
  },[errorMsg])

  return (
    <Animated.View style={[ containerStyle,inputStyle]}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <AppInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        onChangeText={handleChange(name)}
        value={values[name]}
        onBlur={handleBlur(name)}
      />
      <Text style={styles.errorMsg}>{errorMsg}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  label: {
    color: colors.CONTRAST,
  },
  errorMsg: {
    color: colors.ERROR,
  }
});

export default AuthInputField;
