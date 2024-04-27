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
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SearchBar, ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Modal from "react-native-modal";
import { ButtonPage } from "./Button";
import { ModalPage } from "./Modal";
import { RadioButton } from "react-native-paper";
import DatePicker from "react-native-date-picker";
import { CustomRadioButton } from "./RadioButton";
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";

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
      const [recipesInventory, setRecipesInventory] = React.useState(recipesList);
      const [isModalVisible, setModalVisible] = useState(false);
      const [expirationDate, setExpirationDate] = useState("");
      const [recipeName, setRecipeName] = useState("");
      const [quantity, setQuantity] = useState("");
      const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
      const [checked, setChecked] = useState('first');
      const [errorMessage, setErrorMessage] = useState("");
      const [foodErrorMessage, setFoodErrorMessage] = useState("");
      const [date, setDate] = useState(new Date());
      const [option, setOption] = useState(null);
      const [inputDate, setInputDate] = useState(new Date());

      //Reuse searchbar, edit from list, delete from list code as well as html code

      const Item = ({ name, date, quantity }) => (
        <View>
          <Text style={styles.title}>
            Recipe name: {name}
          </Text>
          <Text> Date added: {date} </Text>
        </View>
      );

      const deleteItem = (item_id) => {
        const updatedList = recipesInventory.filter(recipeItem => recipeItem.id !== item_id);
        setRecipesInventory(updatedList);
      };

      const handleCancel = () => {
        setRecipeName("");
        setQuantity("")
        setDate(null);
        setModalVisible(false);
      };

      const renderItem = ({ item }) => {
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>

        </View>
      }

    return(
        <View>

        </View>
    );
}

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
    buttonRectangle: {
      width: 200,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 16,
      fontWeight: "400",
      textAlign: "center",
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      //alignItems: 'center',
      //padding: 10,
    },
    searchBar: {
      flex: 1,
      height: '50%',
      borderColor: 'gray',
      borderWidth: 1,
      marginRight: 10,
      paddingLeft: 10,
    },
    filter: {
      alignItems: 'center'
    },
    button: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "center",
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
    input: {
      paddingTop: 10,
      borderColor: "grey",
      borderBottomWidth: 2,
    },
    pop_up_container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    closeButton2: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    radioButton: { 
      flexDirection: 'row', 
      alignItems: 'center', 
    }, 
    radioLabel: { 
      marginLeft: 8, 
      fontSize: 16, 
      color: '#333', 
    }, 
    closeButton: {
      alignSelf: "flex-end",
      marginRight: '2%',
      marginTop: '2%',
      backgroundColor: "#ccc",
      borderRadius: 20,
      width: '10%',
      height: '5%',
      alignItems: "center",
      justifyContent: "center",
    },
  });

export {FindRecipesPage};