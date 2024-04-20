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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Modal from "react-native-modal";


//implement rest of functionality in this page, e.g. search, filter etc
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
    const [foodInventory, setFoodInventory] = React.useState(foodList);
    const [isModalVisible, setModalVisible] = useState(false);
    const [expirationDate, setExpirationDate] = useState("");
    const [foodName, setFoodName] = useState("");
    const [quantity, setQuantity] = useState("");

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    const updateSearch = (searchText?: string) => {
      setSearchText(searchText);
    };

    const searchFunction = (searchText?: string) => {
      const updatedList = foodInventory.filter((item) => {
        const item_data = `${item.name.toUpperCase()})`; 
        const text_data = searchText.toUpperCase(); 
        return item_data.indexOf(text_data) > -1; 
      }); 
      setSearchText(searchText);
      setFoodInventory(updatedList);
    }

    const onFilterPress = () => {
      console.log('Filter button pressed');
      
    };

    const onPressedAddItem= () => {
      console.log('add button pressed')
    };

    const onPressedAddFromReceipt = () => {
      console.log("an item was pressed from receipt");
        //open scanner page
      //open scanner
    };

    const editItem = (item_id) => {
      const foundItem = foodInventory.find(food => food.id === item_id);

    };

    const deleteItem = (item_id) => {
      const updatedList = foodInventory.filter(foodItem => foodItem.id === item_id);
      setFoodInventory(updatedList);
    };


    const Tab = createBottomTabNavigator();


    const renderItem = ({ item }) => (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text>{item.name}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 60 }}>
          <TouchableOpacity onPress={() => editItem(item.id)}>
            <Icon name="edit" size={20} color="#000" />
          </TouchableOpacity>
          <Modal isVisible={isModalVisible}>
            <View style={{ flex: 1 }}>
              <View>
                <TextInput
                  placeholder = "Enter name of food..."
                  value={foodName}
                  onChangeText={setFoodName}
                >
                </TextInput>
                <TextInput
                  placeholder = "Enter quantity..."
                  value={quantity}
                  onChangeText={setQuantity}
                >
                </TextInput>
                <TextInput
                  placeholder = "Enter expiration date..."
                  value={expirationDate}
                  onChangeText={setExpirationDate}
                >
                </TextInput>
              </View>
              <View> 
                <Button title="OK" onPress={toggleModal} />
                <Button title="Cancel" onPress={toggleModal} />
              </View>
            </View>
          </Modal>
          <TouchableOpacity onPress={() => deleteItem(item.id)}>
            <Icon name="trash" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    );

    //make navigation component bottom bar in own file
    //move it in appdata.tsx

    return (
      
        <View style={{ flex: 1, justifyContent: "center" }}>
            <View style = {styles.container}>
              <SearchBar
                placeholder="Type Here..."
                onChangeText={searchFunction}
                value={searchText}
                 onBlur={undefined} onFocus={undefined} platform={"default"} clearIcon={undefined} searchIcon={undefined} loadingProps={undefined} showLoading={false} onClear={undefined} onCancel={undefined} lightTheme={false} round={false} cancelButtonTitle={""} cancelButtonProps={undefined} showCancel={true}              />
              <Ionicons name="filter" size={50} color="black" onPress={onFilterPress} containerFilter = {styles.filter} />
            </View>
            <FlatList
              data={foodInventory}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />  

          <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPressedAddItem}>
              <Text style={styles.text}>+</Text>
            </TouchableOpacity>
            <Button title="Red Button" color="red" onPress={onPressedAddFromReceipt} />
          </View>


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
    }
  });

  export { InventoryPage };