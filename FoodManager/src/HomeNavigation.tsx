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
import { useNavigation } from '@react-navigation/native';
import { InventoryPage } from "./InventoryPage";
import { ScannerScreen } from "./ScannerScreen";
import { FindRecipesPage } from "./FindRecipesPage";
import { AddFoodFromReceiptPage } from "./AddFoodFromReceiptPage";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { HomeScreen } from "./HomeScreen";

const HomeNavigation =(navigation) =>
{
    const Stack = createNativeStackNavigator();

    return (

            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Scanner" component={ScannerScreen} />
                <Stack.Screen name="InventoryPage" component={InventoryPage} />
                <Stack.Screen name="FindRecipesPage" component={FindRecipesPage} />
                <Stack.Screen name="AddFoodFromReceiptPage" component={AddFoodFromReceiptPage} />
            </Stack.Navigator>

    );
    
};

const styles = StyleSheet.create({
    middle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 10,
    },
    button: {
      borderRadius: 50,
      margin: 10,
    },
  });

  export {HomeNavigation};