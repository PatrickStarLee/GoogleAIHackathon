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
import { ReceiptImageUpload } from "./ReceiptImageUpload";
import { FindRecipesPage } from "./FindRecipesPage";
import { AddFoodFromReceiptPage } from "./AddFoodFromReceiptPage";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const HomeScreen = ({navigation}) => {

  return (
    
  
  <View style={styles.middle}>
    <Text> Home Screen </Text>
    <View style={styles.button}>
      <Button
        title="Food Inventory"
        color="blue"
        onPress={() => navigation.navigate('InventoryPage')}
      />
    </View>
    <View style={styles.button}>
      <Button
        title="Add Food From Receipt"
        color="green"
        onPress={() => navigation.navigate('AddFoodFromReceiptPage')}
      />
    </View>
    <View style={styles.button}>
      <Button
        title="Add Food from Camera"
        color="red"
        onPress={() => navigation.navigate('ReceiptImageUpload')}
      />
    </View>
    <View style={styles.button}>
      <Button
        title="Find Recipes"
        color="black"
        onPress={() => navigation.navigate('FindRecipesPage')}
      />
    </View>
  </View>
  
 
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

  export {HomeScreen};