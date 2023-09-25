import {FC} from 'react';
import {View, StyleSheet,Text} from 'react-native';

interface Props {}

const Home: FC<Props> = (props) => {
  return (<View style={styles.container}>
    <Text>Hello Home</Text>
  </View>)
};

const styles = StyleSheet.create({
  container: {},
});

export default Home