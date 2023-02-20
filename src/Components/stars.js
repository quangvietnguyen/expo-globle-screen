import * as React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

export default function Stars(props) {
  <ImageBackground
    source={require('../../assets/stars.jpeg')}
    resizeMode="cover"
    style={styles.stars}
  >
    {props.children}
  </ImageBackground>;
}

const styles = StyleSheet.create({
  stars: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
