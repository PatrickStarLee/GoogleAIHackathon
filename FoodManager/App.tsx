import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AddData } from './src/addData';
import { InventoryPage } from './src/InventoryPage';

export default function App() {
  return (
    <View style={styles.container}>
      {/*<AddData /> */}
      <InventoryPage />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
