
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
      <>
      <Text> This is the bottom bar</Text>


      </>
    );
};

export {BottomBar};