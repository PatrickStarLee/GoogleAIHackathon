
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
import { HomeScreen } from "./HomeScreen";
import { KitchenwareScreen } from "./KitchenwareScreen";
import { ProfileScreen } from "./ProfileScreen";
import { ScannerScreen } from "./ScannerScreen";
import { InventoryPage } from './InventoryPage';

const BottomBar = () => {

    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
        <Tab.Navigator>
        <Tab.Screen
          name="Inventory"
          component={InventoryPage}
          options={{
            tabBarLabel: 'Inventory',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="scanner" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Scanner"
          component={ScannerScreen}
          options={{
            tabBarLabel: 'Scan',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="scanner" color={color} size={size} />
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
      </NavigationContainer>
    );
};

export {BottomBar};