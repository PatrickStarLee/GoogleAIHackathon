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
import Modal from "react-native-modal";


const FindRecipesPage = () => {
    const recipesList = [ 
        { 
          id: "1", 
          name: "Mashed Potatoes", 
          date_added: "2024-02-23"
        }, 
        { 
          id: "2", 
          name: "Lasagna", 
          date_added: "2024-01-01"
        }, 
        { 
          id: "3", 
          name: "Protein Chocolate Brownie",
          date_added: "2024-03-15" 
        }, 
        { 
          id: "4", 
          name: "Quadruple Decker Burger",
          date_added: "2024-04-01"
        }, 
        { 
          id: "5", 
          name: "Orange Chicken", 
          date_added: "2023-12-31"
        }, 
      ]; 

      const [searchText, setSearchText] = React.useState("");
      const [recipesInventory, setRecipesInventory] = useState(recipesList);
      const [isModalVisible, setModalVisible] = useState(false);
      const [addedDate, setAddedDate] = useState("");
      const [recipeName, setRecipeName] = useState("");

      //Reuse searchbar, edit from list, delete from list code as well as html code

    return(
        <View>

        </View>
    );
}

export {FindRecipesPage};