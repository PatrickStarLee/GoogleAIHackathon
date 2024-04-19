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


  const InventoryPage = () => {
    const foodList = [ 
      { 
        id: "1", 
        name: "Banana", 
        quantity: "23",
        date: "2024-02-23"
      }, 
      { 
        id: "2", 
        name: "Orange", 
        quantity: "12",
        date: "2024-01-01"
      }, 
      { 
        id: "3", 
        name: "Ice Cream",
        quantity: "5",
        date: "2024-03-15" 
      }, 
      { 
        id: "4", 
        name: "Spaghetti",
        quantity: "7",
        date: "2024-04-01"
      }, 
      { 
        id: "5", 
        name: "Pineapple", 
        quantity: "1",
        date: "2023-12-31"
      }, 

      
    ]; 

    const [searchText, setSearchText] = React.useState("");

    const updateSearch = (searchText?: string) => {
      setSearchText(searchText);
    };

    const onFilterPress = () => {
      console.log('Filter button pressed');
      
    };

    const onPressedAddItem= () => {
      console.log('add button pressed')
    };

    const onPressedAddFromReceipt = () => {
      console.log("an item was pressed from receipt");
    };


    const Tab = createBottomTabNavigator();


    const renderItem = ({ item }) => (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text>{item.name}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 60 }}>
          <TouchableOpacity onPress={() => console.log('Edit ' + item.id)}>
            <Icon name="edit" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Delete ' + item.id)}>
            <Icon name="trash" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    );

    return (
      
        <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={styles.container}>
              <SearchBar
                placeholder="Type Here..."
                onChangeText={updateSearch}
                value={searchText}
                containerStyle={styles.searchBar} onBlur={undefined} onFocus={undefined} platform={"default"} clearIcon={undefined} searchIcon={undefined} loadingProps={undefined} showLoading={false} onClear={undefined} onCancel={undefined} lightTheme={false} round={false} cancelButtonTitle={""} cancelButtonProps={undefined} showCancel={false}              />
              <Ionicons name="filter" size={24} color="black" onPress={onFilterPress} />
            </View>
            <FlatList
              data={foodList}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />  

          <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPressedAddItem}>
              <Text style={styles.text}>+</Text>
            </TouchableOpacity>
            <Button title="Red Button" color="red" onPress={onPressedAddFromReceipt} />
          </View>

    <NavigationContainer>
      <Tab.Navigator>
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
        </View>
      );
  };

  const styles = StyleSheet.create({
    button: {
      width: 30,
      height: 30,
      borderRadius: 30,
      backgroundColor: '#007BFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonRectangle: {
      width: 200,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#FFFFFF',
      fontSize: 36,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    searchBar: {
      flex: 1,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginRight: 10,
      paddingLeft: 10,
    },
  });

  export { InventoryPage };