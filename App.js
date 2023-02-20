import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  View,
  ImageBackground,
  Button,
} from 'react-native';
import Earth from './src/Components/earth';
import Moon from './src/Components/moon';
import Sun from './src/Components/sun';
import Mars from './src/Components/mars';
import Jupiter from './src/Components/jupiter';
import Saturn from './src/Components/saturn';

export default function App() {
  const elements = [Earth, Moon, Sun, Mars, Jupiter, Saturn];
  const [index, setIndex] = React.useState(5);
  const [render, setRender] = React.useState(elements[index]);
  React.useEffect(() => {
    setRender(elements[index]);
  }, [index]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require('./assets/stars.jpeg')}
        resizeMode="cover"
        style={styles.stars}
      >
        {render}
      </ImageBackground>
      <View style={styles.button}>
        <Button
          title="Change"
          onPress={() => setIndex((index + 1) % elements.length)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000000',
  },
  stars: {
    flex: 1,
    width: '100%',
  },
  button: {
    margin: 20,
  },
});
