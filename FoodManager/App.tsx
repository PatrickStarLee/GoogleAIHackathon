import { StatusBar } from 'expo-status-bar';
//import { AddData } from './src/addData';
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
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import { HomeScreen } from "./src/HomeScreen";
import { KitchenwareScreen } from "./src/KitchenwareScreen";
import { ProfileScreen } from "./src/ProfileScreen";
import { ReceiptImageUpload } from './src/ReceiptImageUpload';
import { Dimensions } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { FindRecipesPage } from './src/FindRecipesPage';
import { HomeNavigation } from './src/BottomBarNavigation';
import { HomeScreen } from './src/HomeScreen';
import { CreateAndEditRecipes } from './src/CreateAndEditRecipes';
import { CompareRecipes } from "./src/CompareRecipes";




export default function App() {

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const getTabBarLabel = (route) => {
    
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    switch (routeName) {
      case 'Home':
        return 'Home';
      case 'CreateAndEditRecipes':
        return 'Create And Edit Recipes';
      case 'CompareRecipes':
        return 'Compare Recipes';
      case 'FindRecipesPage':
        return 'Find Recipes';
    }
  };

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator> 
          <Stack.Screen 
            name="Home" 
            component={HomeNavigation} /*Home Navigation should really be called BottomBarNavigation but code was shifted around */
            options={({ route }) => ({
              headerTitle: getTabBarLabel(route)
            })}
          />
          <Stack.Screen name="CreateAndEditRecipes" component={CreateAndEditRecipes} />
          <Stack.Screen name="CompareRecipes" component={CompareRecipes} />
          <Stack.Screen name="FindRecipesPage" component={FindRecipesPage} />
        </Stack.Navigator>
      </NavigationContainer>
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
