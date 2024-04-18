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

const ScannerScreen = () => (
    <View style={styles.middle}>
      <Button title="Button 1" />
      <Button title="Button 2" />
    </View>
  );

  const styles = StyleSheet.create({
    middle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  export {ScannerScreen};