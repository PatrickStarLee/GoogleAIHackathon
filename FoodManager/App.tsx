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
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { AddFoodFromReceiptPage } from './src/AddFoodFromReceiptPage';
import { FindRecipesPage } from './src/FindRecipesPage';



export default function App() {

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator()

  return (
    <View style = {styles.container}>
      {/*<AddData /> */}
     {/*} <InventoryPage /> */}
     {/*} <StatusBar style="auto" /> */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Scanner" component={ScannerScreen} />
          <Stack.Screen name="InventoryPage" component={InventoryPage} />
          <Stack.Screen name="FindRecipesPage" component={FindRecipesPage} />
          <Stack.Screen name="AddFoodFromReceiptPage" component={AddFoodFromReceiptPage} />
        </Stack.Navigator>
      </NavigationContainer>
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
