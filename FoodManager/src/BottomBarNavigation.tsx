import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
  Button,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { SearchBar, ListItem } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { InventoryPage } from "./InventoryPage";
import { ReceiptImageUpload } from "./ReceiptImageUpload";
import { FindRecipesPage } from "./FindRecipesPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./HomeScreen";
import { ProfileScreen } from "./ProfileScreen";
import { KitchenwareScreen } from "./KitchenwareScreen";
import { CreateAndEditRecipes } from "./CreateAndEditRecipes";
import { CompareRecipes } from "./CompareRecipes";

const HomeNavigation = (navigation) => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
       <Tab.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
        <Tab.Screen
            name="InventoryPage"
            component={InventoryPage}
            options={{
              tabBarLabel: 'Inventory',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="food" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Scanner"
            component={ReceiptImageUpload}
            options={{
              tabBarLabel: 'Image Upload',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="upload" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="KitchenWare"
            component={KitchenwareScreen}
            options={{
              tabBarLabel: 'KitchenWare',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="silverware" color={color} size={size} />
              ),
            }}
          />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  middle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  button: {
    borderRadius: 50,
    margin: 10,
  },
});

export { HomeNavigation };
