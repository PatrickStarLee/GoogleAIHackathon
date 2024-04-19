import { StatusBar } from 'expo-status-bar';
import { AddData } from './src/addData';
import { InventoryPage } from './src/InventoryPage';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
  Button,
  FlatList
} from "react-native";
import React, { useState } from "react";
import { SearchBar, ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeScreen } from "./src/HomeScreen";
import { KitchenwareScreen } from "./src/KitchenwareScreen";
import { ProfileScreen } from "./src/ProfileScreen";
import { ScannerScreen } from "./src/ScannerScreen";
import { BottomBar } from './src/BottomBar';
import { Dimensions } from 'react-native';



export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <View style = {styles.container}>
      {/*<AddData /> */}
     {/*} <InventoryPage /> */}
     {/*} <StatusBar style="auto" /> */}
     <BottomBar/>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width
  },
});
