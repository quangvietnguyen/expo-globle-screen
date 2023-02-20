import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import ReactThreeFiber from './src/Components/threefibernative';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={{ color: '#fff' }}>Test</Text>
      <ReactThreeFiber />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000000',
  },
});
